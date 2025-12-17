import {cn} from "@/shared/lib/utils";
import {CartButton, Container, SearchInput} from "@/shared/components";
import Image from "next/image";
import Logo from '@/public/logo.png'
import {Button} from "@/shared/components/ui";
import {ArrowRight, Search, ShoppingCart, User} from "lucide-react";
import Link from "next/link";


interface HeaderProps {
    className?: string

}

export const Header = ({className}: HeaderProps) => {
    return (<header className={cn('', className)}>
        <Container className='flex items-center justify-between py-4'>
            {/* левая часть   */}
            <Link href={'/'}>
                <div className={"flex gap-4 items-center"}>
                    <Image src={Logo} alt={'logo'} width={32} height={32}/>
                    <div>
                        <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
                        <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
                    </div>
                </div>
            </Link>

            <div className={'mx-10 flex-1'}>
                <SearchInput/>
            </div>

            <div className={"flex gap-4 items-center"}>
                <Button className={"flex items-center gap-1"} variant={"outline"}>
                    <User size={16}/>
                    Войти</Button>
                <CartButton/>
            </div>
        </Container>
    </header>);
}

