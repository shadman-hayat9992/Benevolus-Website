"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, MapPin, Clock, Users, Heart, Star, Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface ApplicationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  experience: string
  portfolio: string
  coverLetter: string
  resume: File | null
}

export default function CareersPage() {
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    portfolio: "",
    coverLetter: "",
    resume: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors((prev) => ({ ...prev, resume: "File size must be less than 5MB" }))
        return
      }
      if (!file.type.includes("pdf") && !file.type.includes("doc") && !file.type.includes("docx")) {
        setErrors((prev) => ({ ...prev, resume: "Please upload a PDF, DOC, or DOCX file" }))
        return
      }
      setApplicationData((prev) => ({ ...prev, resume: file }))
      setErrors((prev) => ({ ...prev, resume: "" }))
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, resume: "File size must be less than 5MB" }))
        return
      }
      if (!file.type.includes("pdf") && !file.type.includes("doc") && !file.type.includes("docx")) {
        setErrors((prev) => ({ ...prev, resume: "Please upload a PDF, DOC, or DOCX file" }))
        return
      }
      setApplicationData((prev) => ({ ...prev, resume: file }))
      setErrors((prev) => ({ ...prev, resume: "" }))
    }
  }

  const removeFile = () => {
    setApplicationData((prev) => ({ ...prev, resume: null }))
    setErrors((prev) => ({ ...prev, resume: "" }))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const openPositions = [
    {
      title: "Frontend Developer",
      type: "Full-time",
      location: "Remote / Nagpur",
      experience: "2-4 years",
      description: "Join our team to create stunning user interfaces using React, Next.js, and modern CSS frameworks.",
      requirements: [
        "3+ years experience with React/Next.js",
        "Strong knowledge of HTML, CSS, JavaScript",
        "Experience with Tailwind CSS or similar frameworks",
        "Understanding of responsive design principles",
        "Git version control experience",
      ],
      responsibilities: [
        "Develop responsive web applications",
        "Collaborate with design team on UI/UX",
        "Optimize applications for performance",
        "Write clean, maintainable code",
        "Participate in code reviews",
      ],
    },
    {
      title: "UI/UX Designer",
      type: "Full-time",
      location: "Remote / Nagpur",
      experience: "2-3 years",
      description: "Create beautiful and intuitive user experiences for web and mobile applications.",
      requirements: [
        "2+ years of UI/UX design experience",
        "Proficiency in Figma, Adobe Creative Suite",
        "Strong portfolio showcasing web design",
        "Understanding of user-centered design principles",
        "Knowledge of design systems and prototyping",
      ],
      responsibilities: [
        "Design user interfaces for web applications",
        "Create wireframes and prototypes",
        "Conduct user research and testing",
        "Collaborate with development team",
        "Maintain design systems and guidelines",
      ],
    },
    {
      title: "Full-Stack Developer",
      type: "Full-time",
      location: "Remote / Nagpur",
      experience: "3-5 years",
      description: "Work on both frontend and backend development using modern technologies and frameworks.",
      requirements: [
        "4+ years of full-stack development experience",
        "Strong knowledge of React, Node.js, and databases",
        "Experience with cloud platforms (AWS, Vercel)",
        "Understanding of API design and development",
        "Knowledge of DevOps practices",
      ],
      responsibilities: [
        "Develop end-to-end web applications",
        "Design and implement APIs",
        "Manage database architecture",
        "Deploy and maintain applications",
        "Mentor junior developers",
      ],
    },
    {
      title: "Digital Marketing Specialist",
      type: "Part-time",
      location: "Remote",
      experience: "1-3 years",
      description: "Help grow our brand and client reach through strategic digital marketing campaigns.",
      requirements: [
        "2+ years of digital marketing experience",
        "Knowledge of SEO, SEM, and social media marketing",
        "Experience with Google Analytics and marketing tools",
        "Strong content creation skills",
        "Understanding of conversion optimization",
      ],
      responsibilities: [
        "Develop and execute marketing strategies",
        "Manage social media presence",
        "Create engaging content",
        "Analyze marketing performance",
        "Optimize campaigns for better ROI",
      ],
    },
  ]

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs",
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Work-life balance with flexible working hours and remote options",
    },
    {
      icon: Users,
      title: "Team Culture",
      description: "Collaborative environment with talented and passionate colleagues",
    },
    {
      icon: Star,
      title: "Growth Opportunities",
      description: "Professional development, training, and career advancement",
    },
  ]

  const handleInputChange = (field: keyof ApplicationData, value: string) => {
    setApplicationData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

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
    const newErrors: { [key: string]: string } = {}

    if (!applicationData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!applicationData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!applicationData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicationData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (applicationData.phone.trim() && !validatePhoneNumber(applicationData.phone)) {
      newErrors.phone = "Please enter a valid Indian phone number"
    }
    if (!applicationData.position) newErrors.position = "Please select a position"
    if (!applicationData.coverLetter.trim()) newErrors.coverLetter = "Cover letter is required"
    if (!applicationData.resume) newErrors.resume = "Resume is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append("firstName", applicationData.firstName)
      formData.append("lastName", applicationData.lastName)
      formData.append("email", applicationData.email)
      formData.append("phone", applicationData.phone)
      formData.append("position", applicationData.position)
      formData.append("experience", applicationData.experience)
      formData.append("portfolio", applicationData.portfolio)
      formData.append("coverLetter", applicationData.coverLetter)
      if (applicationData.resume) {
        formData.append("resume", applicationData.resume)
      }

      const response = await fetch("/api/career-application", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        setApplicationData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          position: "",
          experience: "",
          portfolio: "",
          coverLetter: "",
          resume: null,
        })

        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        alert(result.message || "Failed to submit application. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      alert("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Join Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Team</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Be part of an innovative team that's shaping the future of web design and technology. We're looking for
            passionate individuals who want to make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Open Positions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hover:bg-blue-50 bg-transparent"
              onClick={() => document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We believe in creating an environment where creativity thrives and innovation happens
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={benefit.title}
                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore exciting opportunities to grow your career with us
            </p>
          </div>

          <div className="space-y-8">
            {openPositions.map((position, index) => (
              <Card key={position.title} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl text-gray-900 mb-2">{position.title}</CardTitle>
                      <CardDescription className="text-lg">{position.description}</CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {position.type}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {position.location}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {position.experience}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                      <ul className="space-y-2">
                        {position.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start text-gray-600 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Responsibilities</h4>
                      <ul className="space-y-2">
                        {position.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start text-gray-600 text-sm">
                            <ArrowRight className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() => {
                        setApplicationData((prev) => ({ ...prev, position: position.title }))
                        document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      Apply for this Position
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture Deep Dive */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Life at Benevolus</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what makes our workplace special and why our team loves working here
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  title: "Innovation-Driven Environment",
                  description:
                    "We encourage experimentation with new technologies and creative problem-solving approaches.",
                  highlights: ["Latest tech stack", "R&D time allocation", "Innovation challenges"],
                  icon: "💡",
                },
                {
                  title: "Learning & Development",
                  description: "Continuous learning is part of our DNA. We invest in our team's professional growth.",
                  highlights: ["Conference attendance", "Online course budgets", "Internal knowledge sharing"],
                  icon: "📚",
                },
                {
                  title: "Work-Life Balance",
                  description: "We believe great work comes from well-rested, happy team members.",
                  highlights: ["Flexible working hours", "Remote work options", "Mental health support"],
                  icon: "⚖️",
                },
                {
                  title: "Collaborative Culture",
                  description: "We work together as a team, sharing knowledge and supporting each other's success.",
                  highlights: ["Open communication", "Team collaboration", "Mentorship programs"],
                  icon: "🤝",
                },
              ].map((culture) => (
                <div key={culture.title} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{culture.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{culture.title}</h3>
                    <p className="text-gray-600 mb-3">{culture.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {culture.highlights.map((highlight) => (
                        <span key={highlight} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Team Statistics</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { metric: "Team Size", value: "8+", description: "Growing team of experts" },
                      { metric: "Average Experience", value: "3+ years", description: "Experienced professionals" },
                      { metric: "Employee Satisfaction", value: "100%", description: "Happy team members" },
                      { metric: "Retention Rate", value: "95%", description: "People love working here" },
                    ].map((stat) => (
                      <div key={stat.metric} className="text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
                        <div className="text-sm font-medium text-gray-900 mb-1">{stat.metric}</div>
                        <div className="text-xs text-gray-600">{stat.description}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">What Our Team Says</h3>
                  <blockquote className="text-gray-600 italic mb-4">
                    "Working at Benevolus has been an incredible journey. The team is supportive, the projects are
                    challenging, and there's always room to grow and learn new technologies."
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Shadman Hayat</div>
                      <div className="text-sm text-gray-600">Full Stack Developer</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Remote-First Culture</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    We embrace remote work and have team members working from different locations. Our tools and
                    processes are designed for seamless collaboration.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { tool: "Slack", purpose: "Team communication" },
                      { tool: "Zoom", purpose: "Video meetings" },
                      { tool: "GitHub", purpose: "Code collaboration" },
                      { tool: "Figma", purpose: "Design collaboration" },
                    ].map((tool) => (
                      <div key={tool.tool} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">
                          {tool.tool} - {tool.purpose}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Career Growth & Development */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Career Growth Path</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to helping you grow professionally and advance your career in technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                level: "Junior Level",
                duration: "0-2 years",
                description: "Start your journey with mentorship and hands-on learning",
                skills: ["Learn core technologies", "Work on real projects", "Pair programming", "Code reviews"],
                opportunities: ["Mentorship program", "Training workshops", "Skill assessments"],
                icon: "🌱",
                color: "green",
              },
              {
                level: "Mid Level",
                duration: "2-4 years",
                description: "Take on more responsibility and lead smaller projects",
                skills: [
                  "Advanced technical skills",
                  "Project leadership",
                  "Client interaction",
                  "Architecture decisions",
                ],
                opportunities: ["Lead projects", "Conference speaking", "Technical writing", "Team mentoring"],
                icon: "🚀",
                color: "blue",
              },
              {
                level: "Senior Level",
                duration: "4+ years",
                description: "Shape the technical direction and mentor the next generation",
                skills: ["Technical leadership", "Strategic planning", "Team management", "Business understanding"],
                opportunities: ["Technical leadership", "Product strategy", "Team building", "Industry recognition"],
                icon: "⭐",
                color: "purple",
              },
            ].map((path) => (
              <Card key={path.level} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 bg-${path.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-2xl">{path.icon}</span>
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">{path.level}</CardTitle>
                  <CardDescription className="text-sm font-medium text-gray-500">{path.duration}</CardDescription>
                  <CardDescription>{path.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Skills:</h4>
                      <div className="space-y-1">
                        {path.skills.map((skill) => (
                          <div key={skill} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Growth Opportunities:</h4>
                      <div className="space-y-1">
                        {path.opportunities.map((opportunity) => (
                          <div key={opportunity} className="flex items-center text-sm text-gray-600">
                            <ArrowRight className="w-3 h-3 text-blue-500 mr-2 flex-shrink-0" />
                            {opportunity}
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

      {/* Interview Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Interview Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've designed a fair and comprehensive interview process to find the best fit for both you and our team
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Application Review",
                  duration: "1-2 days",
                  description:
                    "We carefully review your application, resume, and portfolio to understand your background and experience.",
                  what_to_expect: ["Resume screening", "Portfolio review", "Initial assessment"],
                  tips: [
                    "Ensure your resume is up-to-date",
                    "Include relevant project links",
                    "Highlight your best work",
                  ],
                  icon: "📋",
                },
                {
                  step: "2",
                  title: "Initial Screening Call",
                  duration: "30 minutes",
                  description:
                    "A friendly conversation to get to know you better and discuss your career goals and interests.",
                  what_to_expect: ["Career discussion", "Role expectations", "Company culture fit"],
                  tips: ["Be yourself", "Ask questions about the role", "Share your career aspirations"],
                  icon: "📞",
                },
                {
                  step: "3",
                  title: "Technical Assessment",
                  duration: "1-2 hours",
                  description:
                    "A practical assessment to evaluate your technical skills relevant to the position you're applying for.",
                  what_to_expect: ["Coding challenges", "Problem-solving tasks", "Technical discussion"],
                  tips: ["Practice coding problems", "Think out loud", "Ask clarifying questions"],
                  icon: "💻",
                },
                {
                  step: "4",
                  title: "Team Interview",
                  duration: "45 minutes",
                  description:
                    "Meet with team members you'll be working with to assess collaboration and cultural fit.",
                  what_to_expect: ["Team interaction", "Project discussions", "Collaboration scenarios"],
                  tips: ["Show your collaborative spirit", "Ask about team dynamics", "Be curious about projects"],
                  icon: "👥",
                },
                {
                  step: "5",
                  title: "Final Decision",
                  duration: "2-3 days",
                  description: "We'll make our decision and get back to you with feedback, regardless of the outcome.",
                  what_to_expect: ["Decision communication", "Detailed feedback", "Next steps discussion"],
                  tips: ["Be patient", "Stay positive", "Prepare for negotiation if selected"],
                  icon: "✅",
                },
              ].map((phase, index) => (
                <div key={phase.step} className="relative">
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {phase.step}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center mb-3">
                            <span className="text-xl mr-3">{phase.icon}</span>
                            <h3 className="text-xl font-bold text-gray-900">{phase.title}</h3>
                            <span className="ml-auto text-sm text-blue-600 font-medium">{phase.duration}</span>
                          </div>

                          <p className="text-gray-600 mb-4">{phase.description}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-2">What to Expect:</h4>
                              <div className="space-y-1">
                                {phase.what_to_expect.map((item) => (
                                  <div key={item} className="flex items-center text-sm text-gray-600">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                                    {item}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-2">Tips for Success:</h4>
                              <div className="space-y-1">
                                {phase.tips.map((tip) => (
                                  <div key={tip} className="flex items-center text-sm text-gray-600">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                                    {tip}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {index < 4 && (
                    <div className="flex justify-center my-4">
                      <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 border-0">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Interview Preparation Resources</h3>
                <p className="text-gray-600 mb-6">
                  We want you to succeed! Here are some resources to help you prepare for the interview process.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { resource: "Technical Skills Guide", description: "Key technologies we use" },
                    { resource: "Sample Projects", description: "Examples of our work" },
                    { resource: "Company Values", description: "What we stand for" },
                    { resource: "FAQ Document", description: "Common questions answered" },
                  ].map((item) => (
                    <div key={item.resource} className="p-3 bg-white rounded-lg shadow-sm">
                      <h4 className="font-medium text-gray-900 text-sm">{item.resource}</h4>
                      <p className="text-xs text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Apply Now</h2>
              <p className="text-xl text-gray-600">
                Ready to join our team? Fill out the application form below and we'll get back to you soon.
              </p>
            </div>

            <Card className="shadow-xl">
              <CardContent className="p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted Successfully!</h3>
                    <p className="text-gray-600">
                      Thank you for your interest in joining our team. We'll review your application and get back to you
                      within 5-7 business days.
                    </p>
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
                          value={applicationData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className={errors.firstName ? "border-red-500" : ""}
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
                          value={applicationData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className={errors.lastName ? "border-red-500" : ""}
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
                          value={applicationData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={errors.email ? "border-red-500" : ""}
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
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={applicationData.phone}
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
                          className={errors.phone ? "border-red-500" : ""}
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
                        <p className="text-xs text-gray-500">
                          Enter Indian mobile number (10 digits starting with 6, 7, 8, or 9)
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>
                          Position <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={applicationData.position}
                          onValueChange={(value) => handleInputChange("position", value)}
                        >
                          <SelectTrigger className={errors.position ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select a position" />
                          </SelectTrigger>
                          <SelectContent>
                            {openPositions.map((position) => (
                              <SelectItem key={position.title} value={position.title}>
                                {position.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.position && (
                          <div className="flex items-center text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.position}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input
                          id="experience"
                          value={applicationData.experience}
                          onChange={(e) => handleInputChange("experience", e.target.value)}
                          placeholder="e.g., 3 years"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="portfolio">Portfolio/LinkedIn URL</Label>
                      <Input
                        id="portfolio"
                        value={applicationData.portfolio}
                        onChange={(e) => handleInputChange("portfolio", e.target.value)}
                        placeholder="https://your-portfolio.com or LinkedIn profile"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resume">
                        Resume/CV <span className="text-red-500">*</span>
                      </Label>
                      <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                          dragActive
                            ? "border-blue-500 bg-blue-50"
                            : errors.resume
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300 hover:border-gray-400"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        {applicationData.resume ? (
                          <div className="space-y-3">
                            <div className="flex items-center justify-center space-x-2">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              </div>
                              <div className="text-left">
                                <p className="font-medium text-gray-900">{applicationData.resume.name}</p>
                                <p className="text-sm text-gray-500">{formatFileSize(applicationData.resume.size)}</p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={removeFile}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                            >
                              Remove File
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                              <svg
                                className="w-6 h-6 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-2">
                                <span className="font-medium">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-sm text-gray-500">PDF, DOC, or DOCX (max 5MB)</p>
                            </div>
                            <input
                              type="file"
                              id="resume"
                              className="hidden"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileChange}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById("resume")?.click()}
                              className="mt-2"
                            >
                              Choose File
                            </Button>
                          </div>
                        )}
                      </div>
                      {errors.resume && (
                        <div className="flex items-center text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.resume}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coverLetter">
                        Cover Letter <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="coverLetter"
                        value={applicationData.coverLetter}
                        onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                        className={`min-h-[120px] ${errors.coverLetter ? "border-red-500" : ""}`}
                        placeholder="Tell us why you're interested in this position and what makes you a great fit for our team..."
                      />
                      {errors.coverLetter && (
                        <div className="flex items-center text-red-500 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.coverLetter}
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
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          Submit Application
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

      <Footer />
    </div>
  )
}
