import React, { useEffect, useState } from "react";
import "./singleRecipe.css";
import Navbar from "../../navbar/Navbar";
import { useParams } from "react-router";
import { Navigate } from "react-router";
import { axiosInstance } from "../../utils/axiosInstance";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

function SingleRecipe() {
  const [recipe, setRecipe] = useState({ instructions: [], ingredients: [] });
  const [isAuth, setIsAuth] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();


  const getRecipes = async () => {
      try {
        await axiosInstance.get("/user/check-auth", { withCredentials: true });
        setIsAuth(true);
        const response = await axiosInstance.get(
          `/recipe/recipe/${id}`,
        );
        setRecipe(response.data.data);
        
      } catch {
        setIsAuth(false);
      }
    };

    useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getRecipes();
    },[id])

  if (isAuth === false) return <Navigate to={"/login"} />;

  async function deleteRecipe(){
    const result = await Swal.fire({
      title : "Are you sure?",
      text : "this will delete the recipe",
      icon : "warning",
      showCancelButton : true,
      confirmButtonText : "Yes,  delete it"
    })

    if(result.isConfirmed){
      try {
        const response = await axiosInstance.delete(`/recipe/recipe/${recipe._id}`)
        Swal.fire("Deleted!" , response.data.message , "success")
        navigate('/')
        setIsAuth(true)
        
      } catch (err) {
        Swal.fire("Error" ,err.message || "something went wrong" ,"error")
      }
    }
  }

  async function updateRecipe(){
   navigate("/upload-recipe", {
      state: {
        recipe,
        isUpdate: true,
      },
    });
  }

  return (
    <>
      <Navbar />
      <div className="recipe-container">
        <div className="image-side-container">
          <p className="name-of-recipe">{recipe.recipeName}</p>
          <div className="image-and-attributes">
            <img
              src={`http://localhost:3000/${recipe.recipeImage}`}
              alt="recipe-image"
            />
            <div className="attributes">
              <p className="serving-para">Serving : {recipe.servings}</p>
              <p className="difficulty-level">
                Difficulty : {recipe.difficulty}
              </p>
              <p className="cuisine-identity">Cuisine : {recipe.cuisine}</p>
            </div>
          </div>
          <div className="rating-review-and-caloriesCount">
            <div className="rating-review">
              <p id="review">review : {recipe.reviews}</p>
              <p id="rating">rating : {recipe.rating}</p>
            </div>
            <div className="calories-count-and-delete-button">
              <p className="calories-count">
                Calories-Count : {recipe.calories}
              </p>
              <button className="delete-recipe del-and-upt-btn" onClick={deleteRecipe}>Delete Recipe</button>
              <button className="update-recipe del-and-upt-btn" onClick={updateRecipe}>Update Recipe</button>
            </div>
          </div>
        </div>
        <div className="ingrediant-instruction-container">
          <div className="prep-and-cook-time">
            <p className="prep-time">
              Preparatng-Time : {recipe.preparationTime} Min
            </p>
            <p className="cook-time">Cooking-Time : {recipe.cookingTime} Min</p>
          </div>
          <p className="ingrediant">
            Ingrediant :
            {recipe.ingredients?.map((item, idx) => {
              return <li key={idx}>{item}</li>;
            })}
          </p>
          <p className="instruction">
            Instructions :
            {recipe.instructions?.map((item, idx) => {
              return <li key={idx}>{item}</li>;
            })}
          </p>
        </div>
      </div>
    </>
  );
}

export default SingleRecipe;
