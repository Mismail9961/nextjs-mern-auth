import {connect} from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";
import { NextRequest , NextResponse } from "next/server";
import bcrypt, { genSalt } from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect()


export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        console.log(reqBody);
        //User If already exist
        const user = await UserModel.findOne({email});
        if(!user){
            return NextResponse.json({error:"User Does not Exist"},{status:400});
        }
        console.log(user);
        //send verification email
        await sendEmail({ email, emailType: "RESET", userId: user._id });
        return NextResponse.json({
            message:"Email Sent",
            success:true,
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}