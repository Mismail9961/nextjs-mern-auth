import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token)

        const user = await userModel.findOne({
            verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}
        })

        if(!user) {
            return NextResponse.json({error:"Invalid Token"},{status:400})
        }

        console.log(user)

        user.isVerified = true;
        user.verifyToken =  undefined;
        user.verifyTokenExpiry = undefined;
        await user.save()

        return NextResponse.json({
            message:"Email Verified Succefully",
            success:true
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}