"use client"

import Image from "next/image"
import { getAbout } from "@/utils/config"

export function About() {
  const aboutInfo = getAbout()
  
  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-4 duration-1000"
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 max-w:md justify-center items-center">
          <h2 className="text-2xl font-bold mb-4 text-primary">{aboutInfo.title}</h2>
          {aboutInfo.paragraphs.map((paragraph, index) => (
            <p key={index} className={`${index !== aboutInfo.paragraphs.length - 1 ? 'mb-4' : ''} justify-center items-center`}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

