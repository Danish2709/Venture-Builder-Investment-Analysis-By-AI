"use client"

import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()

  const handleTAMClick = () => {
    router.push("/")
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Main Headline */}
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-4xl font-light text-gray-900 leading-tight tracking-tight mb-6">
            VCs are assessing opportunities <span className="font-medium text-blue-600">traditionally</span>
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Despite market evolution, most early-stage investors still rely on the same evaluation framework
          </p>
        </div>

        {/* Sample VC Investment Memo */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto bg-white shadow-xl border border-gray-200 rounded-xl p-8 backdrop-blur-sm bg-white/95">
            {/* Title */}
            <div className="text-center mb-6 border-b border-gray-100 pb-6">
              <h2 className="text-lg font-medium text-gray-900 tracking-tight">Sample VC Investment Memo</h2>
            </div>

            {/* Company Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 bg-gray-50/50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-gray-600">Company:</span>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-semibold">S</span>
                  </div>
                  <span className="text-base font-semibold text-gray-900 tracking-tight">Stan</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-gray-600">Investment Size:</span>
                <span className="text-base font-semibold text-gray-900 tracking-tight">$5M Seed Round</span>
              </div>
            </div>

            {/* Evaluation Table */}
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_80px_3fr] bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-300">
                <div className="p-3 text-sm font-normal text-gray-800 text-center border-r border-gray-300">
                  Category
                </div>
                <div className="p-3 text-sm font-normal text-gray-800 text-center border-r border-gray-300">Grade</div>
                <div className="p-3 text-sm font-normal text-gray-800 text-center">Rationale</div>
              </div>

              {/* Team Row */}
              <div className="grid grid-cols-[1fr_80px_3fr] border-b border-gray-200 bg-white hover:bg-gray-50/30 transition-colors">
                <div className="p-3 text-center border-r border-gray-200 flex items-center justify-center">
                  <span className="text-sm font-normal text-gray-800">Team</span>
                </div>
                <div className="p-3 text-center border-r border-gray-200 flex items-center justify-center">
                  <span className="text-2xl font-black text-gray-800" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    A-
                  </span>
                </div>
                <div
                  className="p-3 text-xs leading-relaxed flex items-center"
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  <span className="text-blue-600">
                    <span className="bg-yellow-200/80 px-1 rounded">Founder has a strong background</span> (Stanford,
                    Goldman) plus is a Creator himself, but first time founder
                  </span>
                </div>
              </div>

              {/* Market Size Row */}
              <div className="grid grid-cols-[1fr_80px_3fr] border-b border-gray-200 bg-gray-50/30 hover:bg-gray-50/50 transition-colors">
                <div className="p-3 text-center border-r border-gray-200 flex items-center justify-center">
                  <span className="text-sm font-normal text-gray-800">Market Size</span>
                </div>
                <div className="p-3 text-center border-r border-gray-200 flex items-center justify-center">
                  <span className="text-2xl font-black text-gray-800" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    A
                  </span>
                </div>
                <div
                  className="p-3 text-xs leading-relaxed flex items-center"
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  <span className="text-blue-600">
                    The Creator Economy is a large and growing market with potential to be the future of work
                  </span>
                </div>
              </div>

              {/* Competition Row */}
              <div className="grid grid-cols-[1fr_80px_3fr] border-b border-gray-200 bg-white hover:bg-gray-50/30 transition-colors">
                <div className="p-3 text-center border-r border-gray-200 flex items-center justify-center">
                  <span className="text-sm font-normal text-gray-800">Competition</span>
                </div>
                <div className="p-3 text-center border-r border-gray-200 flex items-center justify-center">
                  <span className="text-2xl font-black text-gray-800" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    C
                  </span>
                </div>
                <div
                  className="p-3 text-xs leading-relaxed flex items-center"
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  <span className="text-blue-600">
                    Stan competes in a <u>very competitive</u> market (link in bio space has a 100+ competitors
                    including well-established competitors like Linktree)
                  </span>
                </div>
              </div>

              {/* Differentiation Row */}
              <div className="grid grid-cols-[1fr_80px_3fr] border-b border-gray-200 bg-gray-50/30 hover:bg-gray-50/50 transition-colors">
                <div className="p-3 text-center border-r border-gray-200 flex items-center justify-center">
                  <span className="text-sm font-normal text-gray-800">Differentiation</span>
                </div>
                <div className="p-3 text-center border-r border-gray-200 flex items-center justify-center">
                  <span className="text-2xl font-black text-gray-800" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    B-
                  </span>
                </div>
                <div
                  className="p-3 text-xs leading-relaxed flex items-center"
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  <span className="text-blue-600">
                    Stan is taking an "all-in-one" Store approach to remove the need for Creators to purchase multiple
                    software solutions (Linktree, Calendly, Kajabi),{" "}
                    <span className="bg-yellow-200/80 px-1 rounded">but is still early in its development</span>
                  </span>
                </div>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-[1fr_80px_3fr] border-b border-gray-200 bg-white hover:bg-gray-50/30 transition-colors">
                <div className="p-3 text-center border-r border-gray-200 flex items-center justify-center">
                  <span className="text-sm font-normal text-gray-800">Metrics</span>
                </div>
                <div className="p-3 text-center border-r border-gray-200 flex items-center justify-center">
                  <span className="text-2xl font-black text-gray-800" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    C
                  </span>
                </div>
                <div
                  className="p-3 text-xs leading-relaxed flex items-center"
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  <span className="text-blue-600">
                    Stan is still very early, but has strong NPS (80+) from early customers
                  </span>
                </div>
              </div>

              {/* Exit Potential Row */}
              <div className="grid grid-cols-[1fr_80px_3fr] bg-gray-50/30 hover:bg-gray-50/50 transition-colors">
                <div className="p-3 text-center border-r border-gray-200 flex items-center justify-center">
                  <span className="text-sm font-normal text-gray-800">Exit Potential</span>
                </div>
                <div className="p-3 text-center border-r border-gray-200 flex items-center justify-center">
                  <span className="text-2xl font-black text-gray-800" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    A
                  </span>
                </div>
                <div
                  className="p-3 text-xs leading-relaxed flex items-center"
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  <span className="text-blue-600">
                    Stan has a large universe of potential buyers (Shopify, Amazon, etc), with a large enough market to
                    sustain an IPO in an upside case
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Statement */}
        <div className="text-center mb-16">
          <div className="max-w-3xl mx-auto">
            <p className="text-2xl text-slate-800 leading-relaxed font-normal tracking-wide mb-6">
              With millions of startups launching each year globally, finding the right investment opportunities has
              become increasingly challenging.
            </p>
            <p className="text-xl text-slate-600 font-light leading-relaxed mb-6">
              Traditional manual screening is slow, subjective, and often misses hidden gems.
            </p>
            <p className="text-xl text-slate-700 font-medium leading-relaxed relative">
              This is why more organizations are turning to{" "}
              <span className="relative inline-block">
                <span className="font-bold text-blue-600 tracking-wide">AI</span>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping opacity-75"></div>
              </span>
            </p>
          </div>
        </div>

        {/* AI Solution Section */}
        <div className="mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-8"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Unbiased Decision-Making */}
              <div className="group h-full">
                <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-4 tracking-tight">Unbiased Decision-Making</h4>
                  <p className="text-slate-600 leading-relaxed font-normal text-base flex-grow">
                    Automated, data-driven evaluation reduces human bias, ensuring every company is assessed on
                    relevance.
                  </p>
                </div>
              </div>

              {/* Real-Time Market Insights */}
              <div className="group h-full">
                <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-4 tracking-tight">
                    Real-Time Market Insights
                  </h4>
                  <p className="text-slate-600 leading-relaxed font-normal text-base flex-grow">
                    AI continuously monitors sector trends, competitor activity, and technology developments to spot
                    opportunities early.
                  </p>
                </div>
              </div>

              {/* Efficient Resource Management */}
              <div className="group h-full">
                <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-4 tracking-tight">
                    Efficient Resource Management
                  </h4>
                  <p className="text-slate-600 leading-relaxed font-normal text-base flex-grow">
                    By automating screening, your team can focus on building relationships and providing strategic
                    support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Opportunity Section */}
        <div className="mb-16">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">Market Opportunity</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <h3 className="text-3xl font-light text-gray-900 mb-8 tracking-tight">Redesign the VC Tech Stack</h3>
              <button onClick={handleTAMClick} className="inline-block relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-30"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                  <span className="text-xl font-medium tracking-tight">TAM $6B Annual</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
