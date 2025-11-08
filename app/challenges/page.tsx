"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Navigation } from "@/components/layout/navigation"
import { ChallengesSection } from "@/components/challenges/challenges-section"
import { ConsumptionAnalysis } from "@/components/insights/consumption-analysis"

export default function ChallengesPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Sidebar />

      <div className="flex-1 md:ml-64 pb-20 md:pb-8">
        <Header />

        <main className="container px-4 py-6 space-y-6 max-w-4xl mx-auto">
          <ConsumptionAnalysis />
          <ChallengesSection />
        </main>

        <Navigation />
      </div>
    </div>
  )
}
