import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function useGetRecipes(category, search){
    const [recipes , setRecipes] = useState(null);
    
    

    useEffect(()=>{
        async function getRecipes() {
            let url = '/recipes/recipes?';
            const params = new URLSearchParams();
            if (category && category !== 'All') params.append('category', category);
            if (search) params.append('search', search);

            const response = await axiosInstance.get(url + params.toString());
            setRecipes(response.data.data)
        }
        getRecipes();
    } , [category, search])

    return [recipes];
}

