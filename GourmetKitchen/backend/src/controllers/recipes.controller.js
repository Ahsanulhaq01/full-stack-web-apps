import { Recipe } from "../models/recipes.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from '../utils/apiError.js'
import { uploadToCloudinary } from "../utils/cloudinary.js";

const createRecipe = asyncHandler(async (req, res) => {
    const { recipeTitle, description, preparationTime, difficulty, category, servings } = req.body;
    const ingrediant = JSON.parse(req.body.ingrediant)
    const preparationStep = JSON.parse(req.body.preparationStep)
    if (
        !recipeTitle ||
        !description ||
        !preparationTime ||
        !difficulty ||
        !category ||
        !servings
    ) {
        return res.status(400).json(
            new ApiError(400, "All fields are required")
        );
    }

    const localFile = req?.files.recipeImage[0];

    if (!localFile) {
        return res.status(400).json(
            new ApiError(400, "Recipe image is required")
        );
    }
    const uploadImage = await uploadToCloudinary(localFile.path)
    const newRecipe = await Recipe.create({
        recipeTitle, description, preparationTime, difficulty, category, ingrediant, servings, preparationStep, recipeImage: uploadImage?.url,
        createdBy: req.user._id
    })


    return res.status(201).json(
        new ApiResponse(201, newRecipe, "new recipe successfully created")
    )
})

const getAllRecipes = asyncHandler(async (req, res) => {
    const { category, search } = req.query;

    let filter = {};
    if (category && category !== 'All') {
        filter.category = category;
    }

    if (search) {
        filter.$or = [
            { recipeTitle: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            {
                ingrediant: {
                    $elemMatch: {
                        $regex: search,
                        $options: "i"
                    }
                }
            },
            { category: { $regex: search, $options: "i" } }
        ];
    }

    const recipes = await Recipe.find(filter).populate("createdBy", "name");
    return res.status(200).json(
        new ApiResponse(200, recipes, recipes.length > 0 ? "Data fetched Successfully" : "nothing exist in this category")
    )

})

const getSingleRecipes = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const singleRecipe = await Recipe.findById(id).populate("createdBy", "name");

    return res.status(200).json(
        new ApiResponse(200, singleRecipe, "recipe fetched !")
    )

})


const countRecipes = asyncHandler(async (req, res) => {
    try {

        const recipeCount = await Recipe.countDocuments({
            createdBy: req.user._id
        });


        return res.status(200).json(
            new ApiResponse(200, recipeCount, "Successfully fetched")
        );
    } catch (error) {
        console.log("COUNT RECIPES ERROR:", error);
        throw error;
    }
});

const getCreatorRecipes = asyncHandler(async(req , res)=>{

    const userRecipes = await Recipe.find({createdBy : req.user._id})

    return res.status(200).json(
        new ApiResponse(200 , userRecipes , 'user Recipes fetched')
    )
})

const updateRecipe = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { recipeTitle, description, preparationTime, difficulty, category, servings, ingrediant, preparationStep } = req.body;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
        throw new ApiError(404, "Recipe not found");
    }

    if (recipe.createdBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this recipe");
    }

    const updateData = {
        recipeTitle,
        description,
        preparationTime,
        difficulty,
        category,
        servings,
        ingrediant: ingrediant ? JSON.parse(ingrediant) : recipe.ingrediant,
        preparationStep: preparationStep ? JSON.parse(preparationStep) : recipe.preparationStep,
    };

    if (req.files?.recipeImage) {
        const localFile = req.files.recipeImage[0];
        const uploadImage = await uploadToCloudinary(localFile.path);
        updateData.recipeImage = uploadImage?.url;
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
    );

    return res.status(200).json(
        new ApiResponse(200, updatedRecipe, "Recipe updated successfully")
    );
});

const deleteRecipe = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
        throw new ApiError(404, "Recipe not found");
    }

    if (recipe.createdBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this recipe");
    }

    await Recipe.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, null, "Recipe deleted successfully")
    );
});

export { createRecipe , getAllRecipes , getSingleRecipes , countRecipes , getCreatorRecipes, updateRecipe, deleteRecipe};