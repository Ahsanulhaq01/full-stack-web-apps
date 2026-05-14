import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function useGetRecipes(intialValue){
    const [recipes , setRecipes] = useState(intialValue);

    

    useEffect(()=>{
        async function getRecipes() {
        const response = await axiosInstance.get('/recipes/recipes');
        setRecipes(response.data.data)
    }
        getRecipes();
    } , [])

    return [recipes];
}

