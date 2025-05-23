import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { request } from "http";

export const getFormData = (request:NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken:any =  jwt.verify(token,process.env.TOKEN_SECRET!);
        return decodedToken.id
    } catch (error) {
        
    }
}