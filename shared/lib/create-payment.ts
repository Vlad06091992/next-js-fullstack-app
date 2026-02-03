// import { PaymentData } from '@/@types/yookassa';
import axios from 'axios';
import {PaymentData} from "@/shared/types";

interface Props {
  description: string;
  orderId: string;
  amount: number;
}


//оставил axios, не стал переделывать на fetch
export async function createPayment(details: Props) {
  const { data } = await axios.post<PaymentData>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
        value: details.amount.toString(),
        currency: 'RUB',
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: 'redirect',
        // return_url: 'http:/localhost:3000/?paid',
        return_url: process.env.YOOKASSA_CALLBACK_URL,
      },
    },
    {
      auth: {
          // 'Error in the Authorization header. Use shopId as the login.
          // Use Secret key issued in Merchant Profile as the password',

        username: process.env.YOOKASSA_STORE_ID as string,
        password: process.env.YOOKASSA_API_KEY as string,
      },
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': Math.random().toString(36).substring(7),
      },
    },
  );

  return data;
}
