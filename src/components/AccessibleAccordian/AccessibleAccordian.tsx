import { useState, useId } from "react";
import "./AccessibleAccordian.css";

export default function AccessibleAccordian() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accessible-accordion">
      {[1, 2, 3].map((index) => {
        const headerId = `${baseId}-header-${index}`;
        const contentId = `${baseId}-content-${index}`;
        const isExpanded = openIndex === index;

        return (
          <div className="accordion-item" key={index}>
            <h3>
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(index)}
                aria-expanded={isExpanded}
                aria-controls={contentId}
                id={headerId}
              >
                Accordion Header {index}
              </button>
            </h3>
            <div
              id={contentId}
              role="region"
              aria-labelledby={headerId}
              className="accordion-content"
              hidden={!isExpanded}
            >
              <p>Accordion Content {index}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
