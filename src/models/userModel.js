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
   
    mongoose.model('users');
} catch {
  
    mongoose.model('users', userSchema);
}


const User = mongoose.models.users;

export default User; 