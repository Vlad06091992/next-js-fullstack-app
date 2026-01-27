'use server';
import {CheckoutFormValues} from '@/shared/constants';
import {OrderStatus} from "@prisma/client";
import {prisma} from "@/prisma/client";

// серверный экшн, объявление
export async function createOrder(data: CheckoutFormValues) {
    console.log("data server:",data);

    await prisma.order.create({data:{
            token: '',
            fullName: data.firstName + ' ' + data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            comment: data.comment,
            totalAmount: 200,
            status: OrderStatus.PENDING,
            items: [],

        }});

    //не лучшая практика, для примера
    return "fjhdskhgs";

}

