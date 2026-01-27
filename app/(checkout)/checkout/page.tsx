"use client"
import {useCart} from "@/shared/hooks";
import {Variant} from "@/shared/components/shared/cart-item-details/types";
import {
    CheckoutAddress,
    CheckoutCart,
    CheckoutPersonalData,
    CheckoutSidebar,
    Container,
    Title
} from "@/shared/components";
import {checkoutFormSchema, CheckoutFormValues} from "@/shared/constants";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createOrder} from "@/app/api/actions";

const VAT = 15
const DELIVERY_PRICE = 260

export default function CheckoutPage() {

    const {updateItemQuantity, removeCartItem, totalAmount, items, loading} = useCart();
    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: '',
        },
    });

    const onClickCountButton = (cartItemId: string, count: number, type: Variant) => {
        const newValue = type === 'plus' ? count + 1 : count - 1
        updateItemQuantity(cartItemId, newValue)
    };

    const onClickRemoveItem = (cartItemId: string) => {
        removeCartItem(cartItemId)
    };

    const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
        // form.handleSubmit(data)
        console.log(data);
        // серверный экшн, вызов
        const hz =  await  createOrder(data)

        console.log(hz)
        debugger
    }

    const vat_price = (totalAmount * VAT) / 100;
    const totalPrice = totalAmount + DELIVERY_PRICE + vat_price;

    return (
        <Container className={'mt-5'}>
            <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]"/>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className={'flex gap-10'}>
                        <div className={'flex flex-col gap-10 flex-1 mb-20'}>
                            <CheckoutCart
                                loading={loading}
                                items={items}
                                onClickCountButton={onClickCountButton}
                                onClickRemoveItem={onClickRemoveItem}/>
                            <CheckoutPersonalData className={loading ? 'opacity-40 pointer-events-none' : ''}/>
                            <CheckoutAddress className={loading ? 'opacity-40 pointer-events-none' : ''}/>
                        </div>

                        <div className={'w-[450px]'}>
                            <CheckoutSidebar totalAmount={totalAmount}
                                             loading={loading}
                            />

                        </div>
                    </div>
                </form>
            </FormProvider>


        </Container>
    )
}