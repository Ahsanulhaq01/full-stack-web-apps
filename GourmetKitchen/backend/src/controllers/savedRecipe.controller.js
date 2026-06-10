import { SavedRecipe } from "../models/savedRecipe.model.js";
import { Recipe } from "../models/recipes.model.js";
import { Notification } from "../models/notification.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

const toggleSaveRecipe = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const recipeId = req.params.id;

    const alreadySaved = await SavedRecipe.findOne({
        user: userId,
        recipe: recipeId
    });

    if (alreadySaved) {
        await SavedRecipe.findByIdAndDelete(alreadySaved._id);
        return res.status(200).json(
            new ApiResponse(200, null, "Recipe unsaved successfully")
        );
    }

    const saved = await SavedRecipe.create({
        user: userId,
        recipe: recipeId
    });

    // Create notification for the recipe creator
    const recipe = await Recipe.findById(recipeId);
    if (recipe && recipe.createdBy.toString() !== userId.toString()) {
        await Notification.create({
            recipient: recipe.createdBy,
            sender: userId,
            type: "save",
            recipe: recipeId
        });
    }

    return res.status(201).json(
        new ApiResponse(201, saved, "Recipe saved successfully")
    );
});

const getSavedRecipes = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const savedItems = await SavedRecipe.find({ user: userId }).populate({
        path: "recipe",
        populate: {
            path: "createdBy",
            select: "name"
        }
    });

    const recipes = savedItems.map(item => item.recipe).filter(recipe => recipe !== null);

    return res.status(200).json(
        new ApiResponse(200, recipes, "Saved recipes fetched successfully")
    );
});

const checkSaveStatus = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const recipeId = req.params.id;

    const saved = await SavedRecipe.findOne({
        user: userId,
        recipe: recipeId
    });

    return res.status(200).json(
        new ApiResponse(200, !!saved, "Save status fetched")
    );
});

export { toggleSaveRecipe, getSavedRecipes, checkSaveStatus };
