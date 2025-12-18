import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";

export async function GET(req: NextRequest, res: NextResponse) {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
        return NextResponse.json({totalAmount:0, items: []});
    }

    const cart = await prisma.cart.findFirst({
        where: {token},
        // where: {OR: [{userId}, {token}]},
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    productItem: {
                        include: {
                            product: true
                        }
                    },
                    ingredients: true
                }
            },
        },
    });
    return NextResponse.json(cart);
}

// export async function POST(req: NextRequest) {
//     const data = await req.json();
//
//     const user = await prisma.user.create({
//         data,
//     });
//
//     return NextResponse.json(user);
// }