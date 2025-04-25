import { useState, useId } from "react";
import { useFocusTrap } from "./hooks/useFocusTrap";
import "./AccessibleModal.css";

export default function AccessibleModal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useFocusTrap({ isOpen, onClose: () => setIsOpen(false) });
  
  // Generate unique IDs for ARIA attributes
  const titleId = useId();
  const descriptionId = useId();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="accessible-modal">
      <button onClick={openModal} className="open-modal-button">
        Open Modal
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop with click handler */}
          <div 
            className="modal-backdrop" 
            onClick={closeModal}
            aria-hidden="true"
          />
          
          {/* Modal Dialog */}
          <div 
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="modal-overlay"
          >
            <div className="modal-content">
              <header className="modal-header">
                <h2 id={titleId}>Modal Title</h2>
                <button 
                  onClick={closeModal} 
                  className="close-modal-button"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </header>
              
              <main className="modal-body">
                <p id={descriptionId}>
                  This is the content of the modal dialog.
                </p>
              </main>
              
              <footer className="modal-footer">
                <button 
                  onClick={closeModal} 
                  className="close-modal-button"
                >
                  Close
                </button>
              </footer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}