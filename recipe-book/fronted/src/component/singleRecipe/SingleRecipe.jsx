import React, { useEffect, useState } from 'react'
import './singleRecipe.css'
import Navbar from '../../navbar/Navbar'
import { useParams } from 'react-router';
import axios from 'axios';
import { Navigate } from 'react-router';
import { axiosInstance } from '../../utils/axiosInstance';

function SingleRecipe() {
    const [recipe ,setRecipe] = useState({ instructions : [] , ingredients : []});
    const [isAuth , setIsAuth] = useState(null);
    const {id} = useParams();

    useEffect(()=>{
        const getRecipes = async()=>{
            try {
                await axiosInstance.get('/check-auth');
                setIsAuth(true);
                const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
                setRecipe(response.data);
            } catch (err) {
                setIsAuth(false);
                console.log(err)
            }
        }
        getRecipes();
    },[id])

    if(!isAuth)return <Navigate to={"/login"}/>
  
  return (
    <>
    <Navbar/>
    <div className="recipe-container">
                    <div className="image-side-container">
            <p className="name-of-recipe">{recipe.name}</p>
            <div className="image-and-attributes">
                <img src={recipe.image} alt="recipe-image" />
                <div className="attributes">
                    <p className="serving-para">Serving : {recipe.servings}</p>
                    <p className="difficulty-level">Difficulty : {recipe.difficulty}</p>
                    <p className="cuisine-identity">Cuisine : {recipe.cuisine}</p>
                </div>
            </div>
            <div className="rating-review-and-caloriesCount">
                <div className="rating-review">
                    <p id="review">review : {recipe.reviewCount}</p>
                    <p id="rating">rating : {recipe.rating}</p>
                </div>
                <p className="calories-count">Calories-Count : {recipe.caloriesPerServing}</p>
            </div>
        </div>
        <div className="ingrediant-instruction-container">
                <div className="prep-and-cook-time">
                    <p className="prep-time">Preparatng-Time : {recipe.prepTimeMinutes} Min</p>
                    <p className="cook-time">Cooking-Time : {recipe.cookTimeMinutes} Min</p>
                </div>
                    <p className="ingrediant">Ingrediant :
                        {recipe.ingredients?.map((item ,idx)=>{
                            return(
                                <li key={idx}>{item}</li>
                            )
                        })}
                        </p>                    
                <p className="instruction">Instructions :
                        {recipe.instructions?.map((item , idx)=>{
                            return(
                                <li key={idx}>{item}</li>
                            )
                        })}
                </p>
        </div>
        
    </div>
    </>
  )
}

export default SingleRecipe