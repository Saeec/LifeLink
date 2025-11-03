import React, { useState } from 'react';
import './InfoPage.css'; // Import the new CSS

// Data for the FAQ
const faqData = [
  {
    question: 'Who can donate blood?',
    answer: 'You can donate if you are in good health, weigh at least 50 kg (110 lbs), and are between 18 and 65 years old. Other medical conditions may apply, so please consult with a medical professional before your first donation.'
  },
  {
    question: 'How often can I donate blood?',
    answer: 'A healthy adult can typically donate whole blood once every 56 days (8 weeks). Platelet donations can be made more frequently, as often as every 7 days, up to 24 times a year.'
  },
  {
    question: 'Is it safe to donate blood?',
    answer: 'Absolutely. All equipment (needles, bags, etc.) is 100% sterile and used only once before being discarded. Your body will replenish the donated blood within a few weeks. The process is very safe.'
  },
  {
    question: 'How does LifeLink work?',
    answer: 'LifeLink is a digital bridge. Patients and hospitals can post urgent blood requests. Registered donors can pledge to donate, and hospitals can manage their inventory and claim requests. This creates a real-time, life-saving network for your community.'
  }
];

// Reusable Accordion Item component
const AccordionItem = ({ item, index, activeIndex, setActiveIndex }) => {
  const isOpen = index === activeIndex;
  
  const toggle = () => {
    setActiveIndex(isOpen ? null : index);
  };

  return (
    <div className="faq-item">
      <div 
        className={`faq-question ${isOpen ? 'active' : ''}`} 
        onClick={toggle}
      >
        {item.question}
        <span className="faq-icon">{isOpen ? '×' : '+'}</span>
      </div>
      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
        <p>{item.answer}</p>
      </div>
    </div>
  );
};

const InfoPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="info-page-container">
      {/* --- About Us Section --- */}
      <div className="info-section about-section">
        <h2>About LifeLink</h2>
        <p className="mission-statement">
          Our mission is to bridge the critical gap between blood donors and patients in need. We believe that no one should suffer due to a shortage of blood.
        </p>
        <p className="our-vision">
          LifeLink is a digital platform that connects generous, voluntary donors with hospitals and patients, creating a transparent and efficient life-saving network. We empower hospitals to manage their supply and give users a direct way to find help and give help, all in one place.
        </p>
      </div>

      {/* --- FAQ Section --- */}
      <div className="info-section faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-accordion">
          {faqData.map((item, index) => (
            <AccordionItem 
              key={index}
              item={item}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoPage;