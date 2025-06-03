import '../../../../styles/recipes/create/fields/Substitutions.css'
import Select from 'react-select';

function Substitutions ({ ingredients, substitutions, setSubstitutions }) {

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
      '&:hover': {
        boxShadow: '0 0 0 2px #a40000;',
      },
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

  const options = ingredients.map(ingredient => ({
    value: ingredient.name,
    label: ingredient.name
  }));


  return (
    <div className="substitutions">
      {substitutions.map((substitution, index) => (
        <div key={index} className="substitutions-row">
          <Select
            options={options}
            value={options.find(opt => opt.value === substitutions[index].ogIngr)}
            onChange={(selectedOption) => {
              const newSubstitutions = [...substitutions];
              newSubstitutions[index].ogIngr = selectedOption.value;
              setSubstitutions(newSubstitutions);
            }}
            styles={customStyles}
            isSearchable={false}
            placeholder="Original Ingredient"
          />

          <div className="sub-ingredient">
            <input
              type="text"
              placeholder="Substitute Ingredient"
              value={substitution.subIngr}
              onChange={(e) => {
                const newSubstitutions = [...substitutions];
                newSubstitutions[index].subIngr = e.target.value;
                setSubstitutions(newSubstitutions);

                if (
                  index === substitutions.length - 1 &&
                  e.target.value.trim() !== ''
                ) {
                  setSubstitutions([...newSubstitutions, { ogIngr: '', subIngr: '', ogAmt: '', subAmt: '' }]);
                }
              }}
              required={index === 0}
            />
          </div>

          <div className="ratio">
            Ratio:&nbsp;
            <input
              type="number"
              placeholder="OG"
              value={substitution.ogAmt}
              onChange={(e) => {
                const newSubstitutions = [...substitutions];
                newSubstitutions[index].ogAmt = e.target.value;
                setSubstitutions(newSubstitutions);
              }}
              required={index === 0}
            />
            <text className="colon">:</text>
            <input
              type="number"
              placeholder="Sub"
              value={substitution.subAmt}
              onChange={(e) => {
                const newSubstitutions = [...substitutions];
                newSubstitutions[index].subAmt = e.target.value;
                setSubstitutions(newSubstitutions);
              }}
              required={index === 0}
            />
          </div>

          <div className="delete-substitution-btn">
            {substitutions.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const newSubstitutions = substitutions.filter((_, i) => i !== index);
                  setSubstitutions(newSubstitutions);
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