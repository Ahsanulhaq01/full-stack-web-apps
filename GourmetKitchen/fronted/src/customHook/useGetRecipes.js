import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function useGetRecipes(intialValue){
    const [recipes , setRecipes] = useState(intialValue);

    async function getRecipes() {
        const response = await axiosInstance.get('/recipes');
        setRecipes(response.data.data)
    }

    useEffect(()=>{
        getRecipes();
    } , [])

    return [recipes];
}

