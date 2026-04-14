import { Recipe } from "../models/recipes.model.js";
import { asyncHandler } from "../utils/asyncHandlers.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import { uploadToCloudinary } from "../utils/cloudinary.js";

const createRecipe = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const {
        recipeName,
        servings,
        difficulty,
        caloriesPerServing,
        preparationTime,
        cookingTime,
        cuisine,
        tags,
        mealType,

    } = req.body;

    const instructions = JSON.parse(req.body.instructions);
    const ingredients = JSON.parse(req.body.ingredients);

    if (
        !recipeName ||
        !servings ||
        !difficulty ||
        !mealType
    ) {
        return res.status(400).json(
            new ApiResponse(400, null, "All required fields must be provided"));
    }

    if (
        !ingredients.length === 0 ||
        !instructions.length === 0
    ) {
        return res.status(400).json(
            new ApiResponse(400, null, "Ingredients and instructions must be non-empty arrays")
        );
    }


    if (servings <= 0) {
        return res.status(400).json(
            new ApiResponse(400, null, "Servings must be greater than 0")
        );
    }

    if (caloriesPerServing < 0) {
        return res.status(400).json(
            new ApiResponse(400, null, "Calories cannot be negative")
        );
    }

    const allowedDifficulties = ["Easy", "Medium", "Hard"];

    if (!allowedDifficulties.includes(difficulty)) {
        return res.status(400).json(
            new ApiResponse(400, null, "Invalid difficulty level")
        );
    }

    const localFilePath = req.files?.recipeImage[0]?.path;
    if (!localFilePath) {
        return res.status(400).json(
            new ApiResponse(400, '', 'Image is required')
        )
    }

    // const cloudinaryResponse = await uploadToCloudinary(localFilePath);

    const newRecipe = await Recipe.create({
        recipeName,
        instructions,
        ingredients,
        servings,
        difficulty,
        caloriesPerServing,
        tags,
        recipeImage: localFilePath,
        mealType,
        preparationTime,
        cookingTime,
        cuisine,
        createdBy: userId,
    })

    return res.status(201).json(
        new ApiResponse(201, newRecipe, 'New recipe SuccessFully created')
    )
})



const getRecipes = asyncHandler(async (req, res) => {

    const recipes = await Recipe.find();

    return res.status(200).json(
        recipes
    )

})

const getRecipesCount = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const recipeCount = await Recipe.countDocuments({ createdBy: userId })

    return res.status(200).json(
        new ApiResponse(200, { count: recipeCount }, "Recipe Count fetched !")
    )
})

const getMyRecipes = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const myRecipes = await Recipe.find({ createdBy: userId });

    return res.status(200).json(
        new ApiResponse(200, myRecipes, "My Recipes fetched ")
    )

})


const getRecipeById = asyncHandler(async(req, res)=>{

    const {id} = req.params;

    const recipe = await Recipe.findById(id);

    if(!recipe){
        return res.status(404).json(
            new ApiResponse(404 , null , "Recipe not Found")
        )
    }

    return res.status(200).json(
        new ApiResponse(200 , recipe , "Recipe Successfully fetched ")
    )
})

const deleteRecipe = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const deletedRecipe = await Recipe.findByIdAndDelete(id)

    if(!deleteRecipe){
        return res.status(404).json(
            new ApiResponse(404 , null , "Recipe not Found")
        )
    }

    console.log(deletedRecipe)
    return res.status(200).json(
        new ApiResponse(200 , null , `${deletedRecipe.recipeName} recipe is Successfully Deleted`)
    )
})

const updateRecipe = asyncHandler(async(req,res)=>{
    const {id} = req.params;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
        id,
        req.body,
        {new : true}
    );

    if(!updateRecipe){
        return res.status(404).json(
            new ApiResponse(404 , null , "Recipe not found")
        )
    }

    return res.status(200).json(
        new ApiResponse(200 , updateRecipe , `${updatedRecipe.recipeName} recipe is updated Successfully`)
    )
})
export { createRecipe, getRecipes, getRecipesCount, getMyRecipes , getRecipeById , deleteRecipe , updateRecipe }