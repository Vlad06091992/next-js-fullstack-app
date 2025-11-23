// import {prisma} from "@/prisma/client";
import {NextResponse} from "next/server";
import {prisma} from "@/prisma/client";

export async function GET() {
    // SELECT * FROM users WHERE email = 'emasd'
    const users = await prisma.user.findMany();

    return NextResponse.json(users);
}