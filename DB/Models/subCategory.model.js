import mongoose, { Schema } from "mongoose";


export const subCategorySchema = new Schema({
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
        ref:"user",
        required:false
    },
    categoryID:{
        type:mongoose.Schema.ObjectId,
        ref:"category",
        required:true
    },
},
{
    toObject:{virtuals:true},
    toJSON:{virtuals:true},
    timestamps:true
}
)
subCategorySchema.virtual("brandID",{
    ref:"brand",
    localField:'_id',
    foreignField:'subCategoryID'
})
export const subCategoryModel = mongoose.model('subCategory',subCategorySchema);
