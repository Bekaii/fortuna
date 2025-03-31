"use client"

import { Scissors, BeakerIcon as Beard, SprayCanIcon as Spray } from "lucide-react"
import { getServices } from "@/utils/config"

// Map string icon names to actual components
const iconMap = {
  "Scissors": Scissors,
  "Beard": Beard,
  "Spray": Spray
}

export function Pricing() {
  const services = getServices()
  
  return (
    <div className="container mx-auto px-4">
      <div
        className="animate-in fade-in slide-in-from-bottom-4 duration-1000"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">Priser</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            // Get the icon component from our map
            const IconComponent = iconMap[service.icon as keyof typeof iconMap]
            
            return (
              <div key={index} className="bg-card overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                  <h3 className="text-xl font-semibold text-center mb-4 text-primary">{service.name}</h3>
                    {IconComponent && <IconComponent className="mx-[1rem] mt-[-10px] w-8 h-8 text-primary" />}
                  </div>
                  <ul className="space-y-4 text-primary">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex justify-between items-center">
                        <span>{item.name}</span>
                        <span className="font-semibold text-foreground">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

