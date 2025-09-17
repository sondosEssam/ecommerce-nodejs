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
        required:false,
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
    // customId:{
    //     type:String,
    //     required:true
    // },
},
{
    toObject:{virtuals:true},
    toJSON:{virtuals:true},
    timestamps:true
}
)
categorySchema.virtual("subCategoryID",{
    ref:"subCategory",
    localField:'_id',
    foreignField:'categoryID'
})
export const categoryModel = mongoose.model('category',categorySchema);
