import slugify from "slugify";
import { brandModel } from "../../../DB/Models/brand.model.js";
import { subCategoryModel } from "../../../DB/Models/subCategory.model.js";
import cloudniary from "../../../config/cloudConfig.js";

export const createBrand = async(req,res,next)=>{
    // try {
        const subCategoryID =req.body.subCategoryID;
        console.log(subCategoryID);
        console.log("here");
        
        const isSubCategoryExist = await subCategoryModel.findById(subCategoryID);
        if(!isSubCategoryExist)
            return next(new Error("unexisiting subCategory id"))
        console.log(isSubCategoryExist);
        const {name} = req.body;
        const brand = await brandModel.findOne({name})
        if(brand)
            return next (new Error("brand alreadty exist"))
        const slug = slugify(name, {
            replacement:"_"
        })
        //image upload

        
        const {secure_url, public_id} = await cloudniary.uploader.upload(req.file.path,{
            folder:`${process.env.GLOBAL_ECOMMERCE_CLOUD_PATH}/brands/${name}`
        })

        const brandObj ={
            name,
            slug,
            logo:{
                secure_url,
                public_id
            },
            subCategoryID    }
        const newBrand = await brandModel.create(brandObj);
        if(!newBrand){
            return next(new Error("couldn't create brand"))
        }
                res.json({message:"succes, added sucessfully", newBrand});

    // } catch (error) {
    //                     res.json({message:"errro", error});

    // }
}

export const getAllBrands = async (req,res,next) =>{
const allBrands = await brandModel.find().populate([{path:"subCategoryID", select:"slug"}]);
if(!allBrands)
    next(new Error("there is no categories yet"))
return res.json({message:"retued suceefuslly", allBrands});
}