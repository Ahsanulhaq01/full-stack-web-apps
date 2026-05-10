import MessagetoUser from "../../components/homepageComponents/MessagetoUser";
import Navbar from "../../components/navbar/Navbar";
import RecipeCard from "../../components/recipeCard/RecipeCard";
import useGetRecipes from "../../customHook/useGetRecipes";
import "./home.css";
function Home() {
  const [recipes] = useGetRecipes([]);
  return (
    <>
      <Navbar />

      <div className="parent-container">
        <div className="home-section">
          <MessagetoUser />
          <div className="browse-by-category-container">
            <h2>Browse by Category</h2>
            <div className="select-mealType-container">
              <button className="active">All Recieps</button>
              <button>Breakfast</button>
              <button>Lunch</button>
              <button>Dinner</button>
              <button>Dessert</button>
              <button>Vegertarian</button>
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
