import React, { useState } from "react";
import "./upload-recipe.css";

function UploadRecipe() {
  const [itemData, setItemData] = useState({
    recipeName: "",
    instructions: "",
    ingredients: "",
    serving: "",
    difficulty: "",
    calories: "",
    perServing: "",
    tags: "",
    mealType: "",
    recipeImage: null,
    previewImage: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(!file)return;

    setItemData(prev =>({
        ...prev,
        recipeImage : file,
        previewImage : URL.createObjectURL(file)
    }))
  };

  const handleChange = (e)=>{
    const {name , value} = e.target;
    setItemData(prev => ({
        ...prev,
        [name] : value
    }));
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const formData = new FormData();

    formData.append("recipeName" , itemData.recipeName)
  }
  return (
    <>
      <div className="upload-recipe-container">
        <div className="upload-recipe">
          <form onSubmit={handleSubmit}>
            {/* input feild for recipe-name */}
            <label htmlFor="recipe-name">Enter Your Recipe Name : </label>
            <input
              type="text"
              placeholder="Enter Your Recipe Name : "
              id="recipe-name"
              onChange={handleChange}
              value={itemData.recipeName}
              name="recipeName"
            />

            {/* input feild for recipe-Instruction */}

            <label htmlFor="recipe-instruction">Instruction : </label>
            <input
              type="text"
              placeholder="Enter Instruction separated by comma"
              onChange={handleChange}
              value={itemData.instructions}
              id="recipe-instruction"
              name="instructions"
            />

            {/* input feild for recipe-ingrediants */}
            <label htmlFor="recipe-ingrediant">Ingrediants : </label>
            <input
              type="text"
              placeholder="Enter ingrediant separated by comma"
              onChange={handleChange}
              value={itemData.ingredients}
              id="recipe-ingrediant"
              name="ingredients"
            />

            {/* input feild for recipe-serving */}
            <label htmlFor="recipe-serving">Serving : </label>
            <input
              type="number"
              placeholder="Enter the quantity of serving"
              onChange={handleChange}
              value={itemData.serving}
              id="recipe-serving"
              name="serving"
            />

            {/* input feild for recipe-difficulty */}

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

            {/* input feild for recipe-calories */}
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

            {/* input feild for recipe-perserving */}
            <label htmlFor="recipe-perServing">
              Enter the amount of PerServing
            </label>
            <input
              type="number"
              placeholder="Enter the amout of perserving"
              onChange={handleChange}
              value={itemData.perServing}
              id="recipe-perServing"
              name="perServing"
            />

            {/* input feild for recipe-tags */}
            <label htmlFor="recipe-tags">Enter the tags </label>
            <input
              type="text"
              placeholder="Enter the tags  separated by comma"
              onChange={handleChange}
              value={itemData.tags}
              name="tags"
              id="recipe-tags"
            />

            {/* input feild for recipe-mealType */}
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
            </select>
            <span className="selected-mealtype">{itemData.mealType}</span>

            {/* input feild for recipe-image */}
            <label htmlFor="recipe-image">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              id="recipe-image"
              onChange={handleImageChange}
              
            />

            {itemData.previewImage && (
              <img src={itemData.previewImage} alt="Preview" width="200" />
            )}
          </form>
        </div>
      </div>
    </>
  );
}
export default UploadRecipe;
