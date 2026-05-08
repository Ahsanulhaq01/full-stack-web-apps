import mongoose from 'mongoose'

const recipesSchema = new mongoose.Schema({
    recipeTitle : {
        type : String,
        required : true,
    },
    description :{
        type : String,
        requird : true,
    },
    difficulty : {
        type: String,
        enum : ["Easy" , "Intermediate" ,"Advance"],
        required : true,
    },
    preparationTime : {
        type:Number,
        required : true,
    },
    recipeImage : {
        type : String,
        required : true,

    },
    category : {
        type : String ,
        enum : ["Breakfast" , "Dinner" , "Lunch" ,"Dessert" , "Vegertarian"],
        required : true,
    },
    ingrediant : {
        type : [String],
        required : true,

    },
    preparationStep : {
        type : [String],
        required : true,
    },
    isSaved : {
        type : Boolean,
    },
    servings :{
        type : Number , 
        
    }
    // createdBy : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : "User",
    // }

},{
    timestamps : true,
})

export const Recipe = mongoose.model('Recipe' , recipesSchema);