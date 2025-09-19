import { Router } from "express";
import * as brand from './brand.controller.js'
import { mutlerCloud } from "../../Services/cloudMulter.js";
import { allExtenstions } from "../../Utilites/allowedExtensions.js";
const brandRouter = Router();

brandRouter.post('/create',mutlerCloud(...allExtenstions.Image).single('logo'),brand.createBrand);
brandRouter.get('/', brand.getAllBrands);
export default brandRouter;