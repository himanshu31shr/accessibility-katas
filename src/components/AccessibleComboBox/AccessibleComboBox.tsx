import { useState } from "react";
import "./AccessibleComboBox.css";

export default function AccessibleComboBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const items = ["Option 1", "Option 2", "Option 3"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="accessible-combobox">
      <div className="combobox-header" onClick={toggleDropdown}>
        <span>{selectedItem || "Select an option"}</span>
        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className="combobox-list">
          {items.map((item) => (
            <li
              key={item}
              className="combobox-item"
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
