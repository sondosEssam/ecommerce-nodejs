import slugify from "slugify";
import { categoryModel } from "../../../DB/models/category.model.js";
import { subCategoryModel } from "../../../DB/Models/subCategory.model.js";
import cloudniary from "../../../config/cloudConfig.js";
import { customAlphabet} from "nanoid";
const customId = customAlphabet('abcd',4);
export const createSubCategory = async(req,res,next)=>{
    try {
        const {categoryID} =req.body;
        console.log(categoryID);
        
        const isCatgeoryExist = await categoryModel.findById(categoryID);
        if(!isCatgeoryExist)
            return next(new Error("unexisiting category id"))
        console.log(isCatgeoryExist);
        
        const {name} = req.body;
        const subCategory = await subCategoryModel.findOne({name})
        if(subCategory)
            return next (new Error("subcat alreadty exist"))
        const slug = slugify(name, {
            replacement:"_"
        })
        //image upload

        
        const {secure_url, public_id} = await cloudniary.uploader.upload(req.file.path,{
            folder:`${process.env.GLOBAL_ECOMMERCE_CLOUD_PATH}/categories/${isCatgeoryExist.name}/${name}`
        })

        const subObj ={
            name,
            slug,
            image:{
                secure_url,
                public_id
            },
            categoryID,
            customId
        }
        const newsubCategory = await subCategoryModel.create(subObj);
        if(!newsubCategory){
            return next(new Error("couldn't create cat"))
        }
                res.json({message:"succes, added sucessfully", newsubCategory});

    } catch (error) {
                        res.json({message:"errro", error});

    }
}

export const getAllSubCategories = async (req,res,next) =>{
const allSubCategories = await subCategoryModel.find().populate([{path:"categoryID", select:"slug"}]);
if(!allSubCategories)
    next(new Error("there is no categories yet"))
return res.json({message:"retued suceefuslly", allSubCategories});
}