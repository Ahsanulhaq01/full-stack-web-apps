import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function useGetRecipes(category){
    const [recipes , setRecipes] = useState(null);
    
    

    useEffect(()=>{
        async function getRecipes() {
        const url = category == 'All' ? '/recipes/recipes' : `/recipes/recipes?category=${category}`
        const response = await axiosInstance.get(url);
        setRecipes(response.data.data)
    }
        getRecipes();
    } , [category])

    return [recipes];
}

