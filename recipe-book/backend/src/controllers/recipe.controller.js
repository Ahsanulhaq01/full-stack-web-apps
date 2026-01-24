import { Recipe } from "../models/recipes.model.js";
import { asyncHandler } from "../utils/asyncHandlers.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const createRecipe = asyncHandler(async (req, res) => {
    // const userId = req.user._id;

    const {
        recipeName,
        instructions,
        ingredients,
        servings,
        difficulty,
        caloriesPerServing,
        preparationTime,
        cookingTime,
        cuisine,
        tags,
        mealType,

    } = req.body;
    // if ([recipeName,
    //     instruction,
    //     ingredients,
    //     servings,
    //     difficulty,
    //     caloriesPerServing,
    //     tags,
    //     preparationTime,
    //     cookingTime,
    //     cuisine,
    //     mealType].some((field) => field?.trim() === "")) {
    //     return res.status(400).json(new ApiResponse(400, "", "All field are required !"))
    // }

    const localFilePath =  req.files?.recipeImage[0]?.path;
    if(!localFilePath){
        return res.status(400).json(
            new ApiResponse(400 , '' ,'Image is required')
        )
    }

    const cloudinaryResponse = await uploadToCloudinary(localFilePath);

    const newRecipe = await Recipe.create({
        recipeName,
        instructions,
        ingredients,
        servings,
        difficulty,
        caloriesPerServing,
        tags,
        recipeImage : cloudinaryResponse.secure_url,
        mealType,
        preparationTime,
        cookingTime,
        cuisine
    })

    return res.status(201).json(
        new ApiResponse(201 , newRecipe , 'New recipe SuccessFully created')
    )
})


export { createRecipe }