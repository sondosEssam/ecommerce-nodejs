import Router from 'express'
import * as cat from './category.controller.js'
import { mutlerCloud } from '../../Services/cloudMulter.js';
import { allExtenstions } from '../../Utilites/allowedExtensions.js';

const categoryRouter = Router();


categoryRouter.post('/create',mutlerCloud(...allExtenstions.Image).single('image'),cat.createCategory)
categoryRouter.get('/',cat.getAllCategories);

export default categoryRouter