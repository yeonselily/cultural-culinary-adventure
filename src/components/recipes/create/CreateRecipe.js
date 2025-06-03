import '../../../styles/recipes/create/CreateRecipe.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';
import FormGroup from './FormGroup';
import DisplayName from './fields/DisplayName';
import ShortName from './fields/ShortName';
import Image from './fields/Image';
import Description from './fields/Description';
import CookingTime from './fields/CookingTime';
import Difficulty from './fields/Difficulty';
import DietaryRestrictions from './fields/DietaryRestrictions';
import KidFriendly from './fields/KidFriendly';
import Countries from '../../search/Countries';
import States from '../../search/States';
import Ingredients from './fields/Ingredients';
import Substitutions from './fields/Substitutions';
import RecipeSteps from './fields/RecipeSteps';

function CreateRecipe() {
  const [recipeTitle, setRecipeTitle] = useState('');
  const [shortName, setShortName] = useState('');
  const [description, setDescription] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [glutenFree, setGF] = useState('');
  const [vegetarian, setVegetarian] = useState('');
  const [vegan, setVegan] = useState('');
  const [kidFriendly, setKidFriendly] = useState('');
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
  const [substitutions, setSubstitutions] = useState([{ ogIngr: '', subIngr: '', ogAmt: '', subAmt: '' }]);
  const [image, setImage] = useState(null);
  const [steps, setSteps] = useState([""]);
  const cleanedSteps = steps.filter(step => step.trim() !== "");
  const navigate = useNavigate();
  const userId = null; /** update */

  const handleSubmit = (e) => {
    e.preventDefault();

    const recipeData = {
      title: recipeTitle,
      shortName,
      description,
      cookTime,
      difficulty,
      vegan,
      vegetarian,
      glutenFree,
      kidFriendly,
      countries: selectedCountries,
      states: selectedStates,
      steps: cleanedSteps,
      image,
      ingredients: ingredients.filter(i => i.name.trim() !== '')
    };

    // TODO: Send recipeData to backend
  };

  return (
    <div className="create-recipe">
      <Header />
      <div className="create-recipe-container">
        <h2 className="create-recipe-title">Post a Recipe</h2>
        <form onSubmit={handleSubmit} className="create-recipe-form">
          <FormGroup
            label="Display Name" Component={DisplayName}
            componentProps={{recipeTitle: recipeTitle, setRecipeTitle: setRecipeTitle}}
          />

          <FormGroup
            label="Short Name" Component={ShortName}
            componentProps={{shortName: shortName, setShortName: setShortName}}
          />

          <FormGroup
            label="Thumbnail Image" Component={Image}
            componentProps={{image: image, setImage: setImage}}
          />

          <FormGroup
            label="Recipe Description" Component={Description}
            componentProps={{description: description, setDescription: setDescription}}
          />

          <div className="numbers">
            <FormGroup 
              label="Cooking Time (minutes)" Component={CookingTime}
              style={{ width: '350px', maxWidth: '40vw' }}
              componentProps={{ cookTime: cookTime, setCookTime: setCookTime }}
            />
            <FormGroup 
              label="Difficulty Level" Component={Difficulty}
              style={{ width: '350px', maxWidth: '40vw' }}
              componentProps={{ difficulty: difficulty, setDifficulty: setDifficulty }}
            />
          </div>

          <FormGroup
            label="Dietary Restrictions" Component={DietaryRestrictions}
            componentProps={{
              vegan: vegan, setVegan: setVegan, vegetarian: vegetarian,
              setVegetarian: setVegetarian, glutenFree: glutenFree, setGF: setGF
            }}
          />

          <FormGroup
            label="Kid Friendly" Component={KidFriendly}
            componentProps={{kidFriendly: kidFriendly, setKidFriendly: setKidFriendly}}
          />

          <div className="recipe-influence">
            <FormGroup
              label="Cultural Influence" Component={Countries}
              componentProps={{selectedCountries: selectedCountries, setSelectedCountries: setSelectedCountries}}
            />
            {selectedCountries.includes("USA") && (
              <FormGroup
                Component={States}
                componentProps={{selectedStates: selectedStates, setSelectedStates: setSelectedStates}}
              />
            )}
          </div>

          <FormGroup
            label="Ingredients" Component={Ingredients}
            componentProps={{ingredients: ingredients, setIngredients: setIngredients}}
          />

          <FormGroup
            label="Substitutions" Component={Substitutions}
            componentProps={{
                ingredients: ingredients,
                substitutions: substitutions,
                setSubstitutions: setSubstitutions
            }}
          />

          <FormGroup
            label="Recipe Steps" Component={RecipeSteps}
            componentProps={{steps: steps, setSteps: setSteps}}
          />

          <button type="submit" className="post-recipe-btn">Post Recipe</button>
        </form>
      </div>
    </div>
  );
}

export default CreateRecipe;