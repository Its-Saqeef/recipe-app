const express =require("express");
const Recipe =require("../models/recipe")
const multer =require("multer")
const router=express.Router();
const path=require("path")
const fs=require("fs")


const storage =multer.diskStorage({
    destination : function(req,file,cb){
         cb(null,"assets")
    },
    filename : function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload=multer({storage : storage});


router.post("/add",upload.single("imageURL"),async(req,res)=>{
    try {
        const {title,ingredients,description}=req.body
        const imagefile = req.file
        console.log(imagefile)
     const newRecipe = await Recipe.create({
        title : title,
        ingredients : ingredients,
        description : description,
        imageURL : imagefile.path
    }) 

    return res.status(200).json({
        message : "Recipee Added Successfully"
    })
    } catch (error) {
        return res.json({
            message : "Error Occured"
        })
    }
    
})

router.get("/",async(req,res)=>{
    try {
        const recipees=await Recipe.find({})
    return res.json({
         recipees
    }).status(201)
    } catch (error) {
        return res.json({
            message : "Error Occured"
        })
    }
    
})

router.get("/:id",async(req,res)=>{
    try {
        const {id}=req.params
    const result=await Recipe.findById({
        _id : id
    })
    return res.json({
        result
    }).status(201)
    } catch (error) {
        return res.json({
            message : "Error Occured"
        })
    }
    
})

router.delete("/:id",async(req,res)=>{
    try {
        const {id}=req.params;
    const result=await Recipe.findOne({_id : id})
    fs.unlink(`./${result.imageURL}`,(err)=>{
        return err
    })
    await Recipe.findByIdAndDelete({
        _id : id
    })
    return res.json({
        message : "Recipe Removed"
    })
    } catch (error) {
        return res.json({
            messgae : "Please try again"
        })
    }
    
})

router.patch("/:id",upload.single("imageURL"),async(req,res)=>{
    try {
        const {id}=req.params;
    const imagefile=req.file
    const found=await Recipe.findByIdAndUpdate(id,{
        title : req.body.title,
        ingredients : req.body.ingredients,
        description : req.body.description,
        imageURL : imagefile.path
    })    
    return res.json({
        message : "Record Updated"
    })
    } catch ({error}) {
        return res.json({
            message : "Error Occured"
        })
    }
    
})

module.exports=router
