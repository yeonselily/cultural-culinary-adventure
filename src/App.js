import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './components/homepage/Homepage';
import CreateRecipe from './components/recipes/create/CreateRecipe';
import MyRecipes from './components/recipes/MyRecipes';
import Favorites from './components/recipes/Favorites';
import Profile from './components/users/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
