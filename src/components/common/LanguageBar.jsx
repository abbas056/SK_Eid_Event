import React, { useState } from "react";
import down from "../../assets/arrow-down.png";
import up from "../../assets/arrow-up.png";
function LanguageBar({ setLanguage, language }) {
  const [isOpen, setIsOpen] = useState(false);
  const languages = ["English", "Urdu/Hindi"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (language) => {
    setLanguage(language);
    setIsOpen(false);
    // storeLanguageInLocalStorage(language);
  };

  return (
    <div className="language-dropdown p-abs f-tangoSans">
      <button className="selected-language" onClick={toggleDropdown}>
        {language ? language : "Select Language"}
        <span className="d-flex">
          <img src={isOpen ? up : down} alt="" />
        </span>
      </button>
      {isOpen && (
        <div className="language-list d-flex fd-column gap-1">
          {languages.map((language) => (
            <div key={language} className="language-option" onClick={() => handleLanguageSelect(language)}>
              {language}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageBar;
