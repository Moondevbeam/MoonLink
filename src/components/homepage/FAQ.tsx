import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How many custom short links can I create?',
    answer: 'You can create up to 6 custom short links with your MoonLink account.',
  },
  {
    question: 'Can I edit or update my existing links?',
    answer: 'Certainly! You have the flexibility to make changes to your links whenever you need to.',
  },
  {
    question: 'Is there a cost associated with using MoonLink?',
    answer: 'No worries, MoonLink offers free access to its features, including link customization.',
  },
  {
    question: 'Can I personalize the appearance of my short links?',
    answer: 'Yes, you have full creative control over the appearance of your short links.',
  },
  // Add more FAQ items
];

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (index === openIndex) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border rounded-md overflow-hidden">
              <button
                className="w-full text-left px-4 py-3 font-semibold bg-gray-200 hover:bg-gray-300 focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                {item.question}
              </button>
              {openIndex === index && <p className="px-4 py-3">{item.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
