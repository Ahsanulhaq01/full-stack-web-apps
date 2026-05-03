import Navbar from "../../components/navbar/Navbar"
import RecipeCard from "../../components/recipeCard/RecipeCard"

import './home.css'
function Home() {
  return (
    <>
   <Navbar/>
    
   <div className="parent-container">
   <div className="home-section">
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
                <RecipeCard/>
                    <RecipeCard/>
                        <RecipeCard/>    <RecipeCard/>    <RecipeCard/>    <RecipeCard/>
                        
        </div>

   </div>
   </div>

</>
  )
}

export default Home