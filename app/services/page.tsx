"use client"

import { useState, useEffect } from "react"
import { ArrowRight, CheckCircle, Palette, Code, Smartphone, Search, Globe, Headphones, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useRouter } from "next/navigation"

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0)
  const router = useRouter()
  const [selectedServiceModal, setSelectedServiceModal] = useState<number | null>(null)

  // Add this useEffect after the existing useState declarations
  useEffect(() => {
    if (selectedServiceModal !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedServiceModal])

  const navigateToContact = () => {
    router.push("/contact#contact-form")
  }

  const services = [
    {
      icon: Palette,
      title: "Custom Web Design",
      description: "Innovative designs that reflect your brand and engage your audience through cutting-edge tech.",
      features: [
        "Custom UI/UX Design",
        "Brand Integration",
        "User Experience Optimization",
        "Visual Hierarchy Planning",
        "Color Psychology Application",
        "Typography Selection",
      ],
      color: "blue",
    },
    {
      icon: Smartphone,
      title: "Responsive Development",
      description: "Mobile-first designs that look perfect on all devices, leveraging the latest tech for optimal UX.",
      features: [
        "Mobile-First Approach",
        "Cross-Browser Compatibility",
        "Touch-Friendly Interfaces",
        "Progressive Web App Features",
        "Performance Optimization",
        "Accessibility Standards",
      ],
      color: "purple",
    },
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Complete web applications built with modern technologies and innovative coding practices.",
      features: [
        "React/Next.js Development",
        "Database Integration",
        "API Development",
        "Authentication Systems",
        "Payment Integration",
        "Content Management",
      ],
      color: "green",
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Built-in SEO best practices to help your website rank higher using innovative strategies.",
      features: [
        "Technical SEO Audit",
        "Keyword Research",
        "On-Page Optimization",
        "Site Speed Optimization",
        "Schema Markup",
        "Analytics Setup",
      ],
      color: "orange",
    },
    {
      icon: Globe,
      title: "E-Commerce Solutions",
      description:
        "Complete online stores with payment processing and inventory management, powered by innovative tech.",
      features: [
        "Shopping Cart Integration",
        "Payment Gateway Setup",
        "Inventory Management",
        "Order Processing",
        "Customer Accounts",
        "Analytics & Reporting",
      ],
      color: "red",
    },
    {
      icon: Headphones,
      title: "Maintenance & Support",
      description: "Ongoing website maintenance, updates, and technical support with innovative solutions.",
      features: [
        "Regular Updates",
        "Security Monitoring",
        "Backup Management",
        "Performance Monitoring",
        "Content Updates",
        "Technical Support",
      ],
      color: "indigo",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Services</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From custom web design to full-stack development, we offer comprehensive solutions to bring your digital
            vision to life. Contact us to get started.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-blue-200"
                onClick={() => setActiveService(index)}
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 bg-${service.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {service.icon && <service.icon className={`w-8 h-8 text-${service.color}-600`} />}
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature) => (
                      <div key={feature} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full group-hover:bg-blue-600 transition-colors"
                    onClick={() => setSelectedServiceModal(index)}
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Development Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From concept to launch, we follow a proven methodology that ensures quality and timely delivery
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>

              <div className="space-y-12">
                {[
                  {
                    phase: "Discovery & Research",
                    duration: "1-2 days",
                    description:
                      "We analyze your requirements, research your industry, and create a detailed project roadmap.",
                    deliverables: ["Project Brief", "Technical Specifications", "Timeline & Milestones"],
                    icon: "🔍",
                  },
                  {
                    phase: "Design & Wireframing",
                    duration: "3-5 days",
                    description:
                      "Our designers create wireframes, mockups, and prototypes that align with your brand vision.",
                    deliverables: ["Wireframes", "Design Mockups", "Interactive Prototypes"],
                    icon: "🎨",
                  },
                  {
                    phase: "Development & Coding",
                    duration: "1-3 weeks",
                    description:
                      "We build your website using modern technologies, ensuring clean code and optimal performance.",
                    deliverables: ["Frontend Development", "Backend Integration", "Database Setup"],
                    icon: "💻",
                  },
                  {
                    phase: "Testing & Quality Assurance",
                    duration: "2-3 days",
                    description: "Comprehensive testing across devices, browsers, and performance optimization.",
                    deliverables: ["Cross-browser Testing", "Mobile Responsiveness", "Performance Optimization"],
                    icon: "🧪",
                  },
                  {
                    phase: "Launch & Deployment",
                    duration: "1 day",
                    description: "We deploy your website to production and ensure everything runs smoothly.",
                    deliverables: ["Live Website", "SSL Certificate", "Analytics Setup"],
                    icon: "🚀",
                  },
                  {
                    phase: "Support & Maintenance",
                    duration: "Ongoing",
                    description:
                      "Continuous support, updates, and maintenance to keep your website performing optimally.",
                    deliverables: ["Regular Updates", "Security Monitoring", "Performance Reports"],
                    icon: "🛠️",
                  },
                ].map((step, index) => (
                  <div
                    key={step.phase}
                    className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className={`text-2xl ${index % 2 === 0 ? "order-2" : "order-1"}`}>{step.icon}</div>
                            <div className={`${index % 2 === 0 ? "order-1" : "order-2"}`}>
                              <CardTitle className="text-lg">{step.phase}</CardTitle>
                              <p className="text-sm text-blue-600 font-medium">{step.duration}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4">{step.description}</p>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900">Deliverables:</p>
                            {step.deliverables.map((deliverable) => (
                              <div key={deliverable} className="flex items-center text-sm text-gray-600">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                {deliverable}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline dot */}
                    <div className="w-4 h-4 bg-white border-4 border-blue-500 rounded-full z-10 shadow-lg"></div>

                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      

      {/* Technologies Deep Dive */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technology Stack</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We use cutting-edge technologies to build fast, secure, and scalable solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Our Tech Stack Matters</h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Performance First",
                    description:
                      "Our technology choices prioritize speed and performance, ensuring your website loads in under 3 seconds.",
                    icon: "⚡",
                  },
                  {
                    title: "Scalability Built-in",
                    description:
                      "We build with growth in mind, so your website can handle increased traffic and functionality.",
                    icon: "📈",
                  },
                  {
                    title: "Security by Design",
                    description:
                      "Every technology we use follows security best practices to protect your data and users.",
                    icon: "🔒",
                  },
                  {
                    title: "Future-Proof Solutions",
                    description: "We choose technologies with strong community support and long-term viability.",
                    icon: "🚀",
                  },
                ].map((benefit) => (
                  <div key={benefit.title} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xl">{benefit.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Our Complete Tech Arsenal</h3>

              <div className="space-y-6">
                {[
                  {
                    category: "Frontend",
                    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
                    color: "blue",
                  },
                  {
                    category: "Backend",
                    technologies: ["Node.js", "Express.js", "Python", "MongoDB", "PostgreSQL"],
                    color: "green",
                  },
                  {
                    category: "Cloud & DevOps",
                    technologies: ["AWS", "Vercel", "Docker", "GitHub Actions", "Cloudflare"],
                    color: "purple",
                  },
                  {
                    category: "Tools & Analytics",
                    technologies: ["Figma", "Google Analytics", "Hotjar", "Stripe", "Resend"],
                    color: "orange",
                  },
                ].map((tech) => (
                  <div key={tech.category}>
                    <h4 className={`text-sm font-bold text-${tech.color}-600 mb-3 uppercase tracking-wide`}>
                      {tech.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tech.technologies.map((technology) => (
                        <span
                          key={technology}
                          className={`px-3 py-1 bg-${tech.color}-50 text-${tech.color}-700 rounded-full text-sm font-medium`}
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Success Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how our services have transformed businesses across different industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                client: "TechStart Inc.",
                industry: "E-commerce",
                challenge: "Outdated website with poor mobile experience",
                solution: "Complete redesign with mobile-first approach",
                results: [
                  "300% increase in mobile conversions",
                  "50% reduction in bounce rate",
                  "2x increase in average session duration",
                ],
                image: "/images/success-techstart.jpg",
              },
              {
                client: "StyleHub Fashion",
                industry: "Fashion Retail",
                challenge: "Low online sales and poor user engagement",
                solution: "Modern e-commerce platform with social features",
                results: [
                  "200% increase in online sales",
                  "40% higher user engagement",
                  "25% increase in return customers",
                ],
                image: "/images/success-stylehub.jpg",
              },
              {
                client: "GrowthCo Consulting",
                industry: "Business Consulting",
                challenge: "Lack of professional online presence",
                solution: "Corporate website with client portal",
                results: [
                  "150% increase in lead generation",
                  "60% improvement in client satisfaction",
                  "35% faster client onboarding",
                ],
                image: "/images/success-growthco.jpg",
              },
            ].map((story, index) => (
              <Card key={story.client} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📈</div>
                    <div className="text-sm text-gray-600">{story.industry}</div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{story.client}</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-red-600 mb-1">Challenge</h4>
                      <p className="text-sm text-gray-600">{story.challenge}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-blue-600 mb-1">Solution</h4>
                      <p className="text-sm text-gray-600">{story.solution}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-green-600 mb-2">Results</h4>
                      <div className="space-y-1">
                        {story.results.map((result) => (
                          <div key={result} className="flex items-center text-sm text-gray-600">
                            <ArrowRight className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      

      {/* Service Details Modal */}
      {selectedServiceModal !== null && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="relative">
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10 shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                {selectedServiceModal !== null && (
                  <>
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-8">
                      <div
                        className={`w-20 h-20 bg-${services[selectedServiceModal].color}-100 rounded-2xl flex items-center justify-center flex-shrink-0`}
                      >
                        {(() => {
                          const IconComponent = services[selectedServiceModal].icon
                          return (
                            <IconComponent className={`w-10 h-10 text-${services[selectedServiceModal].color}-600`} />
                          )
                        })()}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-4xl font-bold text-gray-900 mb-3">
                          {services[selectedServiceModal].title}
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                          {services[selectedServiceModal].description}
                        </p>
                      </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                      {/* Features Section */}
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-6">What's Included:</h3>
                        <div className="space-y-4">
                          {services[selectedServiceModal].features.map((feature, idx) => (
                            <div key={idx} className="flex items-start text-gray-700 p-3 bg-gray-50 rounded-lg">
                              <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="font-medium">{feature}</span>
                                <p className="text-sm text-gray-600 mt-1">
                                  Professional implementation with attention to detail and best practices.
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Benefits & Process Section */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose This Service?</h3>
                          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                            <p className="text-gray-700 leading-relaxed mb-4">
                              Our {services[selectedServiceModal].title.toLowerCase()} service combines cutting-edge
                              technology with proven strategies to deliver exceptional results. We focus on creating
                              solutions that not only look great but also drive real business growth and user
                              engagement.
                            </p>
                            <ul className="space-y-2 text-gray-600">
                              <li className="flex items-center">
                                <ArrowRight className="w-4 h-4 text-blue-600 mr-2" />
                                Industry-leading expertise and experience
                              </li>
                              <li className="flex items-center">
                                <ArrowRight className="w-4 h-4 text-blue-600 mr-2" />
                                Custom solutions tailored to your needs
                              </li>
                              <li className="flex items-center">
                                <ArrowRight className="w-4 h-4 text-blue-600 mr-2" />
                                Ongoing support and maintenance
                              </li>
                              <li className="flex items-center">
                                <ArrowRight className="w-4 h-4 text-blue-600 mr-2" />
                                Proven track record of success
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Process:</h3>
                          <div className="space-y-3">
                            <div className="flex items-center p-3 bg-white border border-gray-200 rounded-lg">
                              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm mr-3">
                                1
                              </div>
                              <span className="text-gray-700">Discovery & Planning</span>
                            </div>
                            <div className="flex items-center p-3 bg-white border border-gray-200 rounded-lg">
                              <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm mr-3">
                                2
                              </div>
                              <span className="text-gray-700">Design & Development</span>
                            </div>
                            <div className="flex items-center p-3 bg-white border border-gray-200 rounded-lg">
                              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold text-sm mr-3">
                                3
                              </div>
                              <span className="text-gray-700">Testing & Launch</span>
                            </div>
                            <div className="flex items-center p-3 bg-white border border-gray-200 rounded-lg">
                              <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold text-sm mr-3">
                                4
                              </div>
                              <span className="text-gray-700">Support & Optimization</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pricing & Timeline Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-blue-50 rounded-xl p-6 text-center">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Timeline</h4>
                        <p className="text-2xl font-bold text-blue-600 mb-1">2-6 weeks</p>
                        <p className="text-sm text-gray-600">Depending on project scope</p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-6 text-center">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Support</h4>
                        <p className="text-2xl font-bold text-green-600 mb-1">24/7</p>
                        <p className="text-sm text-gray-600">Ongoing maintenance available</p>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-6 text-center">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Guarantee</h4>
                        <p className="text-2xl font-bold text-purple-600 mb-1">100%</p>
                        <p className="text-sm text-gray-600">Satisfaction guaranteed</p>
                      </div>
                    </div>

                    {/* Technologies Used */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Technologies We Use:</h3>
                      <div className="flex flex-wrap gap-3">
                        {[
                          "React",
                          "Next.js",
                          "TypeScript",
                          "Tailwind CSS",
                          "Node.js",
                          "MongoDB",
                          "PostgreSQL",
                          "AWS",
                          "Vercel",
                          "Figma",
                          "Adobe Creative Suite",
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-3"
                        onClick={() => {
                          setSelectedServiceModal(null)
                          document.body.style.overflow = "unset"
                          navigateToContact()
                        }}
                      >
                        Get Free Consultation
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 hover:bg-gray-50 bg-transparent text-lg py-3"
                        onClick={() => {
                          setSelectedServiceModal(null)
                          document.body.style.overflow = "unset"
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
