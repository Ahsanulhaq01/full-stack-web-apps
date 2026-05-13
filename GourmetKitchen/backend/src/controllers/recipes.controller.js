import { Recipe } from "../models/recipes.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from '../utils/apiError.js'

const createRecipe = asyncHandler(async (req, res) => {
    const { recipeTitle, description, preparationTime, difficulty, category, servings } = req.body;
    
    const ingrediant = JSON.parse(req.body.ingrediant)
    const preparationStep = JSON.parse(req.body.preparationStep)
    if (!(recipeTitle && description && preparationTime && difficulty && category && servings)) {
        return res.status(400).json(
            new ApiError(400, "all field are required")
        )
    }
    
    const file = req?.files.recipeImage[0]
    const newRecipe = await Recipe.create({
        recipeTitle, description, preparationTime, difficulty, category, ingrediant, servings , preparationStep, recipeImage: file?.filename
    })

   
    return res.status(201).json(
        new ApiResponse(201, newRecipe, "new recipe successfully created")
    )
})
 
const getAllRecipes = asyncHandler(async(req ,res)=>{
    const recipes = await Recipe.find();
    return res.status(200).json(
        new ApiResponse(200 , recipes , "Data fetched Successfully")
    )

})

const getSingleRecipes = asyncHandler(async(req , res)=>{
    const {id} = req.params;
    
    const singleRecipe = await Recipe.findById(id);

    return res.status(200).json(
        new ApiResponse(200 , singleRecipe , "recipe fetched !")
    )

})

export { createRecipe , getAllRecipes , getSingleRecipes}