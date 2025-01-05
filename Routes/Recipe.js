const express =require("express");
const Recipe =require("../models/recipe")
const multer =require("multer")
const router=express.Router();
const path=require("path")
const fs=require("fs")


const storage =multer.diskStorage({
    destination : function(req,file,cb){
        return cb(null,"./assets")
    },
    filename : function(req,file,cb){
        return cb(null,`${Date.now}-${file.originalname}`)
    }
})

const upload=multer({storage : storage});


router.post("/add",upload.single("imageURL"),async(req,res)=>{
    const {title,ingredients,description}=req.body
    const imagefile = req.file
    const newRecipe = await Recipe.create({
        title : title,
        ingredients : ingredients,
        description : description,
        imageURL : imagefile.path
    })

    return res.status(200).json({
        message : "Recipee Added Successfully"
    })
})

router.get("/",async(req,res)=>{
    const recipees=await Recipe.find({})
    return res.json({
         recipees
    }).status(201)
})

router.get("/:id",async(req,res)=>{
    const {id}=req.params
    const result=await Recipe.findById({
        _id : id
    })
    return res.json({
        result
    }).status(201)
})

router.delete("/:id",async(req,res)=>{
    const {id}=req.params;
    const result=await Recipe.findOne({_id : id})
    fs.unlink(`./${result.imageURL}`,(err)=>{
        
    })
    await Recipe.findByIdAndDelete({
        _id : id
    })
    return res.json({
        message : "Recipe Removed"
    })
})

router.patch("/:id",upload.single("imageURL"),async(req,res)=>{
    const {id}=req.params;
    const imagefile=req.file
    console.log(id)
    const found=await Recipe.findByIdAndUpdate(id,{
        title : req.body.title,
        ingredients : req.body.ingredients,
        description : req.body.description,
        imageURL : imagefile.path
    })    
    return res.json({
        message : "Record Updated"
    })
})

module.exports=router