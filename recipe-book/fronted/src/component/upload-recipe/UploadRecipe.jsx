import React, { useState } from 'react'
import './upload-recipe.css'

function UploadRecipe() {
    const [recipeName , setRecipeName] = useState("");
    const [instructionInput , setInstructionInput] = useState("");
    const [instructionArray , setInstructionArray] = useState([]);
    const [ingrediantInput , setIngrediantInput] = useState("");
    const [ingrediantArray , setIngrediantArray] = useState([]);
    const [serving , setServing] = useState();
    const [difficulty , setDifficulty] = useState();
    const [calories , setCalories] = useState();
    const [perServing , setPerServing] = useState();
    const [tag , setTag] = useState("");
    const [tagArray , setTagArray] = useState([]);
    const [mealType , setMealType] = useState();
    const [recipeImage , setRecipeImage] = useState();
    const [recipePreviewImage , setRecipePreviewImage] = useState();

    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        setRecipeImage(file);
        setRecipePreviewImage(URL.createObjectURL(file))
    }
  return (
    <>
    <div className="upload-recipe-container">
        <div className="upload-recipe">
            <form>
                {/* input feild for recipe-name */}
                <label htmlFor="recipe-name">Enter Your Recipe Name : </label>
                <input type="text" placeholder='Enter Your Recipe Name : ' id='recipe-name' onChange={ e=>
                setRecipeName(e.target.value)} value={recipeName}/>

                {/* input feild for recipe-Instruction */}

                <label htmlFor="recipe-instruction">Instruction : </label>
                <input type="text" placeholder='Enter Instruction separated by comma' onChange={e=> setInstructionInput(e.target.value)} value={instructionInput} id='recipe-instruction'/>

                {/* input feild for recipe-ingrediants */}
                <label htmlFor="recipe-ingrediant">Ingrediants : </label>
                <input type="text" placeholder='Enter ingrediant separated by comma' onChange={e=> setIngrediantInput(e.target.value)} value={ingrediantInput} id='recipe-ingrediant'/>

                {/* input feild for recipe-serving */}
                <label htmlFor="recipe-serving">Serving : </label>
                <input type="number" placeholder='Enter the quantity of serving' onChange={e=> setServing(Number(e.target.value))} value={serving} id='recipe-serving' />

                {/* input feild for recipe-difficulty */}

                <label htmlFor="recipe-difficulty-level">Select the difficulty level</label>
                <select name="recipe-difficulty" id="recipe-difficulty-level"
                onChange={e => setDifficulty(e.target.value)}
                value={difficulty}
                >
                    <option value="">Select difficulty level</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <span className="selected-level">{difficulty}</span>

                {/* input feild for recipe-calories */}
                <label htmlFor="recipe-calories">Enter the amount of Calories</label>
                <input type="number" placeholder='Enter the amout of calories' onChange={e => setCalories(e.target.value)} value={calories} id='recipe-calories'/>

                {/* input feild for recipe-perserving */}
                <label htmlFor="recipe-perServing">Enter the amount of PerServing</label>
                <input type="number" placeholder='Enter the amout of perserving' onChange={e => setPerServing(e.target.value)} value={perServing} id='recipe-perServing'/>

                {/* input feild for recipe-tags */}
                <label htmlFor="recipe-tags">Enter the tags </label>
                <input type="text" placeholder='Enter the tags  separated by comma' onChange={e => setTag(e.target.value)} value={tag} id='recipe-tags'/>

                {/* input feild for recipe-mealType */}
                <label htmlFor="recipe-mealtype">Select the MealType </label>
                <select name="mealtype" id="recipe-mealtype"
                onChange={e => setMealType(e.target.value)}
                value={mealType}
                >
                    <option value="">select the mealType</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>

                </select>
                <span className='selected-mealtype'>{mealType}</span>
                
                {/* input feild for recipe-mealType */}
                    <label htmlFor="recipe-image">Upload Image</label>
                    <input type="file" accept='image/*' id='recipe-image' onChange={handleImageChange} />

                    {recipePreviewImage && <img src={recipePreviewImage} alt="Preview" width="200" />}
            </form>
        </div>
    </div>
    </>
  )
}
export default UploadRecipe