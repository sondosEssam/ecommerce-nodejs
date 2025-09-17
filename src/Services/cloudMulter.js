import multer from "multer";
import { allExtenstions } from "../Utilites/allowedExtensions.js";
import { nanoid } from "nanoid";
export const mutlerCloud = (allExtenstionsh)=>{


    const storage = multer.diskStorage({});


    const fileFilter = function(req,file,cb){
        if(!allExtenstionsh)
            allExtenstionsh = allExtenstions.Image;
        if(allExtenstionsh.includes(file.mimetype)){
            return cb(null,true);
        }
            cb(new Error('invalid method'), false);
    }
    const uplaodFile = multer({fileFilter,storage});
    return uplaodFile
}