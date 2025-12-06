import {Categories, Container, Filters, SortPopup, Title} from "@/shared/components";
import {TopBar} from "@/shared/components/shared/top-bar/top-bar";
import {ProductCard} from "@/shared/components/shared/product-card/product-card";
import {ProductsGroupList} from "@/shared/components/shared/products-group-list/products-group-list";
import {prisma} from "@/prisma/client";
import {Category} from "@prisma/client";

export default async function Home() {

    const categories = await prisma.category.findMany({
        include: {
            products: {
                include: {
                    ingredients: true,
                    items: true
                }
            }
        }
    });

    const cats = categories.filter(category => category.products.length > 0)

    return (
        <>
            <Container className='mt-10'>
                <Title size={'2xl'} text={"Все пиццы"} className={"font-extrabold"}/>
            </Container>
            <TopBar items={cats}/>
            {/*<div className={"h[3000px]"}></div>*/}
            <Container className={'mt-10 pb-14'}>
                <div className={'flex gap-[60px]'}>
                    {/*Фильтрация*/}
                    <div className={'w-[250px]'}>
                        <Filters/>
                    </div>
                    <div className={'flex-1'}>
                        <div className={'flex flex-col gap-16'}>
                            {cats.map((category) => (
                                <ProductsGroupList
                                    key={category.id}
                                    categoryId={category.id}
                                    title={category.name}
                                    items={category.products}/>
                            ))}
                        </div>
                    </div>

                </div>
            </Container>
        </>
    );
}
