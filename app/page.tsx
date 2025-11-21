import {Categories, Container, Filters, SortPopup, Title} from "@/shared/components";
import {TopBar} from "@/shared/components/shared/top-bar/top-bar";

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
                <div className={'flex gap-15'}>
                    {/*Фильтрация*/}
                    <div className={'w-[250px]'}>
                        <Filters/>
                    </div>

                {/*    список товаров*/}
                    <div className={'flex-1'}></div>
                    <div className={'flex flex-col gap-16'}>
                        Список Товаров
                        {/*<ProductsGroupList key={category.id} title={category.name} categoryId={category.id} items={category.products}*/}
                        {/*/!*<ProductsGroupList key={category.id} title={category.name} categoryId={category.id} items={category.products}*!//>*/}
                    </div>


                </div>
            </Container>
        </>
    );
}
