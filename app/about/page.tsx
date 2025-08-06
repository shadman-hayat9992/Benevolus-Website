"use client"

import { CheckCircle, Users, Award, Clock, Heart, Target, Lightbulb, Rocket, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedCounter } from "@/components/animated-counter"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const router = useRouter()

  const teamMembers = [
    {
      name: "Shadman Hayat",
      role: "Full Stack Developer",
      image: "/images/shadman.jpg",
      email: "shadmanhayat9992@gmail.com",
    },
    {
      name: "Abdul Rahim",
      role: "Full Stack Developer",
      image: "/images/abdul.jpg",
      email: "abdulrahim@gmail.com",
    },
    {
      name: "Zaid Ashraf",
      role: "Software Engineer",
      image: "/images/zaid.jpg",
      email: "zaidashraf@gmail.com",
    },
    {
      name: "Anjali Rathod",
      role: "Manager",
      image: "/images/anjali.jpg",
      email: "anjalirathod@gmail.com",
    },
    {
      name: "Khushi Majhetia",
      role: "Manager",
      image: "/images/khushi.jpg",
      email: "khushimajhetia@gmail.com",
    },
    {
      name: "Sagar Dhara",
      role: "Social Media Manager",
      image: "/images/sagar.jpg",
      email: "sagardhara@gmail.com",
    },
    {
      name: "Awais Ansari",
      role: "Developer",
      image: "/images/awais.jpg",
      email: "awaisansari@gmail.com",
    },
    {
      name: "Mohammad Danish",
      role: "Developer",
      image: "/images/danish.jpg",
      email: "mohammaddanish@gmail.com",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "Passion-Driven",
      description: "We love what we do and it shows in every pixel, every line of code, and every client interaction.",
    },
    {
      icon: Target,
      title: "Results-Focused",
      description: "Beautiful design is just the beginning. We create websites that drive real business results.",
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We stay ahead of trends and technologies to deliver cutting-edge solutions for our clients.",
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Your success is our success. We build lasting partnerships, not just websites.",
    },
  ]


  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 items-center">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Benevolus
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We're a passionate team of technologists and innovators who believe that great technology can transform
                businesses. Since 2022, we've been helping companies create stunning digital experiences that drive real
                results.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">1+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">10+ Projects Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">100% Client Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <AnimatedCounter end={10} suffix="+" />
              <div className="text-gray-600 mt-2">Happy Clients</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <AnimatedCounter end={5} suffix="+" />
              <div className="text-gray-600 mt-2">Awards Won</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <AnimatedCounter end={1} suffix="+" />
              <div className="text-gray-600 mt-2">Years Experience</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <Rocket className="w-8 h-8 text-orange-600" />
              </div>
              <AnimatedCounter end={100} suffix="%" />
              <div className="text-gray-600 mt-2">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we work with our clients
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The talented individuals behind every successful project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {teamMembers.map((member, index) => (
              <Card
                key={member.name}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() =>
                  window.open(
                    `mailto:${member.email}?subject=Hello ${member.name}&body=Hi ${member.name}, I would like to get in touch with you.`,
                    "_blank",
                  )
                }
              >
                <CardContent className="p-6 text-center">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 text-sm mb-3 group-hover:text-purple-600 transition-colors">
                    {member.role}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Company Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From a small startup to a trusted technology partner - here's how we've grown
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  year: "2022",
                  title: "The Beginning",
                  description:
                    "Benevolus was founded with a vision to create innovative tech solutions for businesses of all sizes.",
                  achievements: [
                    "Founded by passionate developers",
                    "First client project completed",
                    "Team of 3 members",
                  ],
                  icon: "🌱",
                },
                {
                  year: "2023",
                  title: "Growth & Recognition",
                  description: "We expanded our services and gained recognition in the industry for our quality work.",
                  achievements: [
                    "Completed 5+ successful projects",
                    "Expanded to 6 team members",
                    "First industry award",
                  ],
                  icon: "🚀",
                },
                {
                  year: "2024",
                  title: "Innovation & Excellence",
                  description: "We introduced AI-powered tools and achieved 100% client satisfaction rate.",
                  achievements: ["10+ projects completed", "100% client satisfaction", "AI tools integration"],
                  icon: "⭐",
                },
                {
                  year: "2025",
                  title: "Future Vision",
                  description: "Expanding our reach and continuing to innovate in web development and design.",
                  achievements: ["Global client base", "Advanced AI solutions", "Industry leadership"],
                  icon: "🔮",
                },
              ].map((milestone, index) => (
                <div key={milestone.year} className="relative">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {milestone.year}
                      </div>
                    </div>

                    <Card className="flex-1 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-3">
                          <span className="text-2xl mr-3">{milestone.icon}</span>
                          <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-4">{milestone.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {milestone.achievements.map((achievement) => (
                            <div key={achievement} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {index < 3 && (
                    <div className="absolute left-8 top-16 w-0.5 h-8 bg-gradient-to-b from-blue-300 to-purple-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Culture & Values</h2>
              <p className="text-xl text-gray-600 mb-8">
                We believe that great work comes from great people working in a supportive, innovative environment.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Innovation First",
                    description:
                      "We encourage creative thinking and embrace new technologies to solve complex problems.",
                    icon: "💡",
                  },
                  {
                    title: "Collaborative Spirit",
                    description: "We work together as a team, sharing knowledge and supporting each other's growth.",
                    icon: "🤝",
                  },
                  {
                    title: "Quality Excellence",
                    description: "We take pride in delivering high-quality work that exceeds client expectations.",
                    icon: "🏆",
                  },
                  {
                    title: "Continuous Learning",
                    description: "We invest in our team's growth through training, conferences, and skill development.",
                    icon: "📚",
                  },
                ].map((value) => (
                  <div key={value.title} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">{value.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Team Perks & Benefits</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { perk: "Flexible Hours", icon: "⏰" },
                      { perk: "Remote Work", icon: "🏠" },
                      { perk: "Health Insurance", icon: "🏥" },
                      { perk: "Learning Budget", icon: "💰" },
                      { perk: "Team Outings", icon: "🎉" },
                      { perk: "Latest Tech", icon: "💻" },
                      { perk: "Career Growth", icon: "📈" },
                      { perk: "Work-Life Balance", icon: "⚖️" },
                    ].map((benefit) => (
                      <div key={benefit.perk} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                        <span className="text-xl">{benefit.icon}</span>
                        <span className="text-sm font-medium text-gray-700">{benefit.perk}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Join Our Growing Team</h3>
                  <p className="text-gray-600 mb-4">
                    We're always looking for talented individuals who share our passion for technology and innovation.
                  </p>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => {
                      router.push("/careers");
                      setTimeout(() => {
                        const element = document.getElementById("open-positions");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }, 500);
                    }}
                  >
                    View Open Positions
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      

      {/* CTA Section */}
      

      <Footer />
    </div>
  )
}
