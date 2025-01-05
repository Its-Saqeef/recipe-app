const mongoose =require("mongoose")

const RecipeSchema=new mongoose.Schema({
    title : {
        type : String,
    },
    ingredients : {
        type : String
    },
    description : {
        type : String,
    },
    imageURL : {
        type : String,
    }
},{timestamps : true})

const Recipe = mongoose.model("recipees",RecipeSchema);

module.exports=Recipe;