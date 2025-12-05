import { Recipe } from "../models/recipes.model.js";
import { asyncHandler } from "../utils/asyncHandlers.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
        image,
        rating,
        reviews,
        mealType].some((field) => field?.trim() === "")) {
        return res.status(400).json(new ApiResponse(400, "", "All field are required !"))
    }
})


export { createRecipe }