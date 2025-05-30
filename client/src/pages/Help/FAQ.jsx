/*
  FAQ.jsx - Frequently Asked Questions help page for EDSM
  ------------------------------------------------------
  - Provides answers to common user questions.
  - For backend/frontend devs: Update FAQ content or logic here as needed.
*/
import React, { useState } from 'react';
import { FaArrowLeft, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Help.css';

export default function FAQ() {
  const [openSection, setOpenSection] = useState(null);

  const faqSections = [
    {
      title: "Account & Security",
      questions: [
        {
          q: "How do I reset my password?",
          a: "Go to Settings > Security and Privacy > Password. Click 'Update Password' and follow the instructions to set a new password."
        },
        {
          q: "Is my account secure?",
          a: "Yes, we use industry-standard encryption and security measures. We recommend enabling two-factor authentication for additional security."
        },
        {
          q: "How do I enable two-factor authentication?",
          a: "Navigate to Settings > Security and Privacy > Two-factor Authentication. Follow the setup process to enable 2FA using your preferred method."
        }
      ]
    },
    {
      title: "Trading & Portfolio",
      questions: [
        {
          q: "How do I add funds to my account?",
          a: "Click the 'Add Funds' button in your Portfolio or Dashboard. Follow the prompts to add funds using your preferred payment method."
        },
        {
          q: "What are the trading fees?",
          a: "We charge a small commission per trade. The exact fee structure can be found in your account settings under 'Trading Fees'."
        },
        {
          q: "How do I track my portfolio performance?",
          a: "Your portfolio performance is automatically tracked in the Portfolio section. You can view detailed analytics, historical performance, and current holdings."
        }
      ]
    },
    {
      title: "Market Data & Research",
      questions: [
        {
          q: "Is the market data real-time?",
          a: "Yes, we provide real-time market data with a small delay for non-premium users. Premium subscribers get access to real-time data without delay."
        },
        {
          q: "How do I set up price alerts?",
          a: "Go to the stock's detail page and click the 'Set Alert' button. Choose your price target and notification preferences."
        },
        {
          q: "Can I export my watchlist?",
          a: "Yes, you can export your watchlist in CSV format. Go to your Watchlist page and click the 'Export' button in the top right."
        }
      ]
    },
    {
      title: "Technical Support",
      questions: [
        {
          q: "What browsers are supported?",
          a: "EDSM works best on Chrome, Firefox, Safari, and Edge. We recommend using the latest version of these browsers."
        },
        {
          q: "How do I report a bug?",
          a: "Use the 'Report Issue' button in the Help & Support section or contact our support team directly."
        },
        {
          q: "Is there a mobile app?",
          a: "Yes, EDSM is available on both iOS and Android. You can download it from the App Store or Google Play Store."
        }
      ]
    }
  ];

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="help-page">
      <div className="help-header">
        <Link to="/settings" state={{ activeTab: 'help' }} className="back-link">
          <FaArrowLeft /> Back to Settings
        </Link>
        <h1>Frequently Asked Questions</h1>
        <p className="help-subtitle">Find quick answers to common questions about EDSM</p>
      </div>

      <div className="help-content">
        <div className="faq-search">
          <input 
            type="text" 
            placeholder="Search FAQs..." 
            className="faq-search-input"
          />
        </div>

        <div className="faq-sections">
          {faqSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="faq-section">
              <h2>{section.title}</h2>
              <div className="faq-questions">
                {section.questions.map((item, questionIndex) => (
                  <div 
                    key={questionIndex} 
                    className={`faq-item ${openSection === `${sectionIndex}-${questionIndex}` ? 'open' : ''}`}
                  >
                    <div 
                      className="faq-question"
                      onClick={() => toggleSection(`${sectionIndex}-${questionIndex}`)}
                    >
                      <h3>{item.q}</h3>
                      {openSection === `${sectionIndex}-${questionIndex}` ? 
                        <FaChevronUp /> : <FaChevronDown />
                      }
                    </div>
                    {openSection === `${sectionIndex}-${questionIndex}` && (
                      <div className="faq-answer">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <section className="help-section">
          <h2>Still Have Questions?</h2>
          <p>Can't find what you're looking for? Check out our <Link to="/getting-started">Getting Started guide</Link> or <Link to="/contact">contact our support team</Link> for personalized assistance.</p>
        </section>
      </div>
    </div>
  );
} 