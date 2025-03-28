import { useState } from "react";
import "./AccessibleModal.css";

export default function AccessibleModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="accessible-modal">
      <button onClick={openModal} className="open-modal-button">
        Open Modal
      </button>
      {isOpen && (
        <div className="modal-overlay" role="dialog">
          <div className="modal-content">
            <header className="modal-header">
              <h2>Modal Title</h2>
              <button onClick={closeModal} className="close-modal-button">
                ×
              </button>
            </header>
            <main className="modal-body">
              <p>This is the content of the modal dialog.</p>
            </main>
            <footer className="modal-footer">
              <button onClick={closeModal} className="close-modal-button">
                Close
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}