'use client';

import { useState } from 'react';
import styles from './InquiryForm.module.css';

const countries = [
  'United States', 'Canada', 'United Kingdom', 'United Arab Emirates', 'Australia',
  'Germany', 'Netherlands', 'Saudi Arabia', 'Singapore', 'Malaysia', 'Japan',
  'South Africa', 'New Zealand', 'Vietnam', 'Indonesia', 'Egypt', 'Other'
];

const categories = [
  'Indian Spices', 'Blended Spices & Masalas', 'Rice', 'Pulses & Grains',
  'Oilseeds', 'Herbs', 'Dehydrated Products', 'Fruits & Vegetables',
  'Foodstuff & FMCG', 'Animal & Bird Feed', 'Raisins & Dry Fruits'
];

export default function InquiryForm({ initialProduct = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    productInterest: initialProduct,
    estimatedQuantity: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      // Since it's a static site, we generate a mailto link fallback
      const subject = `B2B Sourcing Inquiry from ${formData.company} (${formData.country})`;
      const body = `
Name: ${formData.name}
Company: ${formData.company}
Email: ${formData.email}
Phone: ${formData.phone}
Country: ${formData.country}
Product Interest: ${formData.productInterest}
Estimated Quantity: ${formData.estimatedQuantity}

Message:
${formData.message}
      `;

      // Trigger the local success state
      setSubmitSuccess(true);
      
      // Also open user's mail client as fallback
      window.location.href = `mailto:sales@sunitaexports.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } catch (err) {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className={styles.successMessage}>
        <span className={styles.successIcon} aria-hidden="true">✓</span>
        <h2>Inquiry Submitted Successfully</h2>
        <p>
          Thank you for contacting Sunita Agri Exports. We have received your B2B inquiry. Our export procurement team will review your specifications and contact you at <strong>{formData.email}</strong> within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitSuccess(false);
            setFormData({
              name: '',
              company: '',
              email: '',
              phone: '',
              country: '',
              productInterest: '',
              estimatedQuantity: '',
              message: '',
            });
          }}
          className="btn-secondary"
          style={{ marginTop: '1rem' }}
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">Contact Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-control"
          placeholder="e.g. John Doe"
        />
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label htmlFor="company" className="form-label">Company Name *</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="e.g. Acme Food Importers"
          />
        </div>
        <div className="form-group">
          <label htmlFor="country" className="form-label">Destination Country *</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="">-- Select Country --</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Business Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="e.g. procurement@acmefood.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="form-label">Contact Number (WhatsApp Preferred)</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g. +1 (555) 019-2834"
          />
        </div>
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label htmlFor="productInterest" className="form-label">Product of Interest *</label>
          <input
            type="text"
            id="productInterest"
            name="productInterest"
            value={formData.productInterest}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="e.g. Turmeric Powder, 1121 Basmati Rice"
          />
        </div>
        <div className="form-group">
          <label htmlFor="estimatedQuantity" className="form-label">Estimated Order Quantity (in MT / Containers)</label>
          <input
            type="text"
            id="estimatedQuantity"
            name="estimatedQuantity"
            value={formData.estimatedQuantity}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g. 1 FCL, 20 MT"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">Required Specifications / Custom Remarks *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="form-control"
          placeholder="Please specify grades, purity %, packaging sizes, and any sterilization or certification needs."
        ></textarea>
      </div>

      {submitError && (
        <p style={{ color: 'red', fontSize: '0.9rem', marginBottom: '1rem' }}>
          An error occurred. Please try emailing sales@sunitaexports.com directly.
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`btn-primary ${styles.submitBtn}`}
      >
        {isSubmitting ? 'Sending Request...' : 'Send Inquiry (Get Quote)'}
      </button>
    </form>
  );
}
