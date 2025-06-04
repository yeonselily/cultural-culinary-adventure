import '../../styles/search/Filters.css';
import { useState } from 'react';
import Countries from './Countries';
import States from './States';

function Filters() {
  const [difficulty, setDifficulty] = useState(1);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);

  const handleSliderChange = (event) => {
    setDifficulty(event.target.value);
  };

  return (
    <div className="filters">
      <div className="filters-header">Filters</div>
      <hr />

      <div className="filters-section">Preferences</div>
      <div className="filter-option"><input type="checkbox" name="Vegan" />Vegan</div>
      <div className="filter-option"><input type="checkbox" name="Vegetarian" />Vegetarian</div>
      <div className="filter-option"><input type="checkbox" name="Gluten Free" />Gluten Free</div>
      <div className="filter-option"><input type="checkbox" name="Kid Friendly" />Kid Friendly</div>
      <hr className="thin-line" />

      <div className="filter-option difficulty-input">
        <p className="difficulty">
          Difficulty Level: <output>{difficulty}</output>
        </p>
        <input
          className="difficulty-slider"
          type="range"
          min="1"
          max="5"
          step="1"
          value={difficulty}
          onChange={handleSliderChange}
          list="markers"
        />
        <datalist id="markers">
          <option value="1" />
          <option value="2" />
          <option value="3" />
          <option value="4" />
          <option value="5" />
        </datalist>
      </div>
      <hr className="divider" />

      <div className="filters-section">Cultural Influence</div>
      <div className="countries-wrapper">
        <Countries
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
        />
        {selectedCountries.includes("United States") && (
          <States
            selectedStates={selectedStates}
            setSelectedStates={setSelectedStates}
          />
        )}
      </div>
    </div>
  );
}

export default Filters;