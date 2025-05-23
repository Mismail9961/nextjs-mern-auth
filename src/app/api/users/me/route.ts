import {getFormData} from "@/helpers/getFormData"

import { NextResponse , NextRequest } from "next/server"
import userModel from "@/models/userModel"
import {connect} from "@/dbConfig/dbConfig"

connect()

export async function GET(request:NextRequest){
    try {
        const userId = await getFormData(request);
        const user = await userModel.findById(userId).select("-password");
        return NextResponse.json({
            message: "User found",
            data: user
        }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}