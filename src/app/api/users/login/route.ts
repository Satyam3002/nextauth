import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt, { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
      console.log("1. Request received");
  
      const reqBody = await request.json();
      const { email, password } = reqBody;
      console.log("2. Email & password parsed:", email);
  
      const user = await User.findOne({ email });
      console.log("3. User fetched from DB");
  
      if (!user) {
        console.log("4. User does not exist");
        return NextResponse.json({ error: "User does not exist" }, { status: 400 });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      console.log("5. Password compared");
  
      if (!validPassword) {
        console.log("6. Invalid password");
        return NextResponse.json({ error: "Invalid password" }, { status: 400 });
      }
  
      const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email,
      };
  
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
      console.log("7. Token signed");
  
      const response = NextResponse.json(
        {
          message: "Login successful",
          success: true,
        },
        { status: 200 }
      );
  
      response.cookies.set("token", token, { httpOnly: true });
      console.log("8. Token cookie set");
  
      return response;
    } catch (error: any) {
      console.error("Error occurred:", error);
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
  }
  
