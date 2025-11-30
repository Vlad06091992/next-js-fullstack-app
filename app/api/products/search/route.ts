// import {prisma} from "@/prisma/client";
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";

export async function GET(req: NextRequest) {

    const query = req.nextUrl?.searchParams?.get("query") || '';

    // SELECT * FROM users WHERE email = 'emasd'
    const product = await prisma.product.findMany({
        where: {
            name: {
                contains: query,
                mode: 'insensitive'
            },
        },
        take: 5,

    });

    return NextResponse.json(product);
}

export async function POST(req: NextRequest) {
    const data = await req.json();

    const user = await prisma.user.create({
        data,
    });

    return NextResponse.json(user);
}