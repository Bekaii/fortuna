import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Playfair_Display } from 'next/font/google'
import { getSEO, getSiteInfo, getContact } from '@/utils/config'

const playfair = Playfair_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

// Get config data
const seo = getSEO()
const siteInfo = getSiteInfo()
const contact = getContact()

// Generate the description text
const descriptionText = `${siteInfo.description}

${siteInfo.longDescription}

📍 ${contact.address}
📞 ${contact.phone}
📧 ${contact.email}
📱 Instagram: ${contact.instagram}

⏰ Öppettider:
${contact.openingHours.map(oh => `${oh.days}: ${oh.hours}`).join('\n')}

Besök vår välkomnande salong där vi kombinerar många års erfarenhet med känsla för detaljer. Drop-in välkomna, tidsbokning rekommenderas.`

export const metadata: Metadata = {
  title: seo.title,
  description: descriptionText,
  keywords: seo.keywords.join(', '),
  icons: {
    icon: './icon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="../icon.ico" />
        {seo.googleSiteVerification && (
          <meta name="google-site-verification" content={seo.googleSiteVerification} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.structuredData) }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'