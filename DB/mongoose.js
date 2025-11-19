import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()


export function connrctToDB (){
    try {
        mongoose.connect(process.env.MONGO).then(()=>{
            console.log(`connect to DB Successfully`);
        }).catch((e)=>{
            console.log(`Error to connect : ${e}`);
            
        })
    } catch (error) {
        console.log(`Error : ${error}`);
        
    }
}