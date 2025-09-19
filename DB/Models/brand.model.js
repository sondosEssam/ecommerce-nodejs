import mongoose, { Schema } from "mongoose";


export const brandSchema = new Schema({
    //feilds
    name:{
        type:String,
        required:true,
        Unique:true,
        lowercase:true
    },
    slug:{
        type:String,
        required:true,
        Unique:true,
        lowercase:true
    },
    logo:{
        //upload on cloudinary
        secure_url:{
            type:String,
            required:true
        },
        public_id:{
            type:String,
            required:true
        }
    },
    CreatedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:false
    },
    subCategoryID:{
        type:mongoose.Schema.ObjectId,
        ref:"subCategory",
        required:true
    }

},
{
    timestamps:true
}
)
export const brandModel = mongoose.model('brand',brandSchema);
