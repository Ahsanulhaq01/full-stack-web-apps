import React from 'react'
import './singleRecipe.css'

function SingleRecipe() {
  return (
    <>
    <div className="recipe-container">
        <div className="image-side-container">
            <p className="name-of-recipe">name of recipe</p>
            <div className="image-and-attributes">
                <img src="/images/1.webp" alt="recipe-image" />
                <div className="attributes">
                    <p className="serving-para">serving : 4</p>
                    <p className="difficulty-level">Difficulty : hard</p>
                    <p className="cuisine-identity">Cuisine : pizza</p>
                </div>
            </div>
            <div className="rating-review-and-caloriesCount">
                <div className="rating-review">
                    <p id="review">review : 34</p>
                    <p id="rating">rating : 4.5</p>

                </div>
                <p className="calories-count">Calories-Count : 500</p>
            </div>
        </div>
        <div className="ingrediant-instruction-container">
                <div className="prep-and-cook-time">
                    <p className="prep-time">preparatng-Time : 30min</p>
                    <p className="cook-time">Cooking-Time : 10min</p>
                </div>
                <p className="ingrediant">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, minima!</p>
                <p className="instruction">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit suscipit voluptatibus error!</p>
        </div>
    </div>
    </>
  )
}

export default SingleRecipe