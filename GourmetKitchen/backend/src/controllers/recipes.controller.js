import { Recipe } from "../models/recipes.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from '../utils/apiError.js'

const createRecipe = asyncHandler(async (req, res) => {
    const { recipeTitle, description, preparationTime, difficulty, category, ingrediant, preparationStep } = req.body;


    if (!(recipeTitle && description && preparationTime && difficulty && category)) {
        return res.status(400).json(
            new ApiError(400, "all field are required")
        )
    }

    const file = req?.files.recipeImage[0]
    const newRecipe = await Recipe.create({
        recipeTitle, description, preparationTime, difficulty, category, ingrediant, preparationStep, recipeImage: file?.filename
    })

    return res.status(201).json(
        new ApiResponse(201, newRecipe, "new recipe successfully created")
    )
})

export { createRecipe }