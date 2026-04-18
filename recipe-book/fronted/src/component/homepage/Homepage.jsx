import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
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
      toast.success(response?.data?.message)
    getRecipe();
  } catch (err) {
    toast.error(err?.response?.data?.message)
  }
};

  const getRecipe = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/recipe/recipes",
      );
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
                <div className="rating-review-container">
                  {/* <p className="review">
                    {`reviewCount : ${item.reviews}`}{" "}
                  </p>
                  <p className="rating">{`rating : ${item.rating}`}</p> */}

                  <button
                    style={{ color: isLiked ? "green" : "black" }}
                    onClick={() => handleReaction(item._id , "like")}
                  >
                    👍 {item?.likes?.length}
                  </button>

                  <button
                    style={{ color: isDisliked ? "red" : "black" }}
                    onClick={() => handleReaction(item._id , "dislike")}
                  >
                    👎 {item?.dislikes?.length}
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
