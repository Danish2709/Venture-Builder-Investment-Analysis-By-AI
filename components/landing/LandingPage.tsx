"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, BarChart3, Target, Award, Play, Menu, X } from "lucide-react"
import Link from "next/link"

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const Header = () => (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - Hikma Brand with Arabic */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src="/1957-logo.png"
                alt="1957 Ventures"
                className="h-8 w-auto transition-transform duration-200 hover:scale-105"
              />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
            <div className="hidden sm:block border-l border-gray-200 pl-3">
              <div className="flex items-center space-x-2">
                <div className="text-base font-semibold text-gray-900">Hikma</div>
                <div className="text-sm text-blue-600 font-arabic">حكمة</div>
              </div>
              <div className="text-xs text-gray-500">Designed by 1957 Ventures</div>
            </div>
          </div>

          {/* Clean Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#pricing"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
            >
              Pricing
            </a>
            <a
              href="#clients"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
            >
              Clients
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
            >
              Contact
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/auth/login">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors duration-200"
              >
                Login
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md">
                Get started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 transition-colors duration-200 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <nav className="flex flex-col space-y-4">
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Pricing
              </a>
              <a href="#clients" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Clients
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <Link href="/auth/login">
                  <Button variant="ghost" className="w-full justify-start">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg">Get started</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )

  const HeroSection = () => (
    <section className="pt-24 pb-16 bg-white relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-16 right-0 w-48 h-48 bg-blue-50 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-12 left-0 w-36 h-36 bg-gray-50 rounded-full opacity-20 blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Elegant Typography */}
          <div className="space-y-6">
            <div className="space-y-5">
              <div className="inline-flex items-center px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors duration-200">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                <span className="text-xs font-medium text-blue-700">AI-Powered Investment Intelligence</span>
              </div>

              {/* Elegant, refined headline */}
              <h1 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight tracking-tight">
                The most advanced
                <span className="block font-medium text-blue-600">investment engine</span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Smart AI prioritization that eliminates bias and focuses partner time on the best opportunities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/auth/login">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
                >
                  Get started
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 hover:border-gray-400 px-6 py-3 text-base font-medium bg-white rounded-lg transition-all duration-200 hover:shadow-md"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2 hover:text-gray-900 transition-colors duration-200">
                <Shield className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-600 font-medium">Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-gray-900 transition-colors duration-200">
                <Award className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-600 font-medium">SOC 2 Certified</span>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="relative">
            <div className="relative bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Dashboard Header */}
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src="/1957-logo.png" alt="1957 Ventures" className="h-5 w-auto" />
                    <div className="text-xs font-medium text-gray-900">Hikma</div>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <div className="text-xs text-gray-500">Live</div>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-5 space-y-4">
                {/* Main Score Display */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-light text-gray-900">87.4</div>
                    <div className="text-xs text-gray-500">Investment Score</div>
                    <div className="flex items-center space-x-1.5 mt-1">
                      <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className="w-10 h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Exceptional</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-600">Risk Impact</div>
                    <div className="text-lg font-light text-orange-600">-8.2</div>
                    <div className="text-xs text-gray-500">Medium</div>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="space-y-2">
                  <div className="text-xs font-medium text-gray-900 mb-2">Category Breakdown</div>
                  {[
                    { category: "Founder & Team", score: "4.2", color: "bg-blue-500" },
                    { category: "Market Opportunity", score: "4.5", color: "bg-green-500" },
                    { category: "Product & Tech", score: "3.8", color: "bg-purple-500" },
                    { category: "Financial", score: "4.1", color: "bg-orange-500" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 ${item.color} rounded-full`}></div>
                        <span className="text-xs text-gray-700">{item.category}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <div className="w-8 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full`}
                            style={{ width: `${(Number.parseFloat(item.score) / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-900 w-6">{item.score}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decision Recommendation */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 hover:bg-green-100 transition-colors duration-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-green-900">INVEST</div>
                      <div className="text-xs text-green-700">Exceptional opportunity. Proceed immediately.</div>
                    </div>
                  </div>
                </div>

                {/* Assessment Stats */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                  {[
                    { value: "New Build / Seed / Series A", label: "Stages" },
                    { value: "Fintech / KSA + GCC", label: "Focus" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-sm font-light text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blue accent dot */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  const FeaturesSection = () => (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100 mb-4 hover:bg-blue-100 transition-colors duration-200">
            <span className="text-xs font-medium text-blue-700">Complete Investment Toolkit</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-tight">
            Advanced investment intelligence
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Editable models to match your investment thesis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: BarChart3,
              title: "Startup Discovery",
              description:
                "AI agents continuously monitor global startup ecosystems, analyzing funding rounds and market signals. Advanced algorithms identify emerging opportunities before they become widely known.",
              tag: "radar",
            },
            {
              icon: Target,
              title: "Investment Scoring",
              description:
                "Four integrated AI models analyze 300+ factors including founder backgrounds, market dynamics, and financial metrics to generate precise investment scores with 85%+ accuracy.",
              tag: "diligence",
            },
            {
              icon: Shield,
              title: "Risk Assessment",
              description:
                "Comprehensive risk evaluation following The Berkus Method across team, market, and operational factors using real-time data analysis to identify potential red flags early in the investment process.",
              tag: "flags",
            },
          ].map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 h-full relative overflow-hidden">
                <div className="space-y-4 h-full flex flex-col">
                  {/* Header with Icon and Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300 flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-md border border-gray-200 group-hover:bg-gray-50 group-hover:border-gray-300 transition-all duration-200">
                      {feature.tag}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 flex-grow">
                    <h3 className="text-xl font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>

                {/* Subtle background decoration */}
                <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-50 to-transparent rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  const TestimonialsSection = () => (
    <section id="clients" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-tight">
            Trusted by leading institutions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Investment professionals from leading firms share their experience.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            { value: "$3.5B", label: "Assets Under Analysis" },
            { value: "20+", label: "Investment Firms" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl lg:text-4xl font-light text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            {
              quote:
                "Hikma has fundamentally transformed our due diligence process. The depth of analysis and risk assessment capabilities are unmatched.",
              author: "Abdulaziz Al Loughani",
              role: "Managing Partner",
              company: "STV",
              details: "$800M AUM • Early to Growth Stage",
            },
            {
              quote:
                "Our investment committee relies on Hikma for every significant deal evaluation. The AI analysis provides insights that would require weeks of manual research.",
              author: "Mahmoud Adi",
              role: "Founding Partner",
              company: "Shorooq Partners",
              details: "$500M AUM • Technology Focus",
            },
            {
              quote:
                "The risk assessment framework has been instrumental in our decision-making process. Hikma's quantitative approach has improved portfolio performance.",
              author: "Dany Farha",
              role: "Co-Founder & CEO",
              company: "BECO Capital",
              details: "$495M AUM • Multi-Stage",
            },
          ].map((testimonial, index) => (
            <Card
              key={index}
              className="border border-gray-200 shadow-sm bg-white hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <blockquote className="text-base text-gray-700 leading-relaxed">"{testimonial.quote}"</blockquote>

                  <div className="border-t border-gray-100 pt-4">
                    <div className="space-y-2">
                      <div className="font-medium text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}, {testimonial.company}
                      </div>
                      <div className="text-xs text-gray-500">{testimonial.details}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )

  const Footer = () => (
    <footer className="bg-slate-50 border-t border-slate-200" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <img src="/1957-logo.png" alt="1957 Ventures" className="h-6 w-auto" loading="lazy" />
            <div className="border-l border-slate-300 pl-3">
              <div className="flex items-center space-x-2">
                <div className="text-sm font-semibold text-slate-900">Hikma</div>
                <div className="text-xs text-blue-600 font-arabic">حكمة</div>
              </div>
              <div className="text-xs text-slate-500">Designed by 1957 Ventures</div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-6 text-sm">
            <a href="#api" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
              API
            </a>
            <a href="#docs" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
              Docs
            </a>
            <a href="#support" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
              Support
            </a>
            <span className="text-slate-300">•</span>
            <a href="#about" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
              About
            </a>
            <a href="#contact" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-slate-500">© 2025 Hikma</div>
        </div>
      </div>
    </footer>
  )

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}

export default LandingPage
