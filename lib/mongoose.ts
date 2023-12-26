import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


let isConnected =false;  // Variable to track the connection status.

// this function helps us to connect to the database.

export const connectToDB = async () =>{
    //console.log(process.env.BRIGHT_DATA_USERNAME);
    mongoose.set('strictQuery',true)

    if(!process.env.MONGODB_URI) {
        
       // console.log(process.env.MONGODB_URI);
        return console.log("MONGODB_URI is not defined");
        
    }

    if(isConnected) return console.log("=> using existing database connection");

    try{
        await mongoose.connect(process.env.MONGODB_URI);

        isConnected = true;
        console.log("MongoDB connected");

    } catch(error){
        console.log(error)
    }
    
}