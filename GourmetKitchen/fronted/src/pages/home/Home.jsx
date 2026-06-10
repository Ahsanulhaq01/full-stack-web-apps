import { useState } from "react";
import MessagetoUser from "../../components/homepageComponents/MessagetoUser";
import Navbar from "../../components/navbar/Navbar";
import RecipeCard from "../../components/recipeCard/RecipeCard";
import useGetRecipes from "../../customHook/useGetRecipes";
import "./home.css";
function Home() {
  const [category , setCategory] = useState("All")
  const [search, setSearch] = useState("");
  const [recipes] = useGetRecipes(category, search);
  return (
    <>
      <Navbar />

      <div className="parent-container">
        <div className="home-section">
          <MessagetoUser setSearch={setSearch} />
          <div className="browse-by-category-container">
            <h2>Browse by Category</h2>
            <div className="select-mealType-container">
              <button className={category == "All" ? 'active' : ""} onClick={()=>{setCategory("All")}}>All Recieps</button>
              <button className={category == "Breakfast" ? 'active' : ""} onClick={()=> setCategory("Breakfast")}>Breakfast</button>
              <button className={category == "Lunch" ? 'active' : ""} onClick={()=> setCategory("Lunch")}>Lunch</button>
              <button className={category == "Dinner" ? 'active' : ""} onClick={()=> setCategory("Dinner")}>Dinner</button>
              <button className={category == "Dessert" ? 'active' : ""} onClick={()=> setCategory("Dessert")}>Dessert</button>
              <button className={category == "Vegertarian" ? 'active' : ""} onClick={()=> setCategory("Vegertarian")}>Vegertarian</button>
            </div>
          </div>
          <div className="show-all-recipe-card-container">
            {
              recipes?.map((recipe) =>(

                
                <RecipeCard items = {{ recipeImage :recipe.recipeImage ,recipeTitle: recipe.recipeTitle ,description : recipe.description ,preparationTime : recipe.preparationTime ,difficulty : recipe.difficulty ,id : recipe._id}  }/>
              ))
              }
            {/* <RecipeCard />
            <RecipeCard /> 
            <RecipeCard /> 
            <RecipeCard /> 
            <RecipeCard /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
