import express from 'express'
import { config } from 'dotenv'
import { db_connection } from './DB/connection.js';
import * as router from './src/indexs.router.js'
config({path:"./config/.env"});


const PORT = process.env.PORT;
const app = express();




//middlewhere
app.use(express.json())
app.use('/category', router.categoryRouter);
app.use('/subcategory', router.subCategoryRouter);


//error
app.use((err,req,res,next)=>{
    res.json({message:err.message})
})



//call db
db_connection();




//port
app.listen(8000, ()=>{
    console.log(`Running on port ${PORT}`);
})
