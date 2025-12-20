import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";
import {updateCartTotalAmount} from "@/shared/lib/update-cart-total-amount";

//этот ендпоинт принимает id товара в корзине, обновляет его количество, возвращает список товаров в корзине
//корзина ищется по токену в куках
export async function PATCH(req: NextRequest, {params: {id}}: { params: { id: string } }) {
    try {
        const body = await req.json() as { quantity: number };
        console.log(id)
        console.log(body)

        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({error: "token not found"}, {status:400});
        }


        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id
            },
        });

        if (!cartItem) {
            return NextResponse.json({message: `not found`}, {status: 404})
        }



        await prisma.cartItem.update( {
            where: {id},
            data: {
                quantity: body.quantity,
            }
        })

        const updatedCart = await updateCartTotalAmount(token)
        return NextResponse.json(updatedCart)

    } catch (e) {
        return NextResponse.json({message: `Failed to parse PATCH: ${e}`}, {status: 500})
    }
}