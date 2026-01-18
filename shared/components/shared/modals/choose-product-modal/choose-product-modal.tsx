"use client"

import {FC} from "react";
import {cn} from "@/shared/lib/utils";
import {ProductForm} from "@/shared/components";
import {Dialog, DialogContent} from "@/shared/components/ui/dialog";
import {useRouter} from "next/navigation";
import {ProductWithRelations} from "@/prisma/types";

interface ChooseProductModalProps {
    product: ProductWithRelations
    className?: string
}

export const ChooseProductModal: FC<ChooseProductModalProps> = ({className, product}) => {
    const router = useRouter()
    const backToMain = () => router.back();



    return (<div className={cn('', className)}>
        <Dialog open={Boolean(product)} onOpenChange={backToMain}>
            <DialogContent className={cn(
                'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                className,
            )}>
                <ProductForm product={product} onSubmit={() => router.back()} />
            </DialogContent>
        </Dialog>
    </div>);
}