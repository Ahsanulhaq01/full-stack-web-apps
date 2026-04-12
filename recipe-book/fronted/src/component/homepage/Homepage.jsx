import React, { useEffect, useState } from "react";
import axios from "axios";
import "./homepage.css";
import Navbar from "../../navbar/Navbar";
import { Link } from "react-router";

function Homepage() {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const getRecipe = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/recipe/recipes");
      setRecipe(response.data);
    };
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
                <img src={`http://localhost:3000/${item.recipeImage}`} alt="recipe-image" />
              </div>
              <div className="details-container">
                <p className="recipe-name">{item.recipeName}</p>
                <div className="rating-review-container">
                  <p className="review">
                    {`reviewCount : ${item.reviews}`}{" "}
                  </p>
                  <p className="rating">{`rating : ${item.rating}`}</p>
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
