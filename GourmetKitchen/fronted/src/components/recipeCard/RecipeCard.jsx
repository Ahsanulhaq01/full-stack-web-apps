
import { FiClock } from "react-icons/fi";
import { FaUtensils } from "react-icons/fa";
import './recipecard.css'
import { useNavigate } from "react-router-dom";

function RecipeCard({items}) {
    const navigate =useNavigate();
  return (
    <>
        <div className="recipe-card-container">
            <img src={items?.recipeImage} width={100} alt="recipe-img" />
            <div className="recipe-card-text-container">

            
            <h2 className='name-of-recipe'>{items?.recipeTitle}</h2>
            <p className="short-description-of-recipe">
                {items?.description}
            </p>
            <div className="difficulty-and-cooking-time-container">
                <span className="cooking-time-container">
                    <FiClock/>
                    <p className="cooking-time">{items?.preparationTime} min</p>
                </span>
                <span className="difficulty-container">
                <FaUtensils />
                <p className="difficulty-para">{items?.difficulty}</p>
                </span>
            </div>
            <button className="view-more-btn" onClick={()=>{
                navigate(`/${items?.id}`)
            }}>View Recipe</button>
            </div>
        </div>
    </>
  )
}

export default RecipeCard