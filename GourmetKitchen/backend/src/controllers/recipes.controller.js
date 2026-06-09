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
        recipeTitle, description, preparationTime, difficulty, category, ingrediant , servings , preparationStep, recipeImage: uploadImage?.url,
        createdBy : req.user._id
    })

   
    return res.status(201).json(
        new ApiResponse(201, newRecipe, "new recipe successfully created")
    )
})
 
const getAllRecipes = asyncHandler(async(req ,res)=>{
    const {category} = req.query;

    let filter = {};
    if(category){
        filter.category = category;
    }
    const recipes = await Recipe.find(filter).populate("createdBy", "name");
    return res.status(200).json(
        new ApiResponse(200 , recipes , "Data fetched Successfully")
    )

})

const getSingleRecipes = asyncHandler(async(req , res)=>{
    const {id} = req.params;
    
    const singleRecipe = await Recipe.findById(id).populate("createdBy" , "name");

    return res.status(200).json(
        new ApiResponse(200 , singleRecipe , "recipe fetched !")
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

export { createRecipe , getAllRecipes , getSingleRecipes , countRecipes , getCreatorRecipes};