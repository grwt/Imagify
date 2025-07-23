import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Set up MongoDB event listeners before any connection attempts
const connectDB= async ()=>{
  try{
    const connectionInstance=await
    mongoose.connect(`${process.env.MONGODB_URI}/Imagify`)
    console.log(`\n MONGODB connected !! DB HOST: 
      ${connectionInstance}`);

  } catch (error){
    console.log("MONGODB connection error",error);
    process.exit(1)
  }
}
export default connectDB;