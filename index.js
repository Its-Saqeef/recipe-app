const express = require("express")
require("./dbconnection")
const cors = require("cors")
const recipeRouter=require("./Routes/Recipe")

const app=express();
const port=process.env.PORT || 4000

app.use(cors())
app.use(express.json());
app.use("/assets",express.static("assets"))
app.use("/recipe",recipeRouter);

app.get("/",(req,res)=>{
    return res.json({
        message : "Welcome"
    })
})


app.listen(port,()=> console.log("Server Started at port",port))