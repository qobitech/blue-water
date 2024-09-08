const tcData = [
  {
    title: 'Acceptance of Terms',
    content: `Welcome to MyTipster.pro ("Company," "we," "us," or "our"). By accessing or using our services, including but not limited to our website, mobile application, and any related content or services (collectively, the "Services"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with these Terms, please refrain from using our Services.`
  },
  {
    title: 'Services Overview',
    content: `Our Company provides tips, advice, and information based on our analysis and expertise but does not guarantee specific outcomes. You acknowledge that you are using our Services at your own risk.`
  },
  {
    title: 'Registration and Account',
    content: `To access certain features of our Services, you may need to create an account. You agree to provide accurate and complete information during the registration process and to keep your account information up to date. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.`
  },
  {
    title: 'Payment and Subscription',
    content: `Some of our Services may be offered on a subscription basis. By subscribing to our Services, you agree to pay the applicable fees as specified. Subscriptions may automatically renew unless cancelled prior to the renewal date. All payments are non-refundable, and you are responsible for any applicable taxes.`
  },
  {
    title: 'Content and Usage',
    content: `Any content provided through our Services, including tips, advice, and information, is for informational purposes only. We do not guarantee the accuracy, reliability, or completeness of the content. You acknowledge that any reliance on the content is at your own risk. You may not use our Services for any illegal, unauthorized, or unethical purposes.`
  },
  {
    title: 'Intellectual Property',
    content: `All content provided through our Services, including text, graphics, logos, images, software, icons, and media files, is the property of the Company or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works based on our content without our explicit permission. If any third-party content is used, it is done so under appropriate licenses or permissions, and you are prohibited from using such content in any manner not authorized by the respective licensors.`
  },
  {
    title: 'Privacy',
    content: `Our Privacy Policy, available on our website, outlines how we collect, use, and protect your personal information. By using our Services, you consent to our collection and use of your information as described in the Privacy Policy.`
  },
  {
    title: 'Disclaimers and Limitation of Liability',
    content: `Our Services are provided "as is" and without warranties of any kind, either express or implied. We do not guarantee the accuracy, timeliness, reliability, or completeness of the content provided. We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with your use of our Services.`
  },
  {
    title: 'Ads',
    content: `We may display advertisements from third parties on our Services. These ads are not endorsements, and we are not responsible for the content or accuracy of these advertisements.`
  },
  {
    title: 'Subscription',
    content: `By subscribing to our Services, you agree to the terms of the subscription plan you select, including any renewal terms.`
  },
  {
    title: 'Pay per tip',
    content: `Certain tips may be available for purchase on a pay-per-tip basis. You agree to pay the listed price for each tip you purchase.`
  },
  {
    title: 'Wallet',
    content: `Our Services may include a wallet feature for storing funds. You are responsible for ensuring your wallet has sufficient funds for any transactions.`
  },
  {
    title: 'User Session',
    content: `We track user sessions to improve our Services and provide a better user experience. You consent to this tracking by using our Services.`
  },
  {
    title: 'Notifications',
    content: `You agree to receive notifications from us, which may include updates, promotions, and other information related to our Services.`
  },
  {
    title: 'Service payouts',
    content: `Any payouts related to our Services will be processed in accordance with the terms specified at the time of payout.`
  },
  {
    title: 'Refund policy',
    content: `All payments made through our Services are non-refundable unless otherwise stated in our refund policy. Please review our refund policy for more details.`
  },
  {
    title: 'Indemnification',
    content: `You agree to indemnify, defend, and hold harmless the Company and its affiliates from and against any claims, losses, liabilities, expenses, damages, and costs, including reasonable attorneys' fees, arising out of your use of our Services or violation of these Terms.`
  },
  {
    title: 'Modifications and Termination',
    content: `We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time without prior notice. We may also terminate or suspend your access to our Services if you violate these Terms or engage in conduct that we deem inappropriate.`
  },
  {
    title: 'Governing Law',
    content: `These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these Terms or your use of our Services shall be subject to the exclusive jurisdiction of the courts in Nigeria.`
  },
  {
    title: 'Contact Us',
    content: `If you have any questions or concerns regarding these Terms or our Services, please contact us at contact@mytipster.pro`
  }
]

const TermsAndCondition = () => {
  return (
    <div className="tipster-container py-5">
      <div className="bg-white w-100 h-auto p-5">
        <h1 className="pb-5">Terms & Condition</h1>
        <div>
          {tcData.map((i, index) => (
            <div key={index} className="py-3">
              <div>
                <h5>
                  {index + 1 + '. '}
                  {i.title}
                </h5>
              </div>
              <div>
                <p>{i.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TermsAndCondition
