import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import RecipeCard from "../../components/recipeCard/RecipeCard";
import axiosInstance from "../../utils/axiosInstance";
import "./savedRecipes.css";
import { FiBookmark } from "react-icons/fi";

function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axiosInstance.get("/saved-recipes");
        setSavedRecipes(response.data.data);
      } catch (error) {
        console.log("Error fetching saved recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <>
      <Navbar />
      <section className="saved-recipes-page">
        <div className="saved-recipes-container">
          <div className="saved-recipes-header">
            <h1><FiBookmark /> Your Saved Collection</h1>
            <p>Your personal sanctuary of culinary inspiration.</p>
          </div>

          {loading ? (
            <div className="loading-state">Loading your collection...</div>
          ) : savedRecipes.length > 0 ? (
            <div className="recipes-grid">
              {savedRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  items={{
                    recipeImage: recipe.recipeImage,
                    recipeTitle: recipe.recipeTitle,
                    description: recipe.description,
                    preparationTime: recipe.preparationTime,
                    difficulty: recipe.difficulty,
                    id: recipe._id,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <FiBookmark size={50} />
              <h3>No saved recipes yet</h3>
              <p>Explore our collection and save your favorite recipes to see them here.</p>
              <button onClick={() => window.location.href = '/'}>Discover Recipes</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default SavedRecipes;
