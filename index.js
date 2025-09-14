import express from 'express'
import { config } from 'dotenv'
import { db_connection } from './DB/connection.js';
config({path:"./config/.env"});

const PORT = process.env.PORT;
const app = express();




//middlewhere
app.use(express.json())



//call db
db_connection();

//port
app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
})
