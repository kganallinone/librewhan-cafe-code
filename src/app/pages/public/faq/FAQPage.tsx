import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I franchise a Librewhan Cafe?",
      answer:
        "To franchise a Librewhan Cafe, fill out our franchise application form on the website, and our team will get in touch with you to discuss the next steps.",
    },
    {
      question: "What are the requirements for franchising?",
      answer:
        "The requirements include a minimum investment amount, an appropriate location, and a commitment to follow our brand guidelines. Contact us for more detailed information.",
    },
    {
      question:
        "Can I visit your store locations before deciding to franchise?",
      answer:
        "Yes, we encourage you to visit our store locations to experience our atmosphere and services firsthand before making a decision.",
    },
    {
      question: "How long does the franchise approval process take?",
      answer:
        "The approval process typically takes 2-4 weeks, depending on the completeness of the application and the evaluation of your proposed location.",
    },
    {
      question: "Do you offer training for new franchisees?",
      answer:
        "Yes, we provide comprehensive training for all new franchisees, including operations, marketing, and staff management to ensure your success.",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <section>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Frequently Asked Questions (FAQ)
        </h1>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 bg-white shadow-md rounded-lg p-6">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h2 className="text-xl font-semibold text-teal-600">
                  {faq.question}
                </h2>
                {openIndex === index ? (
                  <FaChevronUp className="text-teal-500" />
                ) : (
                  <FaChevronDown className="text-teal-500" />
                )}
              </div>
              {openIndex === index && (
                <p className="mt-4 text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
