import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password : {
        type: String,
        required : false
    },
    isVerified: {
        type : Boolean,
        default: false
    },
    isAdmin : {
        type : Boolean,
        default: false
    },
    provider: {
        type: String,
        default: "credentials"
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

try {
    // Try to get the existing model
    mongoose.model('users');
} catch {
    // Model doesn't exist, so create it
    mongoose.model('users', userSchema);
}

// Now we can safely get the model
const User = mongoose.models.users;

export default User; 