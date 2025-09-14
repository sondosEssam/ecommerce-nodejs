import mongoose  from "mongoose";

export const db_connection  = async (res,req,next)=>{
    return await mongoose.connect(`mongodb://localhost:27017/Ecommerce_first_app`)
    .then((res)=>console.log(`DB CONNECT SUFFECFULLY: ${res}`))
    .catch((error)=>console.error(`failed to conncect: ${error}`)
    )
    
}

