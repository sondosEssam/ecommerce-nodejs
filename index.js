import express from 'express'
import { config } from 'dotenv'
config({path:"./config/.env"});

const PORT = process.env.PORT;
const app = express();




//middlewhere
app.use(express.json())


//port
app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
})
