# Site Configuration Guide

This document provides instructions on how to modify the site content through the centralized configuration system.

## Configuration File

All site content is managed through the `config.json` file in the root directory. This allows for easy editing of site information without touching the code.

## Structure

The configuration file is structured into these main sections:

### 1. Site Information

```json
"siteInfo": {
  "name": "Fortuna Salong",
  "description": "Professionella barberartjänster i hjärtat av Helsingborg",
  "longDescription": "Traditionella och moderna klippningar, skäggtrimning och stylingtjänster.",
  "logo": {
    "light": "/logo.png",
    "dark": "/logo-invert.png"
  },
  "copyright": "2025 Fortuna Salong"
}
```

This section contains basic information about the site, such as the name, description, and logo paths.

### 2. SEO (Search Engine Optimization)

```json
"seo": {
  "title": "Fortuna Salong",
  "description": "Professionella barberartjänster i hjärtat av Helsingborg...",
  "keywords": ["frisör", "barbershop", "herrklippning", ...],
  "googleSiteVerification": "",
  "structuredData": { ... }
}
```

This section contains SEO-related information, including meta tags and structured data for search engines.

**Note:** For security reasons, Google site verification should be set using GitHub Secrets rather than in the config file. See the "Sensitive Data" section below.

### 3. Contact Information

```json
"contact": {
  "phone": "079 076 25 76",
  "phoneLink": "+46790762576",
  "email": "info@fortunasalong.se",
  "instagram": "@fortuna_salong",
  "instagramLink": "https://instagram.com/direct/t/fortuna_salong",
  "address": "Aschebergsgatan 8, 254 38 Helsingborg",
  "mapLink": "https://maps.google.com/?q=Aschebergsgatan+8,+Helsingborg",
  "openingHours": [
    { "days": "Tis - Fre", "hours": "10 - 18" },
    ...
  ]
}
```

This section contains all contact information displayed on the site.

### 4. About Section

```json
"about": {
  "title": "Om Fortuna Salong",
  "paragraphs": [
    "Fortuna Salong är en modern och välrenommerad frisörsalong...",
    ...
  ]
}
```

This section contains the content for the "About" section of the site.

### 5. Services and Pricing

```json
"services": [
  {
    "icon": "Scissors",
    "name": "Klippning",
    "items": [
      { "name": "Herr Klippning", "price": "300 kr" },
      ...
    ]
  },
  ...
]
```

This section contains service categories and pricing information.

### 6. Google Merchant Center

```json
"googleMerchant": {
  "storeCode": "fortunasalong",
  "storeName": "Fortuna Salong",
  "storeDescription": "Professionella barberartjänster i hjärtat av Helsingborg",
  "websiteUrl": "https://fortunasalong.se",
  "googleProductCategory": "507",
  "availability": "in_stock",
  "condition": "new",
  "brand": "Fortuna Salong",
  "products": [
    {
      "id": "herrklippning",
      "title": "Herr Klippning",
      "description": "Professionell herrklippning utförd av erfarna barberare",
      "price": {
        "value": 300,
        "currency": "SEK"
      },
      "imageLink": "https://fortunasalong.se/images/herrklippning.jpg"
    },
    ...
  ]
}
```

This section contains information for Google Merchant Center product feed.

## Sensitive Data

For security reasons, sensitive data like API keys and verification tokens should not be stored in the config.json file when using GitHub Pages. Instead, use GitHub Secrets:

### Google Site Verification (Optional)

**Note:** This step is optional. The site will work perfectly fine without Google verification. Add this only when you're ready to verify your site with Google Search Console.

1. **Get your verification code**:
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Click "Add Property" and enter your website URL
   - Select "HTML tag" verification method
   - Google will show a meta tag like: `<meta name="google-site-verification" content="ABCDEFG123456" />`
   - Copy ONLY the verification code (the content value, e.g., "ABCDEFG123456")

2. **Add the code to GitHub Secrets**:
   - Go to your GitHub repository
   - Click on "Settings" (tab at the top)
   - In the left sidebar, click "Secrets and variables" then "Actions"
   - Click the "New repository secret" button
   - Name: `GOOGLE_SITE_VERIFICATION` 
   - Value: Paste your verification code
   - Click "Add secret"

3. **The site will automatically rebuild**:
   - Your site is configured with a GitHub workflow that automatically rebuilds the site when changes are made
   - After adding the secret, any change to the repository will trigger a rebuild that includes your verification code
   - You can also make a small change to force a rebuild (like adding a space to the README.md file)

4. **Verify in Google Search Console**:
   - Go back to Google Search Console
   - Click "Verify"
   - If verification fails, wait a few minutes and try again

The verification code will be securely stored in GitHub and injected into your site during the build process.

## Making Changes

1. Edit the `config.json` file with your changes
2. Save the file
3. **Automatic Deployment**: The site will automatically rebuild and deploy as soon as changes are pushed to the repository. This includes:
   - Text content changes in config.json
   - New images uploaded to the public directory
   - Any other file changes

There's no need to manually run build commands as the GitHub workflow handles this automatically.

## Notes

- The Google Merchant Center feed is automatically generated during the build process
- All images should be placed in the `public` directory
- When adding new images, they'll be automatically processed during the next build
- You can use the site without setting up Google Search Console - the verification is optional 