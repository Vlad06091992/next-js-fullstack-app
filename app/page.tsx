import {Categories, Container, SortPopup, Title} from "@/shared/components";
import {TopBar} from "@/shared/components/shared/top-bar/top-bar";

export default function Home() {
    return (
        // <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <>
            <Container className='mt-10'>
                <Title size={'2xl'} text={"Все пиццы"} className={"font-extrabold"}/>
            </Container>
            <TopBar/>
            <div className={"h-[3000px]"}></div>
        </>
    );
}
