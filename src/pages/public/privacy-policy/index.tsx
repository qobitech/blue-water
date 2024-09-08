const policyData = [
  {
    title: 'Mytipster.pro App',
    content: `This SERVICE is provided by mytipster.pro at no cost and is intended for use as is. This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service. If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy. The terms used in this Privacy Policy have the same meanings as in our Terms of Service, which is accessible at mytipster.pro* unless otherwise defined in this Privacy Policy.`
  },
  {
    title: 'Personal Information',
    content: `For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to Name, Email, Age. The information that we request will be retained by us and used as described in this privacy policy. The app does use third party services that may collect information used to identify you.`
  },
  {
    title: 'Contact Information and Address Books',
    content: `We use your contact information, such as your email address or phone number, to authenticate your account and keep it - and our services - secure, and to help prevent spam, fraud, and abuse. We also use contact information to enable certain account features (for example, for login verification or mobile verification via SMS), and to send you information about our services, and to personalize our services, including ads. If you provide us with your phone number, you agree to receive text messages from mytipster.pro to that number as your country’s laws allow. mytipster.pro also uses your contact information to market to you as your country’s laws allow, and to help others find your account if your settings permit, including through third-party services and client applications. You can use your settings for email and mobile notifications to control notifications you receive from mytipster.pro`
  },
  {
    title: 'Payment Information',
    content: `You may provide us with your bank card details, in order to complete subscription payments where needed.`
  },
  {
    title: 'Log Data',
    content: `We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.`
  },
  {
    title: 'Cookies',
    content: `Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory. This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.`
  },
  {
    title: 'Service Providers',
    content: `We may employ third-party companies and individuals due to the following reasons: To facilitate our Service; To provide the Service on our behalf; To perform Service-related services; or To assist us in analyzing how our Service is used. We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.`
  },
  {
    title: 'Security',
    content: `We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.`
  },
  {
    title: 'Links to other Sites',
    content: `This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.`
  },
  {
    title: `Children's Privacy`,
    content: `These Services do not address anyone under the age of 18. We do not knowingly collect personally identifiable information from children under 18. In the case we discover that a child under 18 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.`
  },
  {
    title: 'Changes to This Privacy Policy',
    content: `We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. This policy is effective as of 2020-09-05`
  },
  {
    title: '',
    content: `If you have any questions or sugge'stions about our Privacy Policy, do not hesitate to contact us at contact@mytipster.pro`
  }
]

const PrivacyPolicy = () => {
  return (
    <div className="tipster-container py-5">
      <div className="bg-white p-5">
        <h1 className="pb-5">Privacy Policy</h1>
        {policyData.map((i, index) => (
          <div key={index} className="py-3">
            <div>
              <h5>{i.title}</h5>
            </div>
            <div>
              <p>{i.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PrivacyPolicy
