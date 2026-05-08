import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import ProfilePage from "./pages/profile-page/ProfilePage";
import AddRecipes from "./pages/addrecipes/AddRecipes";
import RecipeDetails from "./pages/recipeDetailsPage/RecipeDetails";
import Home from "./pages/home/Home";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path ='/recipes' element={<Home/>}/>
        <Route path="/add-recipes" element={<AddRecipes />} />
        <Route path="/recipe-details" element={<RecipeDetails />} />
        <Route path="/profile-page" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
