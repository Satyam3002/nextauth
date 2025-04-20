import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt, { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(email, password);
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        console.log("user exists");
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
         const tokenData = {
            id: user._id,
            username : user.username,
            email : user.email
         }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
          },{status: 200})

          console.log(response);
          response.cookies.set("token", token, {httpOnly: true})
          return response;
            
    } catch (error: any) {
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
}
