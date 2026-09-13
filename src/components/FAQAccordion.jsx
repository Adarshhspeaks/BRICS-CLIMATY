import React, { useState } from 'react';
import './FAQAccordion.css';

export default function FAQAccordion({ items }) {
  const defaultItems = [
    {
      q: 'What services do you offer?',
      a: 'We provide carbon footprint assessments, sustainability consulting, commercial & residential solar solutions, LEED green building guidance, and ESG reporting.'
    },
    {
      q: 'How is my carbon footprint measured?',
      a: 'We analyze your complete utility data, operational energy consumption, transportation logistics, supply chain variables, and waste streams using GHG Protocol standards to calculate exact baseline emissions.'
    },
    {
      q: "What's the ROI on solar installations?",
      a: 'Most commercial and residential clients realize a full return on investment within 3–7 years, accelerated by tax credits, renewable energy rebates, and immediate energy bill reductions of up to 70%.'
    },
    {
      q: 'Can small businesses benefit?',
      a: 'Yes. Our solutions are modular and scalable, specifically tailored to deliver high ROI, cost savings, and actionable sustainability roadmaps for businesses of any scale.'
    },
    {
      q: 'How long is implementation?',
      a: 'Initial carbon audits and recommendations take 2–3 weeks. Solar installations and complete sustainability program rollouts typically take 4–8 weeks depending on project scope.'
    }
  ];

  const faqData = items || defaultItems;
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className="faq-accordion-container">
      {faqData.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className={`faq-card ${isOpen ? 'open' : ''}`}>
            <button 
              className="faq-question-btn"
              onClick={() => toggleItem(idx)}
              aria-expanded={isOpen}
            >
              <span className="faq-question-text">{item.q}</span>
              <div className="faq-icon-circle">
                <svg 
                  className={`faq-arrow-icon ${isOpen ? 'rotated' : ''}`}
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
            </button>
            <div className={`faq-answer-wrapper ${isOpen ? 'expanded' : ''}`}>
              <div className="faq-answer-content">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
