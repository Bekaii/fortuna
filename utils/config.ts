import configData from '@/config.json'

// Type definitions for our config structure
export interface SiteInfo {
  name: string
  description: string
  longDescription: string
  logo: {
    light: string
    dark: string
  }
  copyright: string
}

export interface SEO {
  title: string
  description: string
  keywords: string[]
  googleSiteVerification: string
  structuredData: any
}

export interface ContactInfo {
  phone: string
  phoneLink: string
  email: string
  instagram: string
  instagramLink: string
  address: string
  mapLink: string
  openingHours: {
    days: string
    hours: string
  }[]
}

export interface AboutInfo {
  title: string
  paragraphs: string[]
}

export interface ServiceItem {
  name: string
  price: string
}

export interface Service {
  icon: string
  name: string
  items: ServiceItem[]
}

export interface GoogleMerchantProduct {
  id: string
  title: string
  description: string
  price: {
    value: number
    currency: string
  }
  imageLink: string
}

export interface GoogleMerchant {
  storeCode: string
  storeName: string
  storeDescription: string
  websiteUrl: string
  googleProductCategory: string
  availability: string
  condition: string
  brand: string
  products: GoogleMerchantProduct[]
}

export interface Config {
  siteInfo: SiteInfo
  seo: SEO
  contact: ContactInfo
  about: AboutInfo
  services: Service[]
  googleMerchant: GoogleMerchant
}

// Extract the typed config
export const config: Config = {
  ...configData as Config,
  // Override with environment variables when available
  seo: {
    ...(configData as Config).seo,
    // Use environment variable for Google site verification if available
    googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 
                            (configData as Config).seo.googleSiteVerification || ''
  }
}

// Helper functions to get specific sections
export const getSiteInfo = () => config.siteInfo
export const getSEO = () => config.seo
export const getContact = () => config.contact
export const getAbout = () => config.about
export const getServices = () => config.services
export const getGoogleMerchant = () => config.googleMerchant

export default config 