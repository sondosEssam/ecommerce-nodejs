//add category in db

import slugify from "slugify";
import cloudniary from "../../../config/cloudConfig.js";
import { customAlphabet } from "nanoid";
import { categoryModel } from "../../../DB/models/category.model.js";
const nandoio = customAlphabet("abcddefg123", 5);
export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const slug = slugify(name, "_");
    if (await categoryModel.findOne({ name }))
      return next(new Error("plaease enter difffere"));

    //add imaeg to cloudd area
    if (!req.file) return next(new Error("no file are in"));
    const customId = nandoio();
    console.log(customId);

    const { secure_url, public_id } = await cloudniary.uploader.upload(
      req.file.path,
      {
        folder: `${process.env.GLOBAL_ECOMMERCE_CLOUD_PATH}/categories/${name}`,
      }
    );
    console.log(`  secure: ${secure_url}`);
    console.log(`   public: ${public_id}`);

    const categoryObj = {
      name,
      slug,
      image: {
        secure_url,
        public_id,
      },
      customId
    };
    const newCategory = await categoryModel.create(categoryObj);
    console.log(newCategory);

    if (!newCategory) {
      res.json({ message: "somehting wrong happend", newCategory });
      await cloudniary.destroy(public_id);
    }

    return res.json({ message: "uploaded!" });
  } catch (error) {
    res.json({ message: "couldn't load!", error });
  }
};
export const updateCatgory = async (req, res, next) => {
  try {
    const { name, id } = req.body;
    // const token = req.auth;
    // const decoded_token = jwt.sign(token, process.env.SECRET_KEY);
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.json({ message: "users does not exist!" });
    }
    if (name){
    if (category.name == name.toLowerCase())
      return next(new Error("you must enter a diffreent name"));
    if (await categoryModel.findOne({ name }))
      return next(new Error("another cat already exists with that name!"));
        category.name = name;
        category.slug = slugify(name,'_');
    } 
    //update image 
    //deleete old ones
    if(req.file){
            await cloudniary.destroy(category.image.public_id);
    const { secure_url, public_id } = await cloudniary.uploader.upload(
      req.file.path,
      {
        folder: `${process.env.GLOBAL_ECOMMERCE_CLOUD_PATH}/categories/${name}`,
      }
    );
    category.image = {secure_url, public_id}
    } 
    await category.save();
  } catch (error) {
    res.json({ message: "somethign went wrong", error });
  }
};


export const getAllCategories = async (req,res,next) =>{
const allCategories = await categoryModel.find().populate([{path:"subCategoryID"}]);
if(!allCategories)
    next(new Error("there is no categories yet"))
return res.json({message:"retued suceefuslly", allCategories});
}

