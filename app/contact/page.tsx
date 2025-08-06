"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowRight, Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Copy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  service: string
  budget: string
  message: string
  newsletter: boolean
}

interface FormErrors {
  [key: string]: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
    newsletter: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeField, setActiveField] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showCopyMessage, setShowCopyMessage] = useState(false)

  // Detect if user is on mobile device
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

  // Handle hash navigation to scroll to contact form
  useEffect(() => {
    if (window.location.hash === "#contact-form") {
      setTimeout(() => {
        document.getElementById("contact-form")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 100)
    }
  }, [])

  const services = [
    "Custom Web Design",
    "E-commerce Development",
    "Corporate Website",
    "Landing Page",
    "Web Application",
    "SEO Optimization",
    "Website Maintenance",
    "Other",
  ]

  const budgetRanges = [
    "Under ₹5,000",
    "₹5,000 - ₹10,000",
    "₹10,000 - ₹25,000",
    "₹25,000 - ₹50,000",
    "₹50,000+",
    "Let's discuss",
  ]

  const validatePhoneNumber = (phone: string): boolean => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, "")

    // Check for Indian phone number patterns
    // Mobile: 10 digits starting with 6,7,8,9
    // With country code: +91 followed by 10 digits
    const indianMobileRegex = /^(\+91|91)?[6-9]\d{9}$/

    return indianMobileRegex.test(cleanPhone)
  }

  const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digit characters except +
    const cleaned = phone.replace(/[^\d+]/g, "")

    // If it starts with +91, format as +91 XXXXX XXXXX
    if (cleaned.startsWith("+91")) {
      const number = cleaned.slice(3)
      if (number.length <= 5) return `+91 ${number}`
      return `+91 ${number.slice(0, 5)} ${number.slice(5, 10)}`
    }

    // If it starts with 91, format as +91 XXXXX XXXXX
    if (cleaned.startsWith("91") && cleaned.length > 2) {
      const number = cleaned.slice(2)
      if (number.length <= 5) return `+91 ${number}`
      return `+91 ${number.slice(0, 5)} ${number.slice(5, 10)}`
    }

    // If it's 10 digits starting with 6,7,8,9, format as +91 XXXXX XXXXX
    if (cleaned.length === 10 && /^[6-9]/.test(cleaned)) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
    }

    return phone
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = "Please enter a valid Indian phone number"
    }
    if (!formData.message.trim()) newErrors.message = "Message is required"
    if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        alert("Message sent successfully!")

        setIsSubmitted(true)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          budget: "",
          message: "",
          newsletter: false,
        })

        setTimeout(() => {
          setIsSubmitted(false)
        }, 3000)
      } else {
        alert(result.message || "Failed to send message. Please try again.")
      }
    } catch (error: any) {
      console.error("Error submitting form:", error)
      alert("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

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

  const handleCallButtonClick = () => {
    if (isMobile) {
      // On mobile, use tel: link
      window.location.href = "tel:+919075451056"
    } else {
      // On desktop, copy number to clipboard
      copyPhoneNumber()
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 90754 51056", "+91 93567 24951"],
      color: "blue",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["benevolus436@gmail.com"],
      color: "purple",
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["Nagpur, Maharashtra,", "India, 441002"],
      color: "green",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
      color: "orange",
    },
  ]

  const faqs = [
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity, but most websites take 2-6 weeks from start to finish.",
    },
    {
      question: "Do you provide ongoing maintenance?",
      answer:
        "Yes! We offer comprehensive maintenance packages to keep your website secure, updated, and performing optimally.",
    },
    {
      question: "Can you help with SEO?",
      answer: "All our websites are built with SEO best practices, and we offer dedicated SEO optimization services.",
    },
    {
      question: "What's included in your web design service?",
      answer: "Our service includes custom design, responsive development, SEO optimization, and ongoing support.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Ready to transform your online presence? Let's discuss your project and create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <div className="relative">
              <Button
                size="lg"
                variant="outline"
                className="hover:bg-blue-50 bg-transparent"
                onClick={handleCallButtonClick}
              >
                {isMobile ? (
                  <>
                    <Phone className="mr-2 w-5 h-5" />
                    Call +91 90754 51056
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 w-5 h-5" />
                    Copy +91 90754 51056
                  </>
                )}
              </Button>
              {showCopyMessage && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap">
                  Phone number copied!
                </div>
              )}
            </div>
          </div>
          {!isMobile && (
            <p className="text-sm text-gray-500 mt-4">
              Click to copy phone number • Or call us directly at +91 90754 51056
            </p>
          )}
        </div>
      </section>

      {/* Contact Info Cards */}
      

      {/* Why Contact Us */}
      

      {/* Project Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Can We Build For You?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From simple websites to complex web applications, we handle projects of all sizes and complexities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                {
                  type: "Business Websites",
                  description: "Professional websites that establish credibility and generate leads for your business.",
                  features: [
                    "Custom Design",
                    "Mobile Responsive",
                    "SEO Optimized",
                    "Contact Forms",
                    "Social Integration",
                  ],
                  timeline: "2-3 weeks",
                  icon: "🏢",
                },
                {
                  type: "E-commerce Stores",
                  description:
                    "Complete online stores with payment processing, inventory management, and order tracking.",
                  features: [
                    "Shopping Cart",
                    "Payment Gateway",
                    "Inventory Management",
                    "Order Tracking",
                    "Customer Accounts",
                  ],
                  timeline: "3-4 weeks",
                  icon: "🛒",
                },
                {
                  type: "Portfolio Websites",
                  description:
                    "Stunning portfolios that showcase your work and attract potential clients or employers.",
                  features: [
                    "Gallery Systems",
                    "Project Showcases",
                    "Client Testimonials",
                    "Blog Integration",
                    "Contact Forms",
                  ],
                  timeline: "2-3 weeks",
                  icon: "🎨",
                },
              ].map((project) => (
                <Card key={project.type} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">{project.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.type}</h3>
                        <p className="text-gray-600 mb-4">{project.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900 mb-2">Key Features:</p>
                            <div className="space-y-1">
                              {project.features.slice(0, 3).map((feature) => (
                                <div key={feature} className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-end">
                              <div className="text-right">
                                <span className="text-sm font-medium text-gray-900">Timeline: </span>
                                <span className="text-sm text-blue-600">{project.timeline}</span>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-bold text-green-600">{project.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Process</h3>
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Discovery Call", description: "We discuss your needs and goals" },
                      { step: "2", title: "Proposal & Quote", description: "Detailed project proposal with timeline" },
                      { step: "3", title: "Design & Development", description: "We bring your vision to life" },
                      { step: "4", title: "Review & Launch", description: "Final review and website launch" },
                    ].map((phase) => (
                      <div key={phase.step} className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {phase.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{phase.title}</h4>
                          <p className="text-sm text-gray-600">{phase.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Not Sure What You Need?</h3>
                  <p className="text-gray-600 mb-4">
                    No problem! We offer free consultations to help you understand what type of website or application
                    would work best for your business.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Free 30-minute consultation
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      No obligation quote
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Expert recommendations
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Response Guarantee</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    We respond to all inquiries within 24 hours, usually much sooner. Need urgent help? Call us
                    directly!
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Average response time:</span>
                    <span className="text-lg font-bold text-green-600">2 hours</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Availability */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">We're Here When You Need Us</h2>
              <p className="text-xl text-gray-600 mb-8">
                Based in Nagpur, Maharashtra, we serve clients across India and globally. Our team is available during
                business hours and for urgent support.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Local Presence",
                    description: "Based in Nagpur with deep understanding of the Indian market and business culture.",
                    icon: "📍",
                  },
                  {
                    title: "Global Reach",
                    description: "We work with clients worldwide, adapting to different time zones and requirements.",
                    icon: "🌍",
                  },
                  {
                    title: "Flexible Communication",
                    description: "Available via phone, email, WhatsApp, and video calls - whatever works best for you.",
                    icon: "💬",
                  },
                  {
                    title: "Emergency Support",
                    description: "Critical issues? We provide emergency support to keep your website running smoothly.",
                    icon: "🚨",
                  },
                ].map((feature) => (
                  <div key={feature.title} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xl">{feature.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Contact Information</h3>

              <div className="space-y-6">
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Business Hours</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Emergency support only</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Phone Support</h4>
                    <p className="text-sm text-gray-600 mb-2">Call us directly for immediate assistance</p>
                    <div className="space-y-1">
                      <p className="text-blue-600 font-medium">+91 90754 51056</p>
                      <p className="text-blue-600 font-medium">+91 93567 24951</p>
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
                    <p className="text-sm text-gray-600 mb-2">For detailed inquiries and project discussions</p>
                    <p className="text-blue-600 font-medium">benevolus436@gmail.com</p>
                  </div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Response Time Guarantee</h4>
                  <p className="text-sm text-green-700">
                    We guarantee a response within 24 hours for all inquiries. Most responses are sent within 2-4 hours
                    during business hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
              <p className="text-xl text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
            </div>

            <Card className="shadow-xl">
              <CardContent className="p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          onFocus={() => setActiveField("firstName")}
                          onBlur={() => setActiveField(null)}
                          className={`transition-all duration-300 ${
                            activeField === "firstName" ? "ring-2 ring-blue-500" : ""
                          } ${errors.firstName ? "border-red-500" : ""}`}
                          placeholder="John"
                        />
                        {errors.firstName && (
                          <div className="flex items-center text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.firstName}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">
                          Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          onFocus={() => setActiveField("lastName")}
                          onBlur={() => setActiveField(null)}
                          className={`transition-all duration-300 ${
                            activeField === "lastName" ? "ring-2 ring-blue-500" : ""
                          } ${errors.lastName ? "border-red-500" : ""}`}
                          placeholder="Doe"
                        />
                        {errors.lastName && (
                          <div className="flex items-center text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.lastName}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          onFocus={() => setActiveField("email")}
                          onBlur={() => setActiveField(null)}
                          className={`transition-all duration-300 ${
                            activeField === "email" ? "ring-2 ring-blue-500" : ""
                          } ${errors.email ? "border-red-500" : ""}`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <div className="flex items-center text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.email}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          Phone <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => {
                            // Only allow digits, +, and spaces
                            const value = e.target.value.replace(/[^0-9+\s]/g, "")
                            const formatted = formatPhoneNumber(value)
                            handleInputChange("phone", formatted)
                          }}
                          onKeyDown={(e) => {
                            // Prevent non-numeric characters except backspace, delete, arrow keys, +
                            if (
                              !/[0-9]/.test(e.key) &&
                              !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "+"].includes(e.key) &&
                              !(e.key === "a" && e.ctrlKey) && // Allow Ctrl+A
                              !(e.key === "c" && e.ctrlKey) && // Allow Ctrl+C
                              !(e.key === "v" && e.ctrlKey) // Allow Ctrl+V
                            ) {
                              e.preventDefault()
                            }
                          }}
                          onFocus={() => setActiveField("phone")}
                          onBlur={() => setActiveField(null)}
                          className={`transition-all duration-300 ${
                            activeField === "phone" ? "ring-2 ring-purple-500" : ""
                          } ${errors.phone ? "border-red-500" : ""}`}
                          placeholder="+91 90754 51056"
                          inputMode="numeric"
                          pattern="[0-9+\s]*"
                        />
                        {errors.phone && (
                          <div className="flex items-center text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.phone}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        onFocus={() => setActiveField("company")}
                        onBlur={() => setActiveField(null)}
                        className={`transition-all duration-300 ${
                          activeField === "company" ? "ring-2 ring-blue-500" : ""
                        }`}
                        placeholder="Your Company Name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Service Needed</Label>
                        <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Budget Range</Label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Project Details <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        onFocus={() => setActiveField("message")}
                        onBlur={() => setActiveField(null)}
                        className={`min-h-[120px] transition-all duration-300 ${
                          activeField === "message" ? "ring-2 ring-blue-500" : ""
                        } ${errors.message ? "border-red-500" : ""}`}
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                      />
                      {errors.message && (
                        <div className="flex items-center text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.message}
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get quick answers to common questions about our services
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
