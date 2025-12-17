"use client"

import {FC, useEffect, useRef} from "react";
import {cn} from "@/shared/lib/utils";
import {Title} from "@/shared/components";
import {ProductCard} from "@/shared/components/shared/product-card/product-card";
import {useIntersection} from "react-use";
import {useCategoryStore} from "@/shared/store";

interface ProductsGroupListProps {
    className?: string
    title: string
    items: any[]
    listClassName?: string
    categoryId: string
}

export const ProductsGroupList: FC<ProductsGroupListProps> = ({className,listClassName,items,categoryId,title}) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
    const intersectionRef = useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }
    }, [categoryId, intersection?.isIntersecting, title]);

    return (<div className={cn('', className)} id={title} ref={intersectionRef}>
        <Title text={title}  size="lg" className="font-extrabold mb-5" />
        <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
            {items.map(product => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imageUrl}
                />
            ))}
        </div>
    </div>);
}