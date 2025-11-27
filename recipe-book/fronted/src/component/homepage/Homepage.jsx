import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './homepage.css'
import Navbar from '../../navbar/Navbar';

function Homepage() {
  const [recipe , setRecipe] = useState([]);

  useEffect(()=>{
    const getRecipe = async()=>{
      const response = await axios.get('https://dummyjson.com/recipes');
      setRecipe(response.data.recipes);
      console.log(response.recipes);
    }
    getRecipe();

  },[])
  return (
    <>
      <Navbar/>
      <div className="recipes-container">
        {recipe.map((item)=>{
      return (
        <div className="recipe-box1" key={item.id}>
          <div className="image-container">
            <p className="meal-type">{item.mealType[0]}</p>
            <img src={item.image} alt="recipe-image" />
          </div>
          <div className="details-container">
            <p className="recipe-name">{item.name}</p>
            <div className="rating-review-container">
              <p className="review">{`reviewCount : ${item.reviewCount}`} </p>
              <p className="rating">{`rating : ${item.rating}`}</p>
            </div>
            <button className="view-more-btn">view more</button>
          </div>
        </div>
      )
    })}
      </div>
    </>
  )
}

export default Homepage