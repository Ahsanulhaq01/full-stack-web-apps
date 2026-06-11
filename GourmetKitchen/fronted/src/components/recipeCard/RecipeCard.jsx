
import { FiClock, FiBookmark } from "react-icons/fi";
import { FaUtensils, FaBookmark } from "react-icons/fa";
import './recipecard.css'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import useCheckAuth from "../../customHook/useCheckAuth";

function RecipeCard({items}) {
    const navigate = useNavigate();
    const [isAuth] = useCheckAuth(null);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (isAuth && items?.id) {
            const checkStatus = async () => {
                try {
                    const response = await axiosInstance.get(`/save-status/${items.id}`);
                    setIsSaved(response.data.data);
                } catch (error) {
                    console.log(error);
                }
            };
            checkStatus();
        }
    }, [isAuth, items?.id]);

    const handleToggleSave = async (e) => {
        e.stopPropagation(); // Prevent navigating to details
        if (!isAuth) {
            toast.info("Please login to save recipes");
            navigate("/login");
            return;
        }

        try {
            const response = await axiosInstance.post(`/toggle-save/${items.id}`);
            setIsSaved(!isSaved);
            toast.success(response.data.message);
        } catch (error) {
            toast.error("Failed to update save status");
        }
    };

  return (
    <>
        <div className="recipe-card-container" onClick={() => navigate(`/recipe-details/${items?.id}`)}>
            <div className="recipe-image-wrapper">
                <img src={items?.recipeImage} alt="recipe-img" />
                <div className="save-icon-wrapper" onClick={handleToggleSave}>
                    {isSaved ? <FaBookmark className="saved" /> : <FiBookmark />}
                </div>
            </div>
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
            <button className="view-more-btn">View Recipe</button>
            </div>
        </div>
    </>
  )
}

export default RecipeCard