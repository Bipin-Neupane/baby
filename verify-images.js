// verify-images.js
// Run this to check which products need image updates

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function verifyProductImages() {
  console.log('Checking product images...');
  
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, slug, images, category');
    
  if (error) {
    console.error('Error fetching products:', error);
    return;
  }
  
  const problemProducts = products.filter(p => 
    !p.images || 
    p.images.length === 0 || 
    p.images[0] === null ||
    p.images[0].includes('placeholder') ||
    !p.images[0].startsWith('http')
  );
  
  if (problemProducts.length > 0) {
    console.log(`\n❌ Found ${problemProducts.length} products with image issues:`);
    problemProducts.forEach(p => {
      console.log(`  - ${p.name} (ID: ${p.id}, Slug: ${p.slug})`);
    });
    console.log('\n💡 Run the SQL script fix-all-product-images.sql in Supabase to fix these.');
  } else {
    console.log('\n✅ All products have valid images!');
  }
  
  console.log(`\nTotal products: ${products.length}`);
  console.log(`Products with issues: ${problemProducts.length}`);
  console.log(`Products OK: ${products.length - problemProducts.length}`);
}

verifyProductImages();
