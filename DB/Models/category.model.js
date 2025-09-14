import mongoose, { Schema } from "mongoose";


export const categorySchema = new Schema({
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
    image:{
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
        ref:"User",
        required:false
    },
    custom_id:{
        type:String,
        required:true
    },
},
{
    timestamps:true
}
)
export const categoryModel = mongoose.model('category',categorySchema);
