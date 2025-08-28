// Run this to update the home page with working newsletter
const fs = require('fs');

const homePageContent = fs.readFileSync('app/page.js', 'utf8');

// Replace the newsletter form section with working version
const updatedContent = homePageContent.replace(
  /<form className="flex gap-4 max-w-md mx-auto">\s*<input[^>]*>\s*<button[^>]*>[^<]*<\/button>\s*<\/form>/,
  `<form onSubmit={async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        e.target.reset();
        alert('Successfully subscribed!');
      }
    } catch (error) {
      alert('Subscription failed. Please try again.');
    }
  }} className="flex gap-4 max-w-md mx-auto">
    <input
      type="email"
      name="email"
      placeholder="Enter your email"
      className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:ring-4 focus:ring-white/30 outline-none"
      required
    />
    <button type="submit" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
      Subscribe
    </button>
  </form>`
);

fs.writeFileSync('app/page.js', updatedContent);
console.log('✅ Updated home page newsletter form');
