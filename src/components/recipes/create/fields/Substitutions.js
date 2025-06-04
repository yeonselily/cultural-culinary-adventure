import '../../../../styles/recipes/create/fields/Substitutions.css';
import Select from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';

const loadOptions = async (inputValue) => {
  const response = await fetch(
    `https://students.washington.edu/ayleenpt/cultural-culinary-adventure/select_ingredients.php?q=${encodeURIComponent(inputValue)}`
  );
  const data = await response.json();
  return data;
};

function Substitutions({ ingredients, substitutions, setSubstitutions }) {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#a40000' : 'white',
      color: state.isFocused ? 'white' : 'black',
    }),
    control: (provided) => ({
      ...provided,
      minHeight: '29px',
      height: '29px',
      minWidth: '100px',
      width: '100%',
      fontSize: '14px',
      borderColor: '#ccc',
      boxShadow: 'none',
      borderRadius: '7px',
      display: 'flex',
      alignItems: 'center',
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '29px',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '29px',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: '4px',
    }),
  };

  const options = ingredients.map((ingredient) => ({
    value: ingredient.name,
    label: ingredient.name,
  }));

  return (
    <div className="substitutions">
      {substitutions.map((substitution, index) => (
        <div key={index} className="substitutions-row">
          <Select
            options={options}
            value={options.find((opt) => opt.value === substitution.ogIngr)}
            onChange={(selectedOption) => {
              const newSubs = [...substitutions];
              newSubs[index].ogIngr = selectedOption.value;
              setSubstitutions(newSubs);
            }}
            styles={customStyles}
            isSearchable={false}
            placeholder="Original Ingredient"
          />

          <div className="sub-ingredient">
            <AsyncCreatableSelect
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              value={
                substitution.subIngr
                  ? { label: substitution.subIngr, value: substitution.subIngr }
                  : null
              }
              onChange={(option) => {
                const newSubs = [...substitutions];
                newSubs[index].subIngr = option.value;
                newSubs[index].isNew = false;
                setSubstitutions(newSubs);

                if (
                  index === substitutions.length - 1 &&
                  option.value.trim() !== ''
                ) {
                  setSubstitutions([
                    ...newSubs,
                    { ogIngr: '', subIngr: '', ogAmt: '', subAmt: '', isNew: false },
                  ]);
                }
              }}
              onCreateOption={(inputValue) => {
                const newSubs = [...substitutions];
                newSubs[index].subIngr = inputValue;
                newSubs[index].isNew = true;
                setSubstitutions(newSubs);

                if (
                  index === substitutions.length - 1 &&
                  inputValue.trim() !== ''
                ) {
                  setSubstitutions([
                    ...newSubs,
                    { ogIngr: '', subIngr: '', ogAmt: '', subAmt: '', isNew: false },
                  ]);
                }
              }}
              placeholder="Substitute Ingredient"
              styles={customStyles}
            />
          </div>

          <div className="ratio">
            Ratio:&nbsp;
            <input
              type="number"
              placeholder="OG"
              value={substitution.ogAmt}
              onChange={(e) => {
                const newSubs = [...substitutions];
                newSubs[index].ogAmt = e.target.value;
                setSubstitutions(newSubs);
              }}
              required={index === 0}
            />
            <text className="colon">:</text>
            <input
              type="number"
              placeholder="Sub"
              value={substitution.subAmt}
              onChange={(e) => {
                const newSubs = [...substitutions];
                newSubs[index].subAmt = e.target.value;
                setSubstitutions(newSubs);
              }}
              required={index === 0}
            />
          </div>

          <div className="delete-substitution-btn">
            {substitutions.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const newSubs = substitutions.filter((_, i) => i !== index);
                  setSubstitutions(newSubs);
                }}
                title="Delete substitution"
              >
                ×
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Substitutions;
