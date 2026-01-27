"use client"

import {ErrorText, WhiteBlock} from "@/shared/components";
import {FC} from "react";
import {FormTextarea} from "@/shared/components/shared/form-components/form-textarea/form-textarea";
import {AddressInput} from "@/shared/components/shared/address-input/address-input";
import {Controller, useFormContext} from "react-hook-form";

interface Props {
    className?: string;
}

export const CheckoutAddress: FC<Props> = ({className}) => {

    const {control} = useFormContext()

    return (
        <WhiteBlock title="3. Адрес доставки" className={className}>
            <div className="flex flex-col gap-5">

                <Controller control={control} render={({field, fieldState}) => (
                    <>
                        <AddressInput onChange={field.onChange}/>
                        {fieldState.error?.message && <ErrorText text={fieldState?.error?.message}/>}
                    </>
                )}
                            name={"address"}/>

                <FormTextarea
                    name="comment"
                    className="text-base"
                    placeholder="Комментарий к заказу"
                    rows={5}
                />
            </div>
        </WhiteBlock>
    )
}