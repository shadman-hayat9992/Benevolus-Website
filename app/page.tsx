"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Star, Palette, Code, Smartphone, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedCounter } from "@/components/animated-counter"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const router = useRouter()

  const testimonials = [
    {
      text: "Benevolus transformed our online presence completely. The new website not only looks amazing but has increased our leads by 300%. Highly recommended!",
      author: "Sandeep Kumar",
      role: "CEO, TechStart Inc.",
      rating: 5,
    },
    {
      text: "Professional, creative, and delivered on time. Our e-commerce site has never performed better. The team really understands modern web design.",
      author: "Sunder Raju",
      role: "Founder, StyleHub",
      rating: 5,
    },
    {
      text: "Exceptional service from start to finish. They listened to our needs and created exactly what we envisioned. Our conversion rate doubled!",
      author: "Mehra Malik",
      role: "Marketing Director, GrowthCo",
      rating: 5,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const services = [
    {
      icon: Palette,
      title: "Custom Web Design",
      description: "Unique, tailored designs that reflect your brand and engage your audience",
      color: "blue",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Mobile-first designs that look perfect on all devices and screen sizes",
      color: "purple",
    },
    {
      icon: Code,
      title: "Development",
      description: "Clean, efficient code using the latest technologies and best practices",
      color: "green",
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Built-in SEO best practices to help your website rank higher in search results",
      color: "orange",
    },
  ]

  const navigateToContact = () => {
    router.push("/contact#contact-form")
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left px-4 lg:px-0">
              <div className="inline-block px-3 py-1.5 lg:px-4 lg:py-2 bg-blue-100 text-blue-800 rounded-full text-xs lg:text-sm font-medium mb-4 lg:mb-6 animate-pulse">
                🚀 New: AI-Powered Design Tools Available
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
                Innovative Tech Solutions
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient">
                  That Drive Growth
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0">
                We deliver cutting-edge technology solutions and innovative web experiences that propel your business
                forward. From AI-driven insights to seamless user interfaces, we transform your digital presence.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={navigateToContact}
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
                </Button>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              {/* Circular Tech Design */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto">
                {/* Main Central Circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full animate-ping"></div>
                  </div>
                </div>

                {/* Orbital Rings */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 lg:w-60 lg:h-60 border-2 border-blue-300 rounded-full opacity-40 animate-spin-slow"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-80 lg:h-80 border border-purple-300 rounded-full opacity-30 animate-spin-reverse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 border border-green-300 rounded-full opacity-20 animate-spin-slow"></div>

                {/* Orbiting Tech Elements */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 lg:w-60 lg:h-60 animate-spin-slow">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full border-2 border-blue-300 animate-bounce">
                    <div className="absolute inset-1 bg-white rounded-full opacity-60"></div>
                  </div>
                  <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-5 h-5 bg-green-500 rounded-full border-2 border-green-300 animate-pulse">
                    <div className="absolute inset-0.5 bg-white rounded-full opacity-60"></div>
                  </div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-2 border-purple-300 animate-bounce">
                    <div className="absolute inset-0.5 bg-white rounded-full opacity-60"></div>
                  </div>
                  <div className="absolute top-1/2 -left-3 transform -translate-y-1/2 w-5 h-5 bg-orange-500 rounded-full border-2 border-orange-300 animate-pulse">
                    <div className="absolute inset-0.5 bg-white rounded-full opacity-60"></div>
                  </div>
                </div>

                {/* Secondary Orbital Elements */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-80 lg:h-80 animate-spin-reverse">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full animate-ping"></div>
                  <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-500 rounded-full animate-bounce"></div>
                  <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                </div>

                {/* Data Flow Circles */}
                <div className="absolute top-8 right-8 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-80 animate-float">
                  <div className="absolute inset-2 bg-white/30 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-ping"></div>
                </div>

                <div className="absolute bottom-8 left-8 w-10 h-10 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-80 animate-float-delayed">
                  <div className="absolute inset-2 bg-white/30 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                </div>

                <div className="absolute top-16 left-16 w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-80 animate-bounce">
                  <div className="absolute inset-1.5 bg-white/30 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                </div>

                <div className="absolute bottom-16 right-16 w-6 h-6 lg:w-10 lg:h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-80 animate-pulse">
                  <div className="absolute inset-1 bg-white/30 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full animate-bounce"></div>
                </div>

                {/* Connection Lines Between Circles */}
                <svg className="absolute inset-0 w-full h-full opacity-30">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="20%"
                    fill="none"
                    stroke="url(#circleGradient1)"
                    strokeWidth="1"
                    strokeDasharray="10,5"
                    className="animate-spin-slow"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="30%"
                    fill="none"
                    stroke="url(#circleGradient2)"
                    strokeWidth="1"
                    strokeDasharray="15,10"
                    className="animate-spin-reverse"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="40%"
                    fill="none"
                    stroke="url(#circleGradient3)"
                    strokeWidth="0.5"
                    strokeDasharray="20,15"
                    className="animate-spin-slow"
                  />
                  <defs>
                    <linearGradient id="circleGradient1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient id="circleGradient2">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="circleGradient3">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Floating Binary Code in Circles */}
                <div className="absolute top-4 left-1/3 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center animate-float">
                  <span className="text-xs font-mono text-blue-600 font-bold">01</span>
                </div>
                <div className="absolute bottom-4 right-1/3 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center animate-float-delayed">
                  <span className="text-xs font-mono text-green-600 font-bold">10</span>
                </div>
                <div className="absolute top-1/3 right-4 w-7 h-7 bg-purple-500/20 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-xs font-mono text-purple-600 font-bold">11</span>
                </div>
                <div className="absolute bottom-1/3 left-4 w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-xs font-mono text-orange-600 font-bold">00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <AnimatedCounter end={10} suffix="+" />
              <div className="text-gray-600 group-hover:text-gray-900 transition-colors text-sm lg:text-base">
                Projects Completed
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <AnimatedCounter end={100} suffix="%" />
              <div className="text-gray-600 group-hover:text-gray-900 transition-colors text-sm lg:text-base">
                Client Satisfaction
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center justify-center">
                <AnimatedCounter end={5} />
                <Star className="w-5 h-5 lg:w-6 lg:h-6 fill-yellow-400 text-yellow-400 ml-1" />
              </div>
              <div className="text-gray-600 group-hover:text-gray-900 transition-colors text-sm lg:text-base">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive web design solutions to help your business succeed online
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className="border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="p-4 lg:p-6">
                  <div
                    className={`w-10 h-10 lg:w-12 lg:h-12 bg-${service.color}-100 rounded-lg flex items-center justify-center mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className={`w-5 h-5 lg:w-6 lg:h-6 text-${service.color}-600`} />
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors text-lg lg:text-xl">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-sm lg:text-base">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 bg-transparent"
              >
                View All Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Work</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our proven process ensures your project is delivered on time, within budget, and exceeds expectations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Planning",
                description:
                  "We start by understanding your business goals, target audience, and project requirements through detailed consultation.",
                icon: "🔍",
                color: "blue",
              },
              {
                step: "02",
                title: "Design & Prototype",
                description:
                  "Our designers create wireframes and prototypes, ensuring the user experience aligns with your vision.",
                icon: "🎨",
                color: "purple",
              },
              {
                step: "03",
                title: "Development & Testing",
                description:
                  "We build your website using cutting-edge technologies, followed by rigorous testing across all devices.",
                icon: "⚡",
                color: "green",
              },
              {
                step: "04",
                title: "Launch & Support",
                description:
                  "After launch, we provide ongoing support, maintenance, and optimization to ensure peak performance.",
                icon: "🚀",
                color: "orange",
              },
            ].map((process, index) => (
              <div key={process.step} className="relative group" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-blue-200">
                  <div
                    className={`w-16 h-16 bg-${process.color}-100 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-2xl">{process.icon}</span>
                  </div>
                  <div className={`text-sm font-bold text-${process.color}-600 mb-2 text-center`}>
                    STEP {process.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center group-hover:text-blue-600 transition-colors">
                    {process.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">{process.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full absolute -right-1 -top-0.75"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies We Use */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technologies We Master</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We use the latest and most reliable technologies to build fast, secure, and scalable websites
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                category: "Frontend Development",
                description: "Creating beautiful, responsive user interfaces",
                technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Angular"],
                color: "blue",
                icon: "💻",
              },
              {
                category: "Backend Development",
                description: "Building robust server-side applications",
                technologies: ["Node.js", "Python", "Express.js", "MongoDB", "PostgreSQL", "Redis"],
                color: "green",
                icon: "⚙️",
              },
              {
                category: "Cloud & DevOps",
                description: "Deploying and scaling applications efficiently",
                technologies: ["AWS", "Vercel", "Docker", "GitHub Actions", "Cloudflare", "Firebase"],
                color: "purple",
                icon: "☁️",
              },
            ].map((tech, index) => (
              <Card
                key={tech.category}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-blue-200"
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 bg-${tech.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-2xl">{tech.icon}</span>
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">{tech.category}</CardTitle>
                  <CardDescription>{tech.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {tech.technologies.map((technology) => (
                      <span
                        key={technology}
                        className={`px-3 py-1 bg-${tech.color}-50 text-${tech.color}-700 rounded-full text-sm font-medium hover:bg-${tech.color}-100 transition-colors cursor-default`}
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Technology Logos */}
          
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Benevolus?
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We're not just another web development agency. We're your technology partners committed to your success.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Innovative Solutions",
                    description:
                      "We leverage cutting-edge technologies and creative approaches to solve complex challenges.",
                    icon: "💡",
                  },
                  {
                    title: "Client-Centric Approach",
                    description:
                      "Your success is our priority. We work closely with you throughout the entire process.",
                    icon: "🤝",
                  },
                  {
                    title: "Quality Assurance",
                    description: "Rigorous testing and quality checks ensure your website performs flawlessly.",
                    icon: "✅",
                  },
                  {
                    title: "Ongoing Support",
                    description: "We provide continuous support and maintenance to keep your website running smoothly.",
                    icon: "🛠️",
                  },
                ].map((feature, index) => (
                  <div key={feature.title} className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl">{feature.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Project Success Rate</h3>
                  <p className="text-gray-600">Based on our completed projects</p>
                </div>

                <div className="space-y-4">
                  {[
                    { metric: "On-Time Delivery", percentage: 98, color: "blue" },
                    { metric: "Client Satisfaction", percentage: 100, color: "blue" },
                    { metric: "Budget Adherence", percentage: 95, color: "blue" },
                    { metric: "Performance Goals Met", percentage: 97, color: "blue" },
                  ].map((stat) => (
                    <div key={stat.metric} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{stat.metric}</span>
                        <span className={`text-sm font-bold text-${stat.color}-600`}>{stat.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-400 h-2 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${stat.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">10+ Projects Completed</span> with excellence
                  </p>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-20 animate-float-delayed"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about our web development services
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "How long does it take to build a website?",
                  answer:
                    "Typically 2-6 weeks depending on complexity. Simple websites take 2-3 weeks, while complex e-commerce or web applications may take 4-6 weeks.",
                },
                {
                  question: "Do you provide website maintenance?",
                  answer:
                    "Yes! We offer comprehensive maintenance packages including security updates, content updates, performance monitoring, and technical support.",
                },
                {
                  question: "Will my website be mobile-friendly?",
                  answer:
                    "Absolutely! All our websites are built with a mobile-first approach and are fully responsive across all devices and screen sizes.",
                },
                {
                  question: "Can you help with SEO?",
                  answer:
                    "Yes, we build all websites with SEO best practices and offer dedicated SEO optimization services to improve your search rankings.",
                },
                {
                  question: "What's included in the project cost?",
                  answer:
                    "Our packages include custom design, development, testing, launch, and 30 days of free support. Additional services like maintenance are available separately.",
                },
                {
                  question: "Do you work with existing websites?",
                  answer:
                    "Yes! We can redesign, optimize, or add new features to existing websites. We also provide migration services from other platforms.",
                },
              ].map((faq, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={navigateToContact}
              >
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Don't just take our word for it</p>
          </div>

          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="flex justify-center space-x-1 mb-4 lg:mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 lg:w-6 lg:h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-lg lg:text-xl text-gray-700 italic mb-4 lg:mb-6 text-center leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div className="text-center">
                <div className="font-semibold text-gray-900 text-base lg:text-lg">
                  {testimonials[currentTestimonial].author}
                </div>
                <div className="text-gray-600 text-sm lg:text-base">{testimonials[currentTestimonial].role}</div>
              </div>

              {/* Testimonial Navigation */}
              <div className="flex justify-center space-x-2 mt-6 lg:mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      

      <Footer />
    </div>
  )
}
