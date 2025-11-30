import {Categories, Container, Filters, SortPopup, Title} from "@/shared/components";
import {TopBar} from "@/shared/components/shared/top-bar/top-bar";
import {ProductCard} from "@/shared/components/shared/product-card/product-card";
import {ProductsGroupList} from "@/shared/components/shared/products-group-list/products-group-list";

export default function Product({params:{id}}:{params:{id: string}}) {
    return (
        <div>
            Продукт: {id}
        </div>
    );
}