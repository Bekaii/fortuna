"use client"

import { Instagram, Phone, Mail, MapPin, Clock } from "lucide-react"
import { getContact } from "@/utils/config"

export function ContactInfo() {
  const contactInfo = getContact()
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div
        className="animate-in fade-in slide-in-from-bottom-4 duration-1000 p-8 mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-primary ">
          Kontakt & Bokning
        </h2>

        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div
                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-primary/5 transition-colors"
              >
                <div className="bg-primary/10 p-4 rounded-full">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-foreground font-medium mb-1">Telefon</p>
                  <a
                    href={`sms:${contactInfo.phoneLink}`}
                    className="text-lg text-primary transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              <div
                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-primary/5 transition-colors"
              >
                <div className="bg-primary/10 p-4 rounded-full">
                  <Instagram className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-foreground font-medium mb-1">Instagram</p>
                  <a
                    href={contactInfo.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-primary transition-colors"
                  >
                    {contactInfo.instagram}
                  </a>
                </div>
              </div>

              <div
                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-primary/5 transition-colors"
              >
                <div className="bg-primary/10 p-4 rounded-full">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-foreground font-medium mb-1">E-post</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-lg text-primary transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div
                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-primary/5 transition-colors"
              >
                <div className="bg-primary/10 p-4 rounded-full">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-foreground font-medium mb-1">Öppettider</p>
                  {contactInfo.openingHours.map((hours, index) => (
                    <p key={index} className="text-lg text-primary">
                      {hours.days}: {hours.hours}
                    </p>
                  ))}
                </div>
              </div>
              <div
                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-primary/5 transition-colors"
              >
                <div className="bg-primary/10 p-4 rounded-full">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-foreground font-medium mb-1">Adress</p>
                  <a 
                    href={contactInfo.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-primary transition-colors"
                  >
                    {contactInfo.address}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
