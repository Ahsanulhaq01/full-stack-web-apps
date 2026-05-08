
import { FiClock } from "react-icons/fi";
import { FaUtensils } from "react-icons/fa";
import Grilled_AtlanticImg from '../../assets/images/grilled-atlantic-salmon.png'
import './recipecard.css'

function RecipeCard() {
  return (
    <>
        <div className="recipe-card-container">
            <img src={Grilled_AtlanticImg} width={100} alt="recipe-img" />
            <div className="recipe-card-text-container">

            
            <h2 className='name-of-recipe'>Grilled Atlantic Salmon</h2>
            <p className="short-description-of-recipe">
                 Perfectly seasoned salmon with organic avocado and fresh citrus zest. 
            </p>
            <div className="difficulty-and-cooking-time-container">
                <span className="cooking-time-container">
                    <FiClock/>
                    <p className="cooking-time">25 min</p>
                </span>
                <span className="difficulty-container">
                <FaUtensils />
                <p className="difficulty-para">Intermediate</p>
                </span>
            </div>
            <button className="view-more-btn">View Recipe</button>
            </div>
        </div>
    </>
  )
}

export default RecipeCard