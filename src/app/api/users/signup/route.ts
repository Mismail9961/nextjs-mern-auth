import {connect} from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";
import { NextRequest , NextResponse } from "next/server";
import bcrypt, { genSalt } from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect()


export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {email,password,username} = reqBody;
        console.log(reqBody);
        //User If already exist
        const user = await UserModel.findOne({email});
        if(user){
            return NextResponse.json({error:"User Already Exist"},{status:400});
        }
        //hash Password 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        const newUser = new UserModel({
            username,
            email,
            password:hashPassword
        });
        const savedUser = await newUser.save();
        console.log(savedUser);
        //send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
        return NextResponse.json({
            message:"User Crated Succsfully",
            success:true,
            savedUser
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}