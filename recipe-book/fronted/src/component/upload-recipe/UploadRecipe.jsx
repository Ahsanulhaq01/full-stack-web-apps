import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../utils/axiosInstance.js";
import "./upload-recipe.css";
import { toast } from "react-toastify";
import Navbar from "../../navbar/Navbar.jsx";
import { useLocation, useNavigate } from "react-router";

function UploadRecipe() {
  const location = useLocation();
  const navigate = useNavigate();
  const isUpdateMode = location.state?.isUpdate || false;
  const recipeData = location.state?.recipe || {};

  const [itemData, setItemData] = useState({
    recipeName: recipeData.recipeName || "",
    instructions: recipeData.instructions?.join(", ") || "",
    ingredients: recipeData.ingredients?.join(", ") || "",
    servings: recipeData.servings || "",
    difficulty: recipeData.difficulty || "",
    calories: recipeData.calories || "",
    caloriesPerServing: recipeData.caloriesPerServing || "",
    tags: recipeData.tags?.join(", ") || "",
    mealType: recipeData.mealType || "",
    cuisine: recipeData.cuisine || "",
    preparationTime: recipeData.preparationTime || "",
    cookingTime: recipeData.cookingTime || "",
    recipeImage: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (itemData.previewImage) URL.revokeObjectURL(itemData.previewImage);
    setItemData((prev) => ({
      ...prev,
      recipeImage: file,
      previewImage: URL.createObjectURL(file),
    }));
  };

  useEffect(() => {
    return () => {
      if (itemData.previewImage) URL.revokeObjectURL(itemData.previewImage);
    };
  }, [itemData.previewImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createFormData = () => {
    const formData = new FormData();

    const instructionsArray = (itemData.instructions || "")
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);
    const ingredientsArray = itemData.ingredients
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    formData.append("recipeName", itemData.recipeName);
    formData.append("instructions", JSON.stringify(instructionsArray));
    formData.append("ingredients", JSON.stringify(ingredientsArray));
    formData.append("servings", itemData.servings);
    formData.append("difficulty", itemData.difficulty);
    formData.append("calories", itemData.calories);
    formData.append("caloriesPerServing", itemData.caloriesPerServing);
    formData.append("tags", itemData.tags);
    formData.append("mealType", itemData.mealType);
    formData.append("cuisine", itemData.cuisine);
    formData.append("preparationTime", itemData.preparationTime);
    formData.append("cookingTime", itemData.cookingTime);
    if (itemData.recipeImage) {
      formData.append("recipeImage", itemData.recipeImage);
    }

    return formData;
  };

  const createRecipe = async () => {
    const formData = createFormData();
    try {
      const response = await axiosInstance.post(
        "/recipe/upload-recipe",
        formData,
        {withCredentials : true}
      );
      toast.success(response.data.message || "Recipe Uploaded Successfully" , {position : "bottom-right"});
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      toast.error(error?.response?.data?.message || "upload-failed" , {position : "bottom-right"});
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();


    if(isUpdateMode){
      updateRecipe();
    }
    else{
      createRecipe();
    }
  };

  const updateRecipe = async () => {

    const formData = createFormData();
    try {

      const response = await axiosInstance.put(
        `/recipe/recipe/${recipeData._id}`,
        formData,
      );
      toast.success(response.data.message , {position : "bottom-right"});
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed" , {position : "bottom-right"});
    }
  };

  return (
    <>
      <Navbar />
      <div className="upload-recipe-container">
        <div className="upload-recipe">
          <form onSubmit={handleSubmit}>
            {/* input feild for recipe-name */}
            <div className="feild-for-recipe-name">
              <label htmlFor="recipe-name">Enter Your Recipe Name </label>
              <input
                type="text"
                placeholder="Enter Your Recipe Name : "
                id="recipe-name"
                onChange={handleChange}
                value={itemData.recipeName}
                name="recipeName"
              />
            </div>

            {/* input feild for recipe-Instruction */}

            <div className="feild-for-recipe-instruction">
              <label htmlFor="recipe-instruction">Instruction </label>
              <input
                type="text"
                placeholder="Enter Instruction separated by comma"
                onChange={handleChange}
                value={itemData.instructions}
                id="recipe-instruction"
                name="instructions"
              />
            </div>

            {/* input feild for recipe-ingrediants */}
            <div className="feild-for-recipe-ingrediant">
              <label htmlFor="recipe-ingrediant">Ingrediants </label>
              <input
                type="text"
                placeholder="Enter ingrediant separated by comma"
                onChange={handleChange}
                value={itemData.ingredients}
                id="recipe-ingrediant"
                name="ingredients"
              />
            </div>

            {/* input feild for recipe-serving */}
            <div className="feild-for-recipe-serving">
              <label htmlFor="recipe-serving">Serving </label>
              <input
                type="number"
                placeholder="Enter the quantity of serving"
                onChange={handleChange}
                value={itemData.servings}
                id="recipe-serving"
                name="servings"
              />
            </div>

            {/* input feild for recipe-difficulty */}
            <div className="feild-for-recipe-difficulty">
              <label htmlFor="recipe-difficulty-level">
                Select the difficulty level
              </label>
              <select
                name="difficulty"
                id="recipe-difficulty-level"
                onChange={handleChange}
                value={itemData.difficulty}
              >
                <option value="">Select difficulty level</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <span className="selected-level">{itemData.difficulty}</span>
            </div>

            {/* input feild for cuisine */}
            <div className="feild-for-cuisine">
              <label htmlFor="cuisine">Enter the Cuisine</label>
              <input
                type="text"
                placeholder="Enter the Cuisine"
                value={itemData.cuisine}
                onChange={handleChange}
                id="cuisine"
                name="cuisine"
              />
            </div>
            {/* input feild for preparationTime */}
            <div className="feild-for-preparationTime">
              <label htmlFor="cuisine">Enter the PreparationTime</label>
              <input
                type="number"
                placeholder="Enter the PreparationTime"
                value={itemData.preparationTime}
                onChange={handleChange}
                id="preparationTime"
                name="preparationTime"
              />
            </div>

            {/* input feild for CookingTime */}
            <div className="feild-for-CookingTime">
              <label htmlFor="cuisine">Enter the Cooking Time</label>
              <input
                type="number"
                placeholder="Enter the CookingTime"
                value={itemData.cookingTime}
                onChange={handleChange}
                id="cookingTime"
                name="cookingTime"
              />
            </div>
            {/* input feild for recipe-calories */}
            <div className="feild-for-recipe-calories">
              <label htmlFor="recipe-calories">
                Enter the amount of Calories
              </label>
              <input
                type="number"
                placeholder="Enter the amout of calories"
                onChange={handleChange}
                value={itemData.calories}
                id="recipe-calories"
                name="calories"
              />
            </div>

            {/* input feild for recipe-perserving */}
            <div className="feild-for-recipe-perserving">
              <label htmlFor="recipe-perServing">
                Enter the amount of PerServing
              </label>
              <input
                type="number"
                placeholder="Enter the amout of perserving"
                onChange={handleChange}
                value={itemData.caloriesPerServing}
                id="recipe-perServing"
                name="caloriesPerServing"
              />
            </div>
            {/* input feild for recipe-tags */}
            <div className="feild-for-recipe-tags">
              <label htmlFor="recipe-tags">Enter the tags </label>
              <input
                type="text"
                placeholder="Enter the tags  separated by comma"
                onChange={handleChange}
                value={itemData.tags}
                name="tags"
                id="recipe-tags"
              />
            </div>

            {/* input feild for recipe-mealType */}
            <div className="feild-for-recipe-mealtype">
              <label htmlFor="recipe-mealtype">Select the MealType </label>
              <select
                name="mealType"
                id="recipe-mealtype"
                onChange={handleChange}
                value={itemData.mealType}
              >
                <option value="">select the mealType</option>
                <option value="Dinner">Dinner</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Lunch/Dinner">Lunch/Dinner</option>
                <option value="Snack">Snack</option>
              </select>
              <span className="selected-mealtype">{itemData.mealType}</span>
            </div>

            {/* input feild for recipe-image */}
            <div className="feild-for-recipe-image">
              <label htmlFor="recipe-image">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                id="recipe-image"
                name="recipeImage"
                onChange={handleImageChange}
              />
            </div>

            {itemData.previewImage && (
              <img
                src={itemData.previewImage}
                alt="Preview"
                width="200"
                className="preview-image"
              />
            )}
            <button type="submit" className="submit-button">
              {isUpdateMode ? "Update Recipe" : "Upload Recipe"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default UploadRecipe;
