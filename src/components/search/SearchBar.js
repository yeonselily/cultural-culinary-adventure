import '../../styles/search/SearchBar.css';
import { useState } from 'react';
import Select from 'react-select';

const options = [
  {value: 'Popular_Desc', label: (<>Popular <i className="fa-solid fa-arrow-down"></i></>)},
  {value: 'Popular_Asc', label: (<>Popular <i className="fa-solid fa-arrow-up"></i></>)},
  {value: 'Date_Desc', label: (<>Date Posted <i className="fa-solid fa-arrow-down"></i></>)},
  {value: 'Date_Asc', label: (<>Date Posted <i className="fa-solid fa-arrow-up"></i></>)}
];

const customComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
};

function SearchBar() {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#a40000' : 'white',
      color: state.isFocused ? 'white' : 'black',
    }),
    control: (provided) => ({
      ...provided,
      minHeight: '100%',
      height: '100%',
      minWidth: '170px',
      width: '170px',
      border: 'none',
      boxShadow: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: '0 20px 0 0',
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0 0px',
      height: '100%',
    }),
  };

  return (
    <div className="search-container">
      <form action="/action_page.php" className="search-form">
        <input
          className="search-bar"
          type="text"
          placeholder="Search..."
          name="search"
        />
        <button type="submit" className="search-button">
          <i className="fas fa-search"></i>
        </button>
      </form>
      <Select
        options={options}
        value={selectedOption}
        onChange={setSelectedOption}
        styles={customStyles}
        isSearchable={false}
        components={customComponents}
        placeholder="Sort by"
      />
    </div>
  );
}

export default SearchBar;
