import {FC} from "react";
import {cn} from "@/shared/lib/utils";
import {Title} from "@/shared/components";
import {ProductCard} from "@/shared/components/shared/product-card/product-card";

interface ProductsGroupListProps {
    className?: string
    title: string
    items: any[]
    listClassName?: string
    categoryId: number
}

export const ProductsGroupList: FC<ProductsGroupListProps> = ({className,listClassName,items,categoryId,title}) => {
    return (<div className={cn('', className)}>
        <Title text={title} size="lg" className="font-extrabold mb-5" />
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