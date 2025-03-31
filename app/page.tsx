"use client"

import Image from "next/image"
import { Gallery } from "@/components/gallery"
import { ContactInfo } from "@/components/contact-info"
import { Navbar } from "@/components/navbar"
import { Pricing } from "@/components/pricing"
import { About } from "@/components/about"
import BounceArrow from "@/components/bounce-arrow"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { getImagePath } from '@/utils/image-path'
import { getSiteInfo } from '@/utils/config'

export default function Home() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const siteInfo = getSiteInfo()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // or a loading state
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative">
        <section className="h-screen flex items-center justify-center relative">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-primary">Välkommen till</h1>
            <Image
              src={theme === "dark" ? siteInfo.logo.dark : siteInfo.logo.light}
              alt={`${siteInfo.name} Logo`}
              width={500}
              height={500}
              className="mx-auto"
              priority
            />
          </div>
          <BounceArrow />
        </section>

        <section 
          id="hem" 
          className="py-16 bg-muted relative"
          data-spy="hem"
        >
          <div className="container mx-auto px-4">
            <div className="mb-16">
              <Gallery />
            </div>
            <About />
          </div>
        </section>

        <section 
          id="priser" 
          className="py-16 relative"
          data-spy="priser"
        >
          <Pricing />
        </section>

        <div id="kontakt">
          <section className="py-16 bg-muted relative">
            <ContactInfo />
          </section>

          <footer className="bg-muted py-8 text-center">
            <div className="container mx-auto px-4">
              <p>&copy; {siteInfo.copyright}</p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}

