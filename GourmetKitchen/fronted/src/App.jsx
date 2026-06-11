import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import ProfilePage from "./pages/profile-page/ProfilePage";
import AddRecipes from "./pages/addrecipes/AddRecipes";
import RecipeDetails from "./pages/recipeDetailsPage/RecipeDetails";
import SavedRecipes from "./pages/saved-recipes/SavedRecipes";
import Home from "./pages/home/Home";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path ='/recipes' element={<Home/>}/>
        <Route path="/recipe-details" element={<RecipeDetails />} />
        <Route path="/recipe-details/:id" element={<RecipeDetails />} />
        <Route path="/add-recipes" element={<AddRecipes />} />
        <Route path="/edit-recipe/:id" element={<AddRecipes />} />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:id" element={<ProfilePage/>}/>
      </Routes>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
    </>
  );
}

export default App;
