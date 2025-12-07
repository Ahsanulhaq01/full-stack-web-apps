import { Recipe } from "../models/recipes.model.js";
import { asyncHandler } from "../utils/asyncHandlers.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const createRecipe = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const {
        name,
        instruction,
        ingredients,
        servings,
        difficulty,
        caloriesPerServing,
        tags,
        mealType,

    } = req.body;
    if ([name,
        instruction,
        ingredients,
        servings,
        difficulty,
        caloriesPerServing,
        tags,
        recipeImg,
        rating,
        reviews,
        mealType].some((field) => field?.trim() === "")) {
        return res.status(400).json(new ApiResponse(400, "", "All field are required !"))
    }

    const localFilePath = req.file?.path;
    if(!localFilePath){
        return res.status(400).json(
            new ApiResponse(400 , '' ,'Image is required')
        )
    }

    const cloudinaryResponse = await uploadToCloudinary(localFilePath);

    const newRecipe = await Recipe.create({
        name,
        instruction,
        ingredients,
        servings,
        difficulty,
        caloriesPerServing,
        tags,
        recipeImg : cloudinaryResponse.secure_url,
        rating,
        reviews,
        mealType
    })
})


export { createRecipe }