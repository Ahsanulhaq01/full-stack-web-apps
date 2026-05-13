import { FiClock } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import Navbar from "../../components/navbar/Navbar";

import "./recipeDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

function RecipeDetails() {
  const [recipe , setRecipe] = useState({});
  const {id} = useParams();

  const getRecipe = async ()=>{
    try {
      const response = await axiosInstance.get(`/recipes/${id}`);
      setRecipe(response.data.data)
      console.log("hello")
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getRecipe();
  } , [])
  return (
    <>
    <Navbar/>
      <section className="reciep-details-page">
        <div className="image-with-recipe-name-container">
          <img src={recipe.recipeImage} alt="" />
          <div className="recipe-name-and-author-container">
            <h1 className="name-of-recipe">
              {recipe.recipeTitle}
            </h1>
            <div className="creating-time-and-serving-container">
              <span className="creation-time">
                <FiClock size={20} />
                <p>{recipe.preparationTime} min</p>
              </span>
              <span className="serving-container">
                <FiUsers size={20} />
                <p> {recipe.servings} Servings</p>
              </span>
            </div>
            <div className="author-container">
                <p>Recipe By</p>
                <p>ahsanulhaq</p>
            </div>
            <button className="save-recipe">Save Recipe</button>
          </div>
        </div>



        <div className="instruction-and-ingrediant-container">
            <div className="ingrediant-container">
                <div className="ingrediant-heading-and-counts">
                    <h2 className="ingrediant-heading">Ingrediant</h2>
                    <p>{recipe.ingrediant?.length} items</p>
                </div>
                <div className="ingrediant-list-container">
                    {recipe.ingrediant?.map((item)=>(
                      <p>{item}</p>
                    ))}
                </div>
            </div>

            <div className="instruction-container">
                <h2 className="instruction-heading">Instruction</h2>
                <div className="instruction-list-container">
                   {recipe.preparationStep?.map((item , index)=>(
                      <div className="single-instruction-and-serialNo">
                        <p>{index+1}</p>
                        <p>{item}</p>
                    </div>
                   )) }
                    
                </div>
            </div>
        </div>
      </section>
    </>
  );
}

export default RecipeDetails;
