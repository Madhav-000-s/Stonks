// database/test.ts
import 'dotenv/config';  // ✅ Automatically loads .env files
import mongoose from "mongoose";
import { connectToDatabase } from "./mongoose";

(async () => {
    // Debug
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
    
    try {
        if (!process.env.MONGODB_URI) { 
            console.error("❌ MONGODB_URI is not set");
            process.exit(1);
        }

        console.log("🔄 Attempting to connect to MongoDB...");
        await connectToDatabase();
        console.log("✅ MongoDB connection successful");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exitCode = 1;
    } finally {
        try {
            await mongoose.connection.close(true);
            console.log("ℹ️ MongoDB connection closed");
        } catch (closeError) {
            console.error("⚠️ Error while closing MongoDB connection:", closeError);
        }
    }
})();