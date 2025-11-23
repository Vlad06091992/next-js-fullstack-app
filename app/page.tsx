import {Categories, Container, Filters, SortPopup, Title} from "@/shared/components";
import {TopBar} from "@/shared/components/shared/top-bar/top-bar";
import {ProductCard} from "@/shared/components/shared/product-card/product-card";
import {ProductsGroupList} from "@/shared/components/shared/products-group-list/products-group-list";

export default function Home() {
    return (
        // <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <>
            <Container className='mt-10'>
                <Title size={'2xl'} text={"Все пиццы"} className={"font-extrabold"}/>
            </Container>
            <TopBar/>
            {/*<div className={"h[3000px]"}></div>*/}
            <Container className={'mt-10 pb-14'}>
                <div className={'flex gap-[60px]'}>
                    {/*Фильтрация*/}
                    <div className={'w-[250px]'}>
                        <Filters/>
                    </div>

                    {/*    список товаров*/}
                    <div className={'flex-1'}>
                    <div className={'flex flex-col gap-16'}>
                        Список Товаров
                        {/*<ProductCard id={1} name={'Пепперони фреш'} price={550} imageUrl={"https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.jpg"}/>*/}
                        <ProductsGroupList title={'Пицца'} categoryId={1} items={[
                            {
                                id: 1,
                                name: 'Пицца',
                                imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.jpg"
                            },
                            {
                                id: 1,
                                name: 'Пицца',
                                imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.jpg"
                            },
                            {
                                id: 1,
                                name: 'Пицца',
                                imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.jpg"
                            },
                            {
                                id: 1,
                                name: 'Пицца',
                                imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.jpg"
                            },
                            {
                                id: 1,
                                name: 'Пицца',
                                imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.jpg"
                            },
                            {
                                id: 1,
                                name: 'Пицца',
                                imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.jpg"
                            },
                            {
                                id: 1,
                                name: 'Пицца',
                                imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.jpg"
                            },
                            {
                                id: 1,
                                name: 'Пицца',
                                imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.jpg"
                            },
                        ]}/>
                        <ProductsGroupList title={'Комбо'} categoryId={2} items={[
                            {
                                id: 1,
                                name: 'Пицца',
                                imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.jpg"
                            },
                            {
                                id: 1,
                                name: 'Пицца',
                                imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.jpg"
                            },
                            {
                                id: 1,
                                name: 'Пицца',
                                imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.jpg"
                            },
                            {
                                id: 1,
                                name: 'Пицца',
                                imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.jpg"
                            },
                            {
                                id: 1,
                                name: 'Пицца',
                                imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.jpg"
                            },
                            {
                                id: 1,
                                name: 'Пицца',
                                imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.jpg"
                            },
                            {
                                id: 1,
                                name: 'Пицца',
                                imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.jpg"
                            },
                            {
                                id: 1,
                                name: 'Пицца',
                                imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.jpg"
                            },
                        ]}/>
                        {/*/!*<ProductsGroupList key={category.id} title={category.name} categoryId={category.id} items={category.products}*!//>*/}
                    </div>
                    </div>

                </div>
            </Container>
        </>
    );
}
