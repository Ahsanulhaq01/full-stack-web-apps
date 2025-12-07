import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required : true,
        },
        instruction : {
            type :[String],
            required : true,
        },
        ingredients : {
            type : [String],
            required : true,
        },
        servings : {
            type : Number,
        },
        difficulty : {
            type : String,
            default : 'Normal',
        },
        
        caloriesPerServing : {
            type : Number,
            required : true,
        },
        tags : {
            type : [String]
        },
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        recipeImg : {
            type : String,
            required : true,
        },
        rating : {
            type : Number,
            default : 0,
        },
        reviews : {
            type : Number,
            default : 0,
        },
        mealType : {
            type : [String],
        }
    },
    {timestamps : true}
);

export const Recipe = mongoose.model('Recipe' , recipeSchema);