import mongoose from "mongoose";

export const connectDB = async() =>{

    await mongoose.connect(
      "mongodb+srv://greatstack:loginplease@cluster0.kgpd13f.mongodb.net/food-del"
    ).then(()=>console.log("dB connected")
    );
}