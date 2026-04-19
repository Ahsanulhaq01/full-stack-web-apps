/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../utils/axiosInstance'
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import './../homepage/homepage.css'
import Navbar from '../../navbar/Navbar';

function MyRecipes() {
    const [myRecipe , setMyRecipe] = useState();
    const getMyRecipe = async()=>{
        try {
            const response = await axiosInstance.get(`/recipe/myrecipes`);
            setMyRecipe(response.data.data)
            toast.success(response.data.message || "My self created recipes are fetched successfully" , {
              position : "bottom-right"
            })
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error while fetching my own recipes" , {
              position : "bottom-right"
            })
        }
    }

    useEffect(()=>{
        getMyRecipe();
    },[])
  return (
    <>
        <Navbar/>
       <div className="recipes-container">
        {myRecipe?.map((item) => {
          return (
            <div className="recipe-box1" key={item._id}>
              <div className="image-container">
                <p className="meal-type">{item.mealType[0]}</p>
                <img src={`${item.recipeImage}`} alt="recipe-image" />
              </div>
              <div className="details-container">
                <p className="recipe-name">{item.recipeName}</p>
                {/* <div className="rating-review-container">
                  <p className="review">
                    {`reviewCount : ${item.reviews}`}{" "}
                  </p>
                  <p className="rating">{`rating : ${item.rating}`}</p>
                </div> */}
                <Link to={`/recipe/${item._id}`} target="blank">
                  <button className="view-more-btn">view more</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default MyRecipes