/*
  Contact.jsx - Contact Support help page for EDSM
  -----------------------------------------------
  - Provides contact form and support options for users.
  - For backend/frontend devs: Update contact logic or support options here as needed.
*/
import React, { useState } from 'react';
import { FaArrowLeft, FaEnvelope, FaPhone, FaComments, FaPaperPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './Help.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast.success('Your message has been sent! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'normal'
    });
  };

  return (
    <div className="help-page">
      <div className="help-header">
        <Link to="/settings" state={{ activeTab: 'help' }} className="back-link">
          <FaArrowLeft /> Back to Settings
        </Link>
        <h1>Contact Support</h1>
        <p className="help-subtitle">We're here to help. Choose the best way to reach us.</p>
      </div>

      <div className="help-content">
        <div className="contact-options">
          <div className="contact-card">
            <FaEnvelope className="contact-icon" />
            <h3>Email Support</h3>
            <p>Get in touch with our support team</p>
            <a href="mailto:support@edsm.com">support@edsm.com</a>
            <p className="response-time">Response within 24 hours</p>
          </div>

          <div className="contact-card">
            <FaPhone className="contact-icon" />
            <h3>Phone Support</h3>
            <p>Speak with a support agent</p>
            <a href="tel:+1-800-EDSM-HELP">1-800-EDSM-HELP</a>
            <p className="response-time">Mon-Fri, 9am-5pm EST</p>
          </div>

          <div className="contact-card">
            <FaComments className="contact-icon" />
            <h3>Live Chat</h3>
            <p>Chat with our support team</p>
            <button className="chat-button">Start Chat</button>
            <p className="response-time">Available 24/7</p>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
              />
            </div>

            <button type="submit" className="submit-button">
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </div>

        <section className="help-section">
          <h2>Before You Contact Us</h2>
          <p>To help us assist you better, please:</p>
          <ul>
            <li>Check our <Link to="/faq">FAQ section</Link> for quick answers</li>
            <li>Review our <Link to="/troubleshooting">Troubleshooting guide</Link> for common issues</li>
            <li>Have your account information ready</li>
            <li>Include any relevant error messages or screenshots</li>
          </ul>
        </section>
      </div>
    </div>
  );
} 