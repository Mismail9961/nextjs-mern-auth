import { connect } from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import UserModel from "@/models/userModel"
import { sendEmail } from "@/helpers/mailer"
import bcrypt from "bcryptjs"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return NextResponse.json({ error: "User Not Found" }, { status: 404 });
        }

        await sendEmail({ email, emailType: "RESET", userId: existingUser._id });

        return NextResponse.json({
            message: "Reset Email Sent Successfully",
            success: true,
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
