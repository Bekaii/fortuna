// Script to generate Google Merchant Center feed
const fs = require('fs');
const path = require('path');
const config = require('../config.json');

// Function to generate the XML feed
function generateMerchantFeed() {
  const { googleMerchant } = config;
  const date = new Date().toISOString();
  
  // Start XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${googleMerchant.storeName}</title>
    <link>${googleMerchant.websiteUrl}</link>
    <description>${googleMerchant.storeDescription}</description>
`;

  // Add products
  googleMerchant.products.forEach(product => {
    xml += `    <item>
      <g:id>${product.id}</g:id>
      <g:title>${product.title}</g:title>
      <g:description>${product.description}</g:description>
      <g:link>${googleMerchant.websiteUrl}</g:link>
      <g:image_link>${product.imageLink}</g:image_link>
      <g:availability>${googleMerchant.availability}</g:availability>
      <g:price>${product.price.value} ${product.price.currency}</g:price>
      <g:brand>${googleMerchant.brand}</g:brand>
      <g:google_product_category>${googleMerchant.googleProductCategory}</g:google_product_category>
      <g:condition>${googleMerchant.condition}</g:condition>
    </item>
`;
  });

  // End XML
  xml += `  </channel>
</rss>`;

  // Write to file
  const outputDir = path.join(__dirname, '../public');
  
  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(outputDir, 'merchant-feed.xml'), xml);
  console.log('Google Merchant feed generated at public/merchant-feed.xml');
}

// Run the function
generateMerchantFeed(); 