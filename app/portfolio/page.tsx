"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ExternalLink, Filter, X, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useRouter } from "next/navigation"

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const categories = ["All", "E-commerce", "Corporate", "Portfolio", "Landing Page", "Web App"]

  const projects = [
    {
      id: 1,
      title: "TechStart E-commerce Platform",
      category: "E-commerce",
      description: "Modern e-commerce platform with advanced filtering, payment integration, and inventory management.",
      longDescription:
        "A comprehensive e-commerce solution built for TechStart Inc. featuring advanced product filtering, secure payment processing, real-time inventory management, and a responsive design that increased their conversion rate by 300%.",
      image: "/images/portfolio/techstart-ecommerce.jpg?height=400&width=600&text=Modern+E-commerce+Dashboard+with+Shopping+Cart+and+Product+Grid",
      technologies: ["React", "Next.js", "Stripe", "MongoDB"],
      liveUrl: "https://techstart-demo.com",
      githubUrl: "https://github.com/Benevolus/techstart",
      client: "TechStart Inc.",
      year: "2024",
      results: [
        "300% increase in conversion rate",
        "50% reduction in bounce rate",
        "2x increase in average order value",
      ],
    },
    {
      id: 2,
      title: "StyleHub Fashion Store",
      category: "E-commerce",
      description: "Elegant fashion e-commerce site with virtual try-on features and social shopping integration.",
      longDescription:
        "A cutting-edge fashion e-commerce platform featuring virtual try-on technology, social shopping features, and an intuitive design that perfectly captures the brand's aesthetic while driving sales.",
      image: "/images/portfolio/stylehub-fashion.jpg?height=400&width=600&text=Elegant+Fashion+Website+with+Product+Gallery+and+Virtual+Try-On",
      technologies: ["Vue.js", "Node.js", "PostgreSQL", "AWS"],
      liveUrl: "https://stylehub-demo.com",
      githubUrl: "https://github.com/Benevolus/stylehub",
      client: "StyleHub",
      year: "2024",
      results: ["200% increase in online sales", "40% higher user engagement", "25% increase in return customers"],
    },
    {
      id: 3,
      title: "GrowthCo Corporate Website",
      category: "Corporate",
      description: "Professional corporate website with interactive data visualizations and client portal.",
      longDescription:
        "A sophisticated corporate website featuring interactive data visualizations, secure client portal, and modern design that positions GrowthCo as an industry leader.",
      image: "/images/portfolio/growthco-corporate.jpg?height=400&width=600&text=Professional+Corporate+Website+with+Data+Visualizations+and+Charts",
      technologies: ["React", "D3.js", "Express", "MySQL"],
      liveUrl: "https://growthco-demo.com",
      githubUrl: "https://github.com/Benevolus/growthco",
      client: "GrowthCo",
      year: "2023",
      results: ["150% increase in lead generation", "60% improvement in user engagement", "35% faster page load times"],
    },
    {
      id: 4,
      title: "Creative Designer Portfolio",
      category: "Portfolio",
      description:
        "Stunning portfolio website for a creative designer with smooth animations and interactive galleries.",
      longDescription:
        "An award-winning portfolio website featuring smooth animations, interactive project galleries, and a unique design that perfectly showcases the designer's creative work.",
      image: "/images/portfolio/creative-portfolio.jpg?height=400&width=600&text=Creative+Portfolio+with+Interactive+Gallery+and+Smooth+Animations",
      technologies: ["React", "Framer Motion", "Sanity CMS", "Vercel"],
      liveUrl: "https://creative-portfolio-demo.com",
      githubUrl: "https://github.com/Benevolus/creative-portfolio",
      client: "Sarah Creative",
      year: "2023",
      results: ["500% increase in client inquiries", "Featured in design galleries", "90% positive client feedback"],
    },
    {
      id: 5,
      title: "FinTech Landing Page",
      category: "Landing Page",
      description: "High-converting landing page for a fintech startup with interactive demos and lead capture.",
      longDescription:
        "A high-performance landing page designed to convert visitors into customers, featuring interactive product demos, social proof, and optimized conversion funnels.",
      image: "/images/portfolio/fintech-landing.jpg?height=400&width=600&text=Modern+FinTech+Landing+Page+with+Interactive+Demo+and+CTA",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Analytics"],
      liveUrl: "https://fintech-landing-demo.com",
      githubUrl: "https://github.com/Benevolus/fintech-landing",
      client: "FinTech Startup",
      year: "2024",
      results: ["45% conversion rate", "80% reduction in bounce rate", "3x increase in demo requests"],
    },
    {
      id: 6,
      title: "Project Management Web App",
      category: "Web App",
      description: "Full-featured project management application with real-time collaboration and reporting.",
      longDescription:
        "A comprehensive project management web application featuring real-time collaboration, advanced reporting, task management, and team communication tools.",
      image: "/images/portfolio/project-manager.jpg?height=400&width=600&text=Project+Management+Dashboard+with+Task+Boards+and+Team+Collaboration",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      liveUrl: "https://projectmanager-demo.com",
      githubUrl: "https://github.com/Benevolus/project-manager",
      client: "ProductivityCo",
      year: "2023",
      results: ["40% improvement in team productivity", "90% user adoption rate", "50% reduction in project delays"],
    },
  ]


  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  const openLightbox = (projectId: number) => {
    setSelectedProject(projectId)
    setIsLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setSelectedProject(null)
    document.body.style.overflow = "unset"
  }

  const navigateProject = (direction: "prev" | "next") => {
    if (selectedProject === null) return

    const currentIndex = filteredProjects.findIndex((p) => p.id === selectedProject)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredProjects.length - 1
    } else {
      newIndex = currentIndex < filteredProjects.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedProject(filteredProjects[newIndex].id)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return

      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") navigateProject("prev")
      if (e.key === "ArrowRight") navigateProject("next")
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isLightboxOpen, selectedProject])

  const currentProject = selectedProject ? projects.find((p) => p.id === selectedProject) : null

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Portfolio
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Explore our latest projects and see how we've helped businesses transform their online presence with
            stunning, functional websites.
          </p>
          {/* <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    : "hover:bg-blue-50 hover:border-blue-300"
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category}
              </Button>
            ))}
          </div> */}
        </div>
      </section>

      {/* Portfolio Grid */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onClick={() => openLightbox(project.id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">{project.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{project.client}</span>
                    <span className="text-sm text-gray-500">{project.year}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section> */}

      {/* Project Categories Deep Dive */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Expertise Across Industries</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've successfully delivered projects across various industries, each with unique challenges and
              requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                industry: "E-commerce & Retail",
                description: "Online stores with advanced features, payment integration, and inventory management",
                projects: 4,
                features: [
                  "Shopping Cart",
                  "Payment Gateway",
                  "Inventory Management",
                  "Customer Accounts",
                  "Order Tracking",
                ],
                icon: "🛒",
                color: "blue",
              },
              {
                industry: "Corporate & Business",
                description: "Professional websites that establish credibility and generate leads",
                projects: 3,
                features: [
                  "Professional Design",
                  "Lead Generation",
                  "Client Portals",
                  "Team Profiles",
                  "Service Showcase",
                ],
                icon: "🏢",
                color: "purple",
              },
              {
                industry: "Creative & Portfolio",
                description: "Stunning portfolios that showcase creative work and attract clients",
                projects: 2,
                features: [
                  "Gallery Systems",
                  "Project Showcases",
                  "Client Testimonials",
                  "Contact Forms",
                  "Social Integration",
                ],
                icon: "🎨",
                color: "green",
              },
              {
                industry: "Technology & SaaS",
                description: "Modern web applications with complex functionality and integrations",
                projects: 3,
                features: [
                  "User Dashboards",
                  "API Integration",
                  "Real-time Updates",
                  "Data Analytics",
                  "User Management",
                ],
                icon: "💻",
                color: "orange",
              },
              {
                industry: "Healthcare & Medical",
                description: "HIPAA-compliant websites with appointment booking and patient portals",
                projects: 1,
                features: [
                  "Appointment Booking",
                  "Patient Portals",
                  "HIPAA Compliance",
                  "Medical Forms",
                  "Secure Messaging",
                ],
                icon: "🏥",
                color: "blue",
              },
              {
                industry: "Education & Training",
                description: "Learning platforms with course management and student tracking",
                projects: 2,
                features: [
                  "Course Management",
                  "Student Portals",
                  "Progress Tracking",
                  "Online Assessments",
                  "Certificates",
                ],
                icon: "📚",
                color: "purple",
              },
            ].map((category) => (
              <Card
                key={category.industry}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 bg-${category.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <CardTitle className="text-center group-hover:text-blue-400 transition-colors">
                    {category.industry}
                  </CardTitle>
                  <CardDescription className="text-center">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <span
                      className={`inline-block px-3 py-1 bg-${category.color}-100 text-${category.color}-700 rounded-full text-sm font-medium`}
                    >
                      {category.projects} Projects Completed
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900 mb-2">Key Features:</p>
                    {category.features.slice(0, 3).map((feature) => (
                      <div key={feature} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                    {category.features.length > 3 && (
                      <p className="text-xs text-gray-500 mt-2">+{category.features.length - 3} more features</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">From Concept to Launch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our proven development process ensures every project is delivered on time and exceeds expectations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  phase: "Research & Planning",
                  description:
                    "We analyze your requirements, study your target audience, and create a comprehensive project roadmap.",
                  duration: "1-2 days",
                  deliverables: ["Project Brief", "User Research", "Technical Specifications"],
                  icon: "🔍",
                },
                {
                  phase: "Design & Prototyping",
                  description:
                    "Our designers create wireframes, mockups, and interactive prototypes that bring your vision to life.",
                  duration: "3-5 days",
                  deliverables: ["Wireframes", "Visual Designs", "Interactive Prototypes"],
                  icon: "🎨",
                },
                {
                  phase: "Development & Integration",
                  description:
                    "We build your project using modern technologies, ensuring clean code and optimal performance.",
                  duration: "1-3 weeks",
                  deliverables: ["Frontend Development", "Backend Integration", "Third-party APIs"],
                  icon: "⚡",
                },
                {
                  phase: "Testing & Launch",
                  description: "Comprehensive testing across devices and browsers, followed by deployment and launch.",
                  duration: "2-3 days",
                  deliverables: ["Quality Assurance", "Performance Testing", "Live Deployment"],
                  icon: "🚀",
                },
              ].map((step, index) => (
                <div key={step.phase} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">{step.icon}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{step.phase}</h3>
                      <span className="ml-auto text-sm text-blue-600 font-medium">{step.duration}</span>
                    </div>
                    <p className="text-gray-600 mb-3">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((deliverable) => (
                        <span key={deliverable} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Project Success Metrics</h3>

              <div className="space-y-6">
                {[
                  { metric: "On-Time Delivery", value: "100%", description: "All projects delivered on schedule" },
                  { metric: "Client Satisfaction", value: "100%", description: "Perfect satisfaction rating" },
                  { metric: "Performance Score", value: "95+", description: "Average PageSpeed score" },
                  { metric: "Mobile Responsiveness", value: "100%", description: "Perfect mobile compatibility" },
                ].map((stat) => (
                  <div key={stat.metric} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{stat.metric}</span>
                      <span className="text-2xl font-bold text-blue-600">{stat.value}</span>
                    </div>
                    <p className="text-xs text-gray-600">{stat.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-green-500">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-green-600">Quality Guarantee:</span> We ensure every project meets
                  our high standards before delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Used */}
      

      {/* Lightbox Modal */}
      {isLightboxOpen && currentProject && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={() => navigateProject("prev")}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={() => navigateProject("next")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              <img
                src={currentProject.image || "/placeholder.svg"}
                alt={currentProject.title}
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="p-8">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge className="bg-blue-600">{currentProject.category}</Badge>
                <span className="text-gray-600">
                  {currentProject.client} • {currentProject.year}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">{currentProject.title}</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{currentProject.longDescription}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Results</h3>
                  <ul className="space-y-2">
                    {currentProject.results.map((result, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <ArrowRight className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live Site
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      

      <Footer />
    </div>
  )
}
