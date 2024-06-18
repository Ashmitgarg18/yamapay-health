import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../public/css/styles.css';
import Head from 'next/head';

const About = () => (
  <>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>About Us - YamaHealth</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
    </Head>
    <div className="container">
      <h1 className="heading my-4">About Us</h1>
      <p>Welcome to YamaHealth!</p>
      <p>At YamaHealth, our mission is to empower individuals with accessible and reliable information about the most important medical tests. We understand the critical role that these tests play in maintaining and improving your health, and we are dedicated to providing clear, concise, and comprehensive insights to help you understand your test results.</p>
      
      <h2>Our Current Offerings</h2>
      <p>Our website currently offers detailed information about the top 10 medical tests conducted in the US, including:</p>
      <ul>
        <li>Lipid Panel</li>
        <li>Complete Blood Count (CBC)</li>
        <li>Basic Metabolic Panel (BMP)</li>
        <li>Comprehensive Metabolic Panel (CMP)</li>
        <li>Hemoglobin A1c (HbA1c)</li>
        <li>Thyroid Panel</li>
        <li>Prostate-Specific Antigen (PSA)</li>
        <li>Liver Function Tests (LFTs)</li>
        <li>Urinalysis</li>
        <li>Electrocardiogram (ECG/EKG)</li>
      </ul>
      <p>Each test is explained in a way that is easy to understand, covering the following aspects:</p>
      <ul>
        <li>Introduction: What the test is and its importance.</li>
        <li>Systemic View of Impacts: How the test results can affect various organs and systems.</li>
        <li>Interpreting Your Results: What high and low values mean for your health.</li>
        <li>Lifestyle Actions: Practical steps you can take to improve or maintain your health.</li>
        <li>Top Medications and Supplements: Common treatments and natural remedies related to the test.</li>
      </ul>
      
      <h2>Our Vision for the Future</h2>
      <p>We are committed to evolving and enhancing our platform to offer more personalized and actionable health insights. Our ultimate goal is to create a user-specific interface where you can:</p>
      <ul>
        <li>Enter Your Test Results: Input your specific test values directly into our system.</li>
        <li>Receive Personalized Insights: Get tailored health information and recommendations based on your unique data.</li>
        <li>Connect with Experts: Leverage APIs from leading medical institutions to provide you with the most accurate and professional advice.</li>
      </ul>
      
      <h2>Our Commitment to You</h2>
      <p>At YamaHealth, we are driven by a desire to make a positive impact on your health journey. We believe in:</p>
      <ul>
        <li>Accuracy and Reliability: Providing you with up-to-date and medically reviewed information.</li>
        <li>User-Friendly Experience: Ensuring our platform is easy to navigate and understand.</li>
        <li>Privacy and Security: Keeping your personal information safe and confidential.</li>
      </ul>
      
      <h2>Join Us on This Journey</h2>
      <p>We invite you to join us as we work towards building a more interactive and personalized health platform. Your feedback and support are invaluable to us as we strive to meet and exceed your expectations.</p>
      <p>Thank you for choosing YamaHealth as your trusted source for medical test information. Together, we can take proactive steps towards better health and well-being.</p>
      
      <h2>Contact Us</h2>
      <p>For any questions, suggestions, or feedback, please feel free to reach out to us at <a href="mailto:yamahealth@gmail.com">yamahealth@gmail.com</a>.</p>
    </div>
  </>
);

export default About;
