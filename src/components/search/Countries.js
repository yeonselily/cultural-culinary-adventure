import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import '../../styles/search/Countries.css';

export default function Countries({ selectedCountries, setSelectedCountries }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  // Fetch country names from backend
  useEffect(() => {
    fetch('https://students.washington.edu/ayleenpt/cultural-culinary-adventure/select_countries.php')
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.error('Error fetching countries:', err));
  }, []);

  const toggleVisibility = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (name) => {
    setSelectedCountries((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    );
  };

  const filteredCountries = countries.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="countries-container">
      <div className="countries-header" onClick={toggleVisibility}>
        <div className="countries-title">Countries</div>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>

      {selectedCountries.length > 0 && (
        <div className="selected-tags">
          {selectedCountries.map((name) => (
            <div key={name} className="tag">
              {name}
              <button
                className="remove-tag"
                onClick={() => handleCheckboxChange(name)}
                aria-label={`Remove ${name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="dropdown">
          <input
            type="text"
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <div className="list">
            {filteredCountries.map((name) => (
              <div key={name} className="list-item">
                <input
                  type="checkbox"
                  checked={selectedCountries.includes(name)}
                  onChange={() => handleCheckboxChange(name)}
                  id={`country-${name}`}
                />
                <label className="country-label" htmlFor={`country-${name}`}>{name}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
