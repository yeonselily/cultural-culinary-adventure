import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './components/homepage/Homepage';
import CreateRecipe from './components/recipes/create/CreateRecipe';
import MyRecipes from './components/recipes/MyRecipes';
import Favorites from './components/recipes/Favorites';
import Profile from './components/users/Profile';
import CustomerList from './CustomerList';

function App() {
  return (
    <div className="App">
      <CustomerList />
    </div>
  );
}

export default App;
