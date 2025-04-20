    import { NextRequest, NextResponse } from "next/server";
    import { connect } from "@/dbConfig/dbConfig";
    import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/GetDatafromToken";
    connect();

    export async function POST(request: NextRequest){
     const userId = await getDataFromToken(request);
      const user = await User.findOne({_id: userId}).select("-password");
      return NextResponse.json({
        message: "User found",
        data: user
      })
        
    } 
 
