import {FC, InputHTMLAttributes} from "react";
import {cn} from "@/shared/lib/utils";
import {RequiredSymbol} from "../../required-symbol/required-symbol";
import {ClearButton} from "../../clear-button/clear-button";
import {Input} from '../../../ui/input';
import {ErrorText} from "@/shared/components/shared/error-text/error-text";
import {useFormContext} from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name:string;
    label?:string;
    className?:string;
    required?:boolean;
}

export const FormInput:FC<Props> = ({label,required,name,className, ...props}) => {

    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext();


    const value = watch(name);
    const errorText = errors[name]?.message as string;

    debugger

    const onClickClear = () => {
        setValue(name, '', { shouldValidate: true });
    };
    return (
        <div className={cn('',className)}>
            {label && (
                <p className="font-medium mb-2">
                    {label} {required && <RequiredSymbol />}
                </p>
            )}

            <div className="relative">
                <Input className="h-12 text-md"
                       {...register(name)} {...props}
                />

                <ClearButton onClick={()=>{}} />
                {value && <ClearButton onClick={onClickClear} />}
            </div>

            {errorText && <ErrorText text={errorText} className="mt-2" />}
        </div>
    )
}