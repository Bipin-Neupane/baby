export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
        <p className="mb-6 text-sm text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
        
        <p className="mb-6">
          At Dcube Store, we are committed to protecting your privacy and ensuring the security of your 
          personal information. This Privacy Policy explains how we collect, use, disclose, and 
          safeguard your information when you visit our website or make a purchase from us.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">1. Information We Collect</h2>
        
        <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900">Personal Information</h3>
        <p className="mb-4">
          We collect personal information that you voluntarily provide to us when you:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Create an account or register on our website</li>
          <li>Make a purchase or place an order</li>
          <li>Subscribe to our newsletter or promotional emails</li>
          <li>Contact us for customer support</li>
          <li>Participate in surveys, contests, or promotions</li>
          <li>Leave product reviews or comments</li>
        </ul>
        
        <p className="mb-4">This information may include:</p>
        <ul className="list-disc pl-6 mb-6 space-y-1">
          <li>Name and contact information (email, phone, address)</li>
          <li>Payment information (credit card details, billing address)</li>
          <li>Shipping information and delivery preferences</li>
          <li>Account credentials (username, password)</li>
          <li>Demographics (age, gender, parenting preferences)</li>
          <li>Communication preferences and feedback</li>
        </ul>
        
        <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900">Automatic Information</h3>
        <p className="mb-4">
          When you visit our website, we automatically collect certain information about your device 
          and browsing activity, including:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-1">
          <li>IP address and device identifiers</li>
          <li>Browser type and version</li>
          <li>Operating system and device information</li>
          <li>Pages visited, time spent, and click patterns</li>
          <li>Referring website and search terms</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">2. How We Use Your Information</h2>
        
        <p className="mb-4">We use the information we collect for the following purposes:</p>
        
        <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900">Order Processing and Fulfillment</h3>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Process and fulfill your orders</li>
          <li>Arrange shipping and delivery</li>
          <li>Send order confirmations and updates</li>
          <li>Handle returns, exchanges, and refunds</li>
          <li>Provide customer support</li>
        </ul>
        
        <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900">Account Management</h3>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Create and maintain your account</li>
          <li>Authenticate your identity</li>
          <li>Provide personalized experiences</li>
          <li>Save your preferences and shopping history</li>
        </ul>
        
        <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900">Communication and Marketing</h3>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Send promotional emails and newsletters (with your consent)</li>
          <li>Notify you about new products, sales, and special offers</li>
          <li>Share parenting tips and baby care information</li>
          <li>Conduct surveys and gather feedback</li>
          <li>Send important service announcements</li>
        </ul>
        
        <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900">Website Improvement</h3>
        <ul className="list-disc pl-6 mb-6 space-y-1">
          <li>Analyze website usage and performance</li>
          <li>Improve our products and services</li>
          <li>Personalize content and recommendations</li>
          <li>Detect and prevent fraud or security issues</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">3. Information Sharing and Disclosure</h2>
        
        <p className="mb-4">
          We do not sell, rent, or trade your personal information to third parties. We may share 
          your information only in the following circumstances:
        </p>
        
        <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900">Service Providers</h3>
        <p className="mb-4">
          We work with trusted third-party service providers to help us operate our business, including:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Payment processors (Stripe, PayPal)</li>
          <li>Shipping and logistics companies</li>
          <li>Email marketing platforms</li>
          <li>Website hosting and cloud storage</li>
          <li>Customer support services</li>
          <li>Analytics and marketing tools</li>
        </ul>
        
        <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900">Legal Requirements</h3>
        <p className="mb-4">We may disclose your information when required by law or to:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Comply with legal processes or government requests</li>
          <li>Protect our rights, property, or safety</li>
          <li>Protect the rights and safety of our customers</li>
          <li>Prevent fraud or illegal activities</li>
        </ul>
        
        <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900">Business Transfers</h3>
        <p className="mb-6">
          In the event of a merger, acquisition, or sale of assets, your information may be 
          transferred as part of the business transaction.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">4. Data Security</h2>
        
        <p className="mb-4">
          We implement appropriate technical and organizational measures to protect your personal 
          information against unauthorized access, alteration, disclosure, or destruction:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>SSL encryption for all data transmission</li>
          <li>Secure payment processing systems</li>
          <li>Regular security assessments and updates</li>
          <li>Access controls and employee training</li>
          <li>Data backup and recovery procedures</li>
        </ul>
        
        <p className="mb-6">
          While we strive to protect your information, no method of transmission over the internet 
          or electronic storage is 100% secure. We cannot guarantee absolute security but are 
          committed to protecting your data using industry best practices.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">5. Cookies and Tracking Technologies</h2>
        
        <p className="mb-4">
          We use cookies and similar technologies to enhance your browsing experience:
        </p>
        
        <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900">Types of Cookies</h3>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
          <li><strong>Performance Cookies:</strong> Help us understand how visitors use our site</li>
          <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
          <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
        </ul>
        
        <p className="mb-6">
          You can control cookie settings through your browser preferences. Note that disabling 
          certain cookies may affect website functionality.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">6. Your Privacy Rights</h2>
        
        <p className="mb-4">You have the following rights regarding your personal information:</p>
        
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
          <li><strong>Deletion:</strong> Request deletion of your personal information</li>
          <li><strong>Portability:</strong> Request transfer of your data to another service</li>
          <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
          <li><strong>Restriction:</strong> Request limitation of how we process your data</li>
        </ul>
        
        <p className="mb-6">
          To exercise these rights, please contact us using the information provided below. 
          We will respond to your request within 30 days.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">7. Children's Privacy</h2>
        
        <p className="mb-4">
          While we sell products for babies and children, our services are intended for use by 
          adults. We do not knowingly collect personal information from children under 13 years 
          of age without parental consent.
        </p>
        <p className="mb-6">
          If you believe we have inadvertently collected information from a child under 13, 
          please contact us immediately so we can delete such information.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">8. International Data Transfers</h2>
        
        <p className="mb-6">
          Your information may be processed and stored in countries other than your own. We ensure 
          appropriate safeguards are in place to protect your data in accordance with applicable 
          privacy laws.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">9. Data Retention</h2>
        
        <p className="mb-6">
          We retain your personal information only as long as necessary to fulfill the purposes 
          outlined in this policy, comply with legal obligations, resolve disputes, and enforce 
          our agreements. Account information is typically retained for 7 years after account closure.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">10. Third-Party Links</h2>
        
        <p className="mb-6">
          Our website may contain links to third-party websites. This Privacy Policy does not 
          apply to those sites. We encourage you to review the privacy policies of any third-party 
          sites you visit.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">11. Changes to This Privacy Policy</h2>
        
        <p className="mb-6">
          We may update this Privacy Policy from time to time to reflect changes in our practices 
          or legal requirements. We will notify you of material changes by posting the updated 
          policy on our website and updating the "Last updated" date. Your continued use of our 
          services constitutes acceptance of the updated policy.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">12. Contact Information</h2>
        
        <p className="mb-4">
          If you have questions about this Privacy Policy or want to exercise your privacy rights, 
          please contact us:
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h4 className="font-semibold mb-3 text-gray-900">Dcube Store Privacy Team</h4>
          <div className="space-y-2">
            <p><strong>Email:</strong> contact@dcube.store</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          </div>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <h4 className="font-semibold mb-2 text-blue-800">California Residents</h4>
          <p className="text-sm text-blue-700">
            California residents have additional rights under the California Consumer Privacy Act (CCPA). 
            For more information about your CCPA rights, please contact us using the information above.
          </p>
        </div>
        
        <p className="text-sm text-gray-600 mt-8">
          This Privacy Policy is designed to help you understand how we collect and use your 
          information so you can make informed choices about sharing your information with us.
        </p>
      </div>
    </div>
  )
}