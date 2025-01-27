import { useState } from "react";
import "./AccessibleAccordian.css";

export default function AccessibleAccordian() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {[1, 2, 3].map((index) => (
        <div className="inaccessible-accordion" key={index}>
          <div className="header" onClick={() => toggleAccordion(index)}>
            <h3>Accordion Header {index}</h3>
          </div>
          {openIndex === index && (
            <div className="content">
              <p>Accordion Content {index}</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
