import '../../../../styles/recipes/create/fields/Ingredients.css'
import Select from 'react-select';

const options = [
  { value: '-', label: '-' },
  { value: 'tsp', label: 'tsp' },
  { value: 'tbsp', label: 'tsbp' },
  { value: 'cup', label: 'oz' },
  { value: 'g', label: 'g' },
  { value: 'ml', label: 'ml' },
  { value: 'lb', label: 'lb' },
  { value: 'kg', label: 'kg' },
  { value: 'pcs', label: 'pcs' },
  { value: 'pinch', label: 'pinch' }
];

function Ingredients ({ ingredients, setIngredients }) {

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
      minWidth: '85px',
      width: '85px',
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
      padding: '0 0 10px 0',
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

  return (
    <div className="ingredients">
      {ingredients.map((ingredient, index) => (
        <div key={index} className="ingredient-row">
          <div className="ingredient-name">
            <input
              type="text"
              placeholder="Ingredient name"
              value={ingredient.name}
              onChange={(e) => {
                const newIngredients = [...ingredients];
                newIngredients[index].name = e.target.value;
                setIngredients(newIngredients);

                if (
                  index === ingredients.length - 1 &&
                  e.target.value.trim() !== ''
                ) {
                  setIngredients([...newIngredients, { name: '', quantity: '', unit: '' }]);
                }
              }}
              required={index === 0}
            />
          </div>

          <div className="ingredient-quantity">
            <input
              type="text"
              placeholder="Amount"
              value={ingredient.quantity}
              onChange={(e) => {
                const newIngredients = [...ingredients];
                newIngredients[index].quantity = e.target.value;
                setIngredients(newIngredients);
              }}
              required={index === 0}
            />
          </div>

          <Select
            options={options}
            value={options.find(opt => opt.value === ingredients[index].unit)}
            onChange={(selectedOption) => {
              const newIngredients = [...ingredients];
              newIngredients[index].unit = selectedOption.value;
              setIngredients(newIngredients);
            }}
            styles={customStyles}
            isSearchable={false}
            placeholder="Unit"
          />

          <div className="delete-ingredient-btn">
            {ingredients.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const newIngredients = ingredients.filter((_, i) => i !== index);
                  setIngredients(newIngredients);
                }}
                title="Delete ingredient"
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

export default Ingredients;