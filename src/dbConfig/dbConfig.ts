import mongoose from "mongoose";

let isConnected = false; 

export async function connect() {
  if (isConnected) {
    return;
  }

  try {
   
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "nextauth", 
    });

    isConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
