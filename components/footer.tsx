"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { useState, useEffect } from "react"

export function Footer() {
  const [showCopyMessage, setShowCopyMessage] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 768 ||
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      )
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const copyPhoneNumber = async () => {
    try {
      await navigator.clipboard.writeText("+91 90754 51056")
      setShowCopyMessage(true)
      setTimeout(() => setShowCopyMessage(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = "+91 90754 51056"
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setShowCopyMessage(true)
      setTimeout(() => setShowCopyMessage(false), 2000)
    }
  }

  const handlePhoneClick = () => {
    if (isMobile) {
      // On mobile, use tel: link
      window.location.href = "tel:+919075451056"
    } else {
      // On desktop, copy number to clipboard
      copyPhoneNumber()
    }
  }

  const handleNavClick = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
    }, 100)
  }

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/benevolus",
      color: "hover:text-blue-500",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/benevolus",
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/benevolus",
      color: "hover:text-pink-500",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/company/benevolus",
      color: "hover:text-blue-600",
    },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-1.5 mb-3">
              <img src="/images/bvv-logo.png" alt="BV Logo" className="h-8 w-auto brightness-0 invert" />
              <span className="text-white text-2xl font-nunito font-bold tracking-wide">Benevolus</span>
            </div>
            <p className="text-gray-400 text-sm mb-3 leading-relaxed">
              We are a passionate team of web designers and developers dedicated to creating innovative digital
              solutions. Our expertise spans custom web design, e-commerce development, and cutting-edge technology
              implementations.
            </p>
            <div className="text-gray-400 text-xs space-y-1">
              <div className="relative">
                <p onClick={handlePhoneClick} className="cursor-pointer hover:text-white transition-colors">
                  📞 +91 90754 51056
                </p>
                {showCopyMessage && (
                  <div className="absolute top-full mt-1 left-0 bg-green-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    Phone number copied!
                  </div>
                )}
              </div>
              <p>
                📧{" "}
                <a href="mailto:benevolus436@gmail.com" className="hover:text-white transition-colors">
                  benevolus436@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-3 text-white">Services</h4>
            <ul className="space-y-1 text-gray-400 text-sm">
              {["Web Design", "Development", "SEO", "Maintenance"].map((service) => (
                <li key={service}>
                  <Link href="/services" onClick={handleNavClick} className="hover:text-white transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-3 text-white">Company</h4>
            <ul className="space-y-1 text-gray-400 text-sm">
              {[
                {
                  label: "About",
                  href: "/about",
                },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Careers", href: "/careers" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} onClick={handleNavClick} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Info */}
          <div>
            <h4 className="font-semibold mb-3 text-white">Business Hours</h4>
            <div className="text-gray-400 text-sm space-y-1">
              <p>Mon-Fri: 9AM - 6PM</p>
              <p>Sat: 10AM - 4PM</p>
              <p>Email: Within 24hrs</p>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-800">
              <p className="text-gray-500 text-xs mb-1">Languages: English, Hindi</p>
              <p className="text-gray-500 text-xs">Timezone: IST (GMT+5:30)</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6">
          <div className="text-center space-y-4">
            {/* Social Media */}
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors ${social.color}`}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-gray-500 text-xs">Proudly serving the clients with best innovative Tech solutions</p>
            <p className="text-gray-400 text-sm">&copy; 2024 Benevolus. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
