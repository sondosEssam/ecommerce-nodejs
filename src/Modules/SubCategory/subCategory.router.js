import { Router } from "express";
import * as subCat from './subCategory.controller.js'
import { mutlerCloud } from "../../Services/cloudMulter.js";
import { allExtenstions } from "../../Utilites/allowedExtensions.js";
const subCategoryRouter = Router();
subCategoryRouter.post('/create',mutlerCloud(allExtenstions.Image).single('image'), subCat.createSubCategory);
subCategoryRouter.get('/', subCat.getAllSubCategories);

export default subCategoryRouter;