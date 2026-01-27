import {FormInput, WhiteBlock} from "@/shared/components";
import {FC} from "react";
import {useFormContext} from "react-hook-form";

interface Props {
    className?: string;
}

export const CheckoutPersonalData:FC<Props> = ({className}) => {

    const {} = useFormContext()

    return (
        <WhiteBlock className={className} title="2. Персональная информация">
            <div className="grid grid-cols-2 gap-5">
                <FormInput name="firstName" className="text-base" placeholder="Имя"/>
                <FormInput name="lastName" className="text-base" placeholder="Фамилия"/>
                <FormInput name="email" className="text-base" placeholder="E-Mail"/>
                <FormInput name="phone" className="text-base" placeholder="Телефон"/>
            </div>
        </WhiteBlock>
    )
}