import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
    {
        recipeName: {
            type: String,
            required: true,
        },
        instructions: {
            type: [String],
            required: true,
        },
        ingredients: {
            type: [String],
            required: true,
        },
        servings: {
            type: Number,
        },
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true,
        },

        caloriesPerServing: {
            type: Number,
            required: true,
        },
        tags: {
            type: [String]
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        recipeImage: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
        reviews: {
            type: Number,
            default: 0,
        },
        mealType: {
            type: [String],
            enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
            required: true,
        },
        preparationTime: {
            type: Number,
        },
        cookingTime: {
            type: Number,
        },
        cuisine: {
            type: String,

        }
    },
    { timestamps: true }
);

export const Recipe = mongoose.model('Recipe', recipeSchema);