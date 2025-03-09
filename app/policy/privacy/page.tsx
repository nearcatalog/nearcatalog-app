import { Metadata } from "next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const privacyPolicy = `
# Privacy Policy for NearCatalog

**Last Updated: March 09, 2025**

Welcome to NearCatalog ("we," "us," or "our"). We are committed to protecting your privacy and ensuring that your personal information is handled responsibly. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web application (the "App") available at [insert URL]. By accessing or using the App, you agree to the terms of this Privacy Policy.

## 1. Information We Collect

We may collect the following types of information when you use NearCatalog:

### a. Personal Information
- **Account Information**: When you create an account, we may collect your name, email address, username, and password.
- **User-Provided Data**: Information you voluntarily provide, such as profile details, preferences, or content you upload (e.g., text, images, or files).

### b. Automatically Collected Information
- **Usage Data**: Details about how you interact with the App, including pages visited, features used, time spent, and click patterns.
- **Device Information**: Information about the device you use to access the App, such as IP address, browser type, operating system, and device identifiers.
- **Cookies and Tracking Technologies**: We use cookies, web beacons, and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can manage cookie preferences through your browser settings.

### c. Third-Party Information
- If you connect your NearCatalog account with third-party services (e.g., social media), we may receive information from those services based on their policies and your settings.

## 2. How We Use Your Information

We use the information we collect for the following purposes:
- To provide, maintain, and improve the App’s functionality and user experience.
- To personalize your experience, such as tailoring content or recommendations.
- To process account registration, authentication, and support requests.
- To communicate with you, including sending updates, notifications, or promotional materials (you may opt out of marketing communications).
- To analyze usage trends and optimize performance.
- To ensure the security of the App and prevent fraud or abuse.
- To comply with legal obligations or enforce our Terms of Service.

## 3. How We Share Your Information

We do not sell your personal information. We may share your information in the following circumstances:
- **Service Providers**: With trusted third-party vendors who assist us in operating the App (e.g., hosting, analytics, customer support), under strict confidentiality agreements.
- **Legal Requirements**: If required by law, regulation, or legal process (e.g., court order), or to protect the rights, property, or safety of NearCatalog, our users, or the public.
- **Business Transfers**: In connection with a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.
- **With Your Consent**: If you explicitly agree to share your information with a third party.

## 4. Your Choices and Rights

You have control over your information:
- **Account Settings**: Update or delete your account information through the App’s settings.
- **Cookies**: Adjust your browser settings to block or delete cookies.
- **Opt-Out**: Unsubscribe from marketing emails using the link provided in those messages.

Depending on your location, you may have additional rights under applicable privacy laws (e.g., GDPR, CCPA), such as:
- Access, correct, or delete your personal data.
- Restrict or object to certain processing activities.
- Request data portability.

To exercise these rights, contact us at [insert contact email].

## 5. Data Security

We implement reasonable technical and organizational measures to protect your information from unauthorized access, loss, or misuse. However, no system is completely secure, and we cannot guarantee absolute security.

## 6. Data Retention

We retain your information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, or resolve disputes. When no longer needed, we securely delete or anonymize it.

## 7. Third-Party Links

The App may contain links to third-party websites or services. We are not responsible for their privacy practices and encourage you to review their policies.

## 8. Children’s Privacy

NearCatalog is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If we learn such data has been collected, we will take steps to delete it.

## 9. International Data Transfers

If you access the App from outside [insert your country/region], your information may be transferred to and processed in [insert country where servers are located]. We ensure appropriate safeguards are in place for such transfers.

## 10. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. Changes will be posted here with an updated "Last Updated" date. Continued use of the App after changes constitutes acceptance of the revised policy.

## 11. Contact Us

If you have questions, concerns, or requests regarding this Privacy Policy or our practices, please contact us at:
- **X**: https://x.com/nearcatalog
`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "NEAR Catalog is a platform that provides a directory of NEAR projects. This privacy policy outlines the types of information that NEAR Catalog collects, how it uses it, and how you can access and control it.",
};

export default function PrivacyPage() {
  return <Markdown remarkPlugins={[remarkGfm]}>{privacyPolicy}</Markdown>;
}
