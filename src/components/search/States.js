import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import '../../styles/search/Countries.css';

export default function States({ selectedStates, setSelectedStates }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [states, setStates] = useState([]);

  // Fetch state names
  useEffect(() => {
    fetch('https://students.washington.edu/ayleenpt/cultural-culinary-adventure/select_states.php')
      .then(res => res.json())
      .then(data => setStates(data))
      .catch(err => console.error('Error fetching states:', err));
  }, []);

  const toggleVisibility = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (name) => {
    setSelectedStates((prev) =>
      prev.includes(name)
        ? prev.filter((s) => s !== name)
        : [...prev, name]
    );
  };

  const filteredStates = states.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="states-container">
      <div className="countries-header" onClick={toggleVisibility}>
        <div className="countries-title">States</div>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>

      {selectedStates.length > 0 && (
        <div className="selected-tags">
          {selectedStates.map((name) => (
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
            placeholder="Search states..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <div className="list">
            {filteredStates.map((name) => (
              <div key={name} className="list-item">
                <input
                  type="checkbox"
                  checked={selectedStates.includes(name)}
                  onChange={() => handleCheckboxChange(name)}
                  id={`state-${name}`}
                />
                <label className="country-label" htmlFor={`state-${name}`}>{name}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
