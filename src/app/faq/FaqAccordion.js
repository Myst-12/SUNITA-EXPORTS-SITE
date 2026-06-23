'use client';

import { useState } from 'react';

export default function FaqAccordion({ faqs }) {
  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  const categories = {
    general: 'General Info',
    ordering: 'Ordering & Payment',
    shipping: 'Shipping & Logistics',
    quality: 'Quality & Testing'
  };

  return (
    <div>
      {Object.entries(categories).map(([catKey, catName]) => {
        const catFaqs = faqs.filter(f => f.category === catKey);
        if (catFaqs.length === 0) return null;

        return (
          <div key={catKey} style={{ marginBottom: 'var(--space-6)' }}>
            <span className="label gold-accent" style={{ fontSize: '0.825rem', marginBottom: 'var(--space-3)', display: 'block' }}>
              {catName}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {catFaqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div
                    key={faq.id}
                    style={{
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--border-radius-sm)',
                      overflow: 'hidden',
                      backgroundColor: 'var(--color-white)',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      style={{
                        width: '100%',
                        padding: '1.25rem var(--space-4)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '1.05rem',
                        color: 'var(--color-primary)',
                        fontFamily: 'var(--font-body)'
                      }}
                    >
                      <span>{faq.question}</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-gold)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'var(--transition-fast)' }}>
                        ▼
                      </span>
                    </button>
                    <div
                      style={{
                        maxHeight: isOpen ? '1000px' : '0px',
                        overflow: 'hidden',
                        transition: 'max-height var(--transition-base)',
                        borderTop: isOpen ? '1px solid var(--color-border)' : 'none'
                      }}
                    >
                      <p
                        style={{
                          padding: '1.25rem var(--space-4)',
                          margin: 0,
                          fontSize: '0.95rem',
                          color: 'var(--color-dark)',
                          lineHeight: '1.65',
                          backgroundColor: 'var(--color-ivory)'
                        }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
