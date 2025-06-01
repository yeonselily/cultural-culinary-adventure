import '../../styles/recipes/RecipeGrid.css';
import Thumbnail from './Thumbnail';
/** import { getUserIdFromToken } from '../../utility/AuthUtil'; */
import { useState, useEffect } from 'react';

function RecipeGrid({isMine=false, isFavorites =false}) {
  const [recipes, setRecipes] = useState([]);
  const recipesEndpoint = "get recipes endpoint update";
  const favoritesEndpoint = "get favorite recipes endpoint update";
  const userId = "123456"; /** const userId = getUserIdFromToken(); make auth util component for this */ 

  const fetchRequests = async () => {
    try {
      const response = await fetch(recipesEndpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      const filteredRequests = isMine ? data
        : data.filter(req => req.userId !== userId);

      const mappedRecipes = filteredRequests.map(recipe => ({
        /** map attributes from response
         * id: recipe.id,
         * etc.
         */
      }));

      setRecipes(mappedRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [userId, isMine]);

  return (
    <div className="recipe-grid-container">
      <div className="recipe-grid">
          {recipes.map(item => (
            <Thumbnail
              recipeId="1234"
              image="image"
              title="recipe thumbnail"
              isMine={isMine}
            />
          ))}
        </div>
    </div>
  );
}

export default RecipeGrid;