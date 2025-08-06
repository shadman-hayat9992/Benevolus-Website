"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenu] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenu(false)
  }, [pathname])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ]

  const handleNavClick = () => {
    setIsMobileMenu(false)
    // Small delay to ensure the navigation happens first
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
    }, 100)
  }

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8 py-3 lg:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-1.5 group" onClick={handleNavClick}>
            <img
              src="/images/bvv-logo.png"
              alt="BV logo"
              className="h-8 w-auto group-hover:scale-110 transition-transform"
            />
            <span className="text-gray-900 text-2xl font-nunito font-bold tracking-wide group-hover:scale-110 transition-transform">
              Benevolus
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`relative text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base ${
                  pathname === item.href ? "text-blue-600 font-medium" : ""
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenu(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 lg:w-6 lg:h-6" /> : <Menu className="w-5 h-5 lg:w-6 lg:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <nav className="container mx-auto px-6 lg:px-8 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`block text-gray-600 hover:text-gray-900 transition-colors py-2 ${
                    pathname === item.href ? "text-blue-600 font-medium" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
