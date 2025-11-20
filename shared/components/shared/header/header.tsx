import {cn} from "@/shared/lib/utils";
import {Container} from "@/shared/components";
import Image from "next/image";
import Logo from '@/public/logo.png'
import {Button} from "@/shared/components/ui";
import {ArrowRight, ShoppingCart, User} from "lucide-react";


interface HeaderProps {
    className?: string

}

export const Header = ({className}: HeaderProps) => {
    return (<header className={cn('', className)}>
        <Container className='flex items-center justify-between py-4'>
            {/* левая часть   */}
            <div className={"flex gap-4 items-center"}>
                <Image src={Logo} alt={'logo'} width={32} height={32}/>
                <div>
                    <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
                    <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
                </div>
            </div>

            <div className={"flex gap-4 items-center"}>
                <Button className={"flex items-center gap-1"} variant={"outline"}>
                    <User/>
                    Войти</Button>

                <div>
                    <Button className={"group relative"}>
                        <b>520 р</b>
                        <span className="h-full w-[1px] bg-white/30 mx-3"/>
                        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                            <ShoppingCart size={16} className="relative" strokeWidth={2}/>
                            <b>3</b>
                        </div>
                        <ArrowRight
                            size={20}
                            className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                        />
                    </Button>
                </div>
            </div>
        </Container>
    </header>);
}

