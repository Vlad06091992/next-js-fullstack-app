import {ChooseProductModal} from "@/shared/components";
import {prisma} from "@/prisma/client";
import {notFound} from "next/navigation";

export default async function ProductModalPage({params: {id}}: { params: { id: string } }) {
    const product = await prisma.product.findFirst({
            where: {id},
            include: {
                ingredients: true,
                items: true,
            },
        },
    );

    if (!product) {
        return notFound();
    }

    return (
        <ChooseProductModal product={product}/>
    )
}