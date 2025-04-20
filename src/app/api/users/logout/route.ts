import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest){
    try {
     const response =NextResponse.json({
        message: "Logout successful",
        success: true,
     },{status: 200})

     response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)})
     return response;
    } catch (error: any) {
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
}

