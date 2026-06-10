import mongoose from "mongoose";

const savedRecipeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true
    }
}, {
    timestamps: true
});

export const SavedRecipe = mongoose.model("SavedRecipe", savedRecipeSchema);
