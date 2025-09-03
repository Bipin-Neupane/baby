export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
        <p className="mb-6 text-sm text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
        
        <p className="mb-6">
          Welcome to Dcube Store! These Terms of Service ("Terms") govern your use of our website 
          and services. By accessing or using BabyBloom, you agree to be bound by these Terms.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing, browsing, or using this website, you acknowledge that you have read, 
          understood, and agree to be bound by these Terms and all applicable laws and regulations. 
          If you do not agree with any of these terms, you are prohibited from using this site.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">2. Eligibility and Account Registration</h2>
        <p className="mb-4">
          You must be at least 18 years old to make purchases on our site. By placing an order, 
          you represent that you are of legal age and have the legal capacity to enter into 
          this agreement.
        </p>
        <p className="mb-4">
          When creating an account, you agree to provide accurate, current, and complete information. 
          You are responsible for maintaining the confidentiality of your account credentials and 
          for all activities that occur under your account.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">3. Products and Services</h2>
        <p className="mb-4">
          BabyBloom specializes in high-quality baby products including clothing, toys, nursery 
          items, feeding accessories, and safety equipment. All products are carefully selected 
          and meet applicable safety standards.
        </p>
        <p className="mb-4">
          We strive to provide accurate product descriptions, images, and pricing. However, we 
          do not warrant that product descriptions, colors, information, or other content is 
          error-free, complete, reliable, current, or accurate.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">4. Ordering and Payment</h2>
        <p className="mb-4">
          By placing an order, you make an offer to purchase products subject to these Terms. 
          We reserve the right to accept or decline any order for any reason. Orders are subject 
          to product availability and credit verification.
        </p>
        <p className="mb-4">
          Payment is due at the time of order placement. We accept major credit cards and other 
          payment methods as displayed during checkout. All prices are in USD and include applicable taxes.
        </p>
        <p className="mb-4">
          We reserve the right to modify prices at any time without notice. However, if we change 
          the price of a product you have ordered, we will notify you and give you the option to 
          cancel your order.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">5. Shipping and Delivery</h2>
        <p className="mb-4">
          We offer various shipping options during checkout. Delivery times are estimates and may 
          vary based on product availability, shipping method, and destination.
        </p>
        <p className="mb-4">
          Risk of loss and title for products pass to you upon delivery to the carrier. We are 
          not responsible for lost or stolen packages after delivery confirmation.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">6. Returns and Refunds</h2>
        <p className="mb-4">
          We want you to be completely satisfied with your purchase. Items may be returned within 
          30 days of delivery in their original condition, with original packaging and tags.
        </p>
        <p className="mb-4">
          For hygiene and safety reasons, certain items including opened feeding bottles, used 
          clothing, and personalized items cannot be returned unless defective.
        </p>
        <p className="mb-4">
          Refunds will be processed to the original payment method within 5-10 business days 
          after we receive the returned item.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">7. Product Safety and Recalls</h2>
        <p className="mb-4">
          All products meet or exceed applicable safety standards. In the event of a product recall, 
          we will notify affected customers immediately and provide instructions for returns or exchanges.
        </p>
        <p className="mb-4">
          Parents and caregivers are responsible for supervising children and ensuring products 
          are used according to manufacturer instructions and age recommendations.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">8. Intellectual Property</h2>
        <p className="mb-4">
          The content on this website, including text, graphics, logos, images, and software, 
          is owned by BabyBloom or our licensors and is protected by copyright and trademark laws.
        </p>
        <p className="mb-4">
          You may not reproduce, distribute, modify, or create derivative works from any content 
          without our express written permission.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">9. Privacy and Data Protection</h2>
        <p className="mb-4">
          Your privacy is important to us. Our Privacy Policy explains how we collect, use, and 
          protect your personal information. By using our services, you consent to our data practices 
          as described in our Privacy Policy.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">10. Limitation of Liability</h2>
        <p className="mb-4">
          To the maximum extent permitted by law, BabyBloom shall not be liable for any indirect, 
          incidental, special, consequential, or punitive damages, including loss of profits, 
          data, or other intangible losses.
        </p>
        <p className="mb-4">
          Our total liability for any claim arising from these Terms or your use of our services 
          shall not exceed the amount you paid for the specific product or service that gave rise to the claim.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">11. Indemnification</h2>
        <p className="mb-4">
          You agree to indemnify and hold BabyBloom harmless from any claims, damages, or expenses 
          arising from your use of our services, violation of these Terms, or infringement of any 
          third-party rights.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">12. Modifications to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify these Terms at any time. Changes will be effective immediately 
          upon posting to the website. Your continued use of our services after changes constitutes 
          acceptance of the modified Terms.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">13. Termination</h2>
        <p className="mb-4">
          We may terminate or suspend your account and access to our services at any time, with or 
          without cause, with or without notice. Upon termination, your right to use our services 
          will immediately cease.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">14. Governing Law</h2>
        <p className="mb-4">
          These Terms shall be governed by and construed in accordance with the laws of the United States, 
          without regard to conflict of law principles. Any disputes shall be resolved in the courts 
          of competent jurisdiction.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">15. Severability</h2>
        <p className="mb-4">
          If any provision of these Terms is found to be unenforceable, the remainder of the Terms 
          will remain in full force and effect.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">16. Contact Information</h2>
        <p className="mb-4">
          If you have any questions about these Terms of Service, please contact us:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="mb-2"><strong>Dcube Store Customer Service</strong></p>
          <p className="mb-1">Email: contact@dcube.store</p>
          <p className="mb-1">Phone: +1 (555) 123-4567</p>
        </div>
        
        <p className="text-sm text-gray-600 mt-8">
          These Terms of Service constitute the entire agreement between you and BabyBloom regarding 
          your use of our services and supersede all prior agreements and understandings.
        </p>
      </div>
    </div>
  )
}