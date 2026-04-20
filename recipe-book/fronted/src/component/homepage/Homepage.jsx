import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import "./homepage.css";
import Navbar from "../../navbar/Navbar";
import { Link } from "react-router";
import { AuthContext } from "../../context/AthContext";
import { toast } from "react-toastify";

function Homepage() {
  const [recipe, setRecipe] = useState([]);
  const {user} = useContext(AuthContext)


  const handleReaction = async (id ,type) => {
  try {
    const response =  await axiosInstance.post(`/recipe/recipe/${id}/react`, 
      { action: type, },
      { withCredentials: true }
    );
      toast.success(response?.data?.message , {
        position : "bottom-right"
      })
    getRecipe();
  } catch (err) {
    toast.error(err?.response?.data?.message , {
      position :"bottom-right"
    })
  }
};

  const getRecipe = async () => {
      const response = await axiosInstance.get("/recipe/recipes",);
      setRecipe(response.data);
    };

  const isLiked = recipe?.likes?.includes(user?._id);
  const isDisliked = recipe?.dislikes?.includes(user?._id);
  useEffect(() => {
    getRecipe();
  }, []);
  return (
    <>
      <Navbar />
      <div className="recipes-container">
        {recipe.map((item) => {
          return (
            <div className="recipe-box1" key={item._id}>
              <div className="image-container">
                <p className="meal-type">{item.mealType[0]}</p>
                <img
                  src={`${item.recipeImage}`}
                  alt="recipe-image"
                />
              </div>
              <div className="details-container">
                <p className="recipe-name">{item.recipeName}</p>
                <div className="like-dislike-emoji-container">
                  <button
                    style={{ color: isLiked ? "green" : "black" }}
                    className="emoji-btn"
                    onClick={() => handleReaction(item._id , "like")}
                  >
                    Likes 👍 : {item?.likes?.length}
                  </button>

                  <button
                    style={{ color: isDisliked ? "red" : "black" }}
                    className="emoji-btn"
                    onClick={() => handleReaction(item._id , "dislike")}
                  >
                    Dislikes👎 : {item?.dislikes?.length}
                  </button>
                </div>
                <Link to={`/recipe/${item._id}`} target="blank">
                  <button className="view-more-btn">view more</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Homepage;
