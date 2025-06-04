import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import AsyncCreatableSelect from 'react-select/async-creatable';
import '../../../../styles/recipes/create/fields/Ingredients.css';

const UNIT_OPTIONS = [
  { value: '-', label: '-' },
  { value: 'tsp', label: 'tsp' },
  { value: 'tbsp', label: 'tbsp' },
  { value: 'cup', label: 'cup' },
  { value: 'g', label: 'g' },
  { value: 'ml', label: 'ml' },
  { value: 'lb', label: 'lb' },
  { value: 'kg', label: 'kg' },
  { value: 'pcs', label: 'pcs' },
  { value: 'pinch', label: 'pinch' }
];

const loadOptions = async (inputValue) => {
  const response = await fetch(`https://students.washington.edu/ayleenpt/cultural-culinary-adventure/select_ingredients.php?q=${encodeURIComponent(inputValue)}`);
  const data = await response.json();
  return data;
};

function Ingredients({ ingredients, setIngredients }) {
  const handleNameChange = async (selectedOption, index) => {
    const newName = selectedOption?.value ?? '';
    const newIngredients = [...ingredients];
    newIngredients[index].name = newName;
    setIngredients(newIngredients);

    // Auto-add a new row if last was edited
    if (index === ingredients.length - 1 && newName.trim() !== '') {
      setIngredients([...newIngredients, { name: '', quantity: '', unit: '', isNew: false }]);
    }

    // Check if it's new and add to DB
    const existing = await loadOptions(newName);
    const match = existing.find(opt => opt.value.toLowerCase() === newName.toLowerCase());
    if (!match) {
      await fetch('https://students.washington.edu/ayleenpt/cultural-culinary-adventure/insert_ingredient.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredient_name: newName })
      });
    }
  };

  return (
    <div className="ingredients">
      {ingredients.map((ingredient, index) => (
        <div key={index} className="ingredient-row">
          <div className="ingredient-name">
            <AsyncCreatableSelect
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              value={ingredient.name ? { label: ingredient.name, value: ingredient.name } : null}
              onChange={(option) => {
                const newIngredients = [...ingredients];
                newIngredients[index] = {
                  ...newIngredients[index],
                  name: option.value,
                  isNew: false // selected from DB
                };
                setIngredients(newIngredients);

                if (index === ingredients.length - 1 && option.value.trim() !== '') {
                  setIngredients([...newIngredients, { name: '', quantity: '', unit: '', isNew: false }]);
                }
              }}
              onCreateOption={(inputValue) => {
                const newIngredients = [...ingredients];
                newIngredients[index] = {
                  ...newIngredients[index],
                  name: inputValue,
                  isNew: true
                };
                setIngredients(newIngredients);

                if (index === ingredients.length - 1 && inputValue.trim() !== '') {
                  setIngredients([...newIngredients, { name: '', quantity: '', unit: '', isNew: false }]);
                }
              }}
              placeholder="Ingredient name"
              styles={{ container: base => ({ ...base, minWidth: '150px' }) }}
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
            options={UNIT_OPTIONS}
            value={UNIT_OPTIONS.find(opt => opt.value === ingredient.unit)}
            onChange={(selectedOption) => {
              const newIngredients = [...ingredients];
              newIngredients[index].unit = selectedOption.value;
              setIngredients(newIngredients);
            }}
            styles={{
              control: (provided) => ({
                ...provided,
                minHeight: '29px',
                height: '29px',
                minWidth: '85px',
                fontSize: '14px',
                borderRadius: '7px',
              }),
            }}
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
