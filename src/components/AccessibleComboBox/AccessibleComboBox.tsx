import { useState, useId, useRef, KeyboardEvent } from "react";
import "./AccessibleComboBox.css";

export default function AccessibleComboBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const items = ["Option 1", "Option 2", "Option 3"];
  const baseId = useId();
  const listboxId = `${baseId}-listbox`;
  const buttonId = `${baseId}-button`;
  const comboboxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setActiveIndex(-1);
    }
  };

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        if (isOpen && activeIndex >= 0) {
          handleSelect(items[activeIndex]);
        } else {
          setIsOpen(true);
        }
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setActiveIndex((prev) => Math.max(prev - 1, 0));
        }
        break;
      case " ": // Space
        if (!isOpen) {
          event.preventDefault();
          setIsOpen(true);
        }
        break;
    }
  };

  return (
    <div 
      ref={comboboxRef}
      className="accessible-combobox"
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls={listboxId}
      aria-labelledby={buttonId}
    >
      <button
        ref={buttonRef}
        id={buttonId}
        className="combobox-header"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        aria-label="Select an option"
      >
        <span>{selectedItem || "Select an option"}</span>
        <span className="arrow" aria-hidden="true">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>
      {isOpen && (
        <ul 
          id={listboxId}
          className="combobox-list"
          role="listbox"
          aria-label="Options"
          tabIndex={-1}
        >
          {items.map((item, index) => (
            <li
              key={item}
              id={`${baseId}-option-${index}`}
              className={`combobox-item ${index === activeIndex ? "active" : ""}`}
              role="option"
              aria-selected={item === selectedItem}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setActiveIndex(index)}
              tabIndex={-1}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
