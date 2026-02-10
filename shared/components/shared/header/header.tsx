'use client'

import {cn} from "@/shared/lib/utils";
import {AuthModal, CartButton, Container, ProfileButton, SearchInput} from "@/shared/components";
import Image from "next/image";
import Logo from '@/public/logo.png'
import {Button} from "@/shared/components/ui";
import {User} from "lucide-react";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useSession, signIn} from "next-auth/react";


interface HeaderProps {
    className?: string
    hasSearch?: boolean
    hasCart?: boolean

}

export const Header = ({className, hasSearch = true, hasCart = true}: HeaderProps) => {
    const {status, data} = useSession()
    const searchParams = useSearchParams();
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        let toastMessage = '';

        if (searchParams.has('paid')) {
            toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';
        }

        if (searchParams.has('verified')) {
            toastMessage = 'Почта успешно подтверждена!';
        }

        if (toastMessage) {
            setTimeout(() => {
                // router.replace('/');
                toast.success(toastMessage, {
                    duration: 3000,
                });
            }, 1000);
        }
    }, []);

    const f = () => signIn('github', {callbackUrl: '/', redirect: true})

    return (<header className={cn('border-b', className)}>
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

            {hasSearch && <div className={'mx-10 flex-1'}>
                <SearchInput/>
            </div>}

            <div className={"flex gap-4 items-center"}>
                <AuthModal open={open} onClose={()=>setOpen(false)}/>
                <ProfileButton onClickSignIn={()=>{debugger; setOpen(true)}}/>
                {/*<ProfileButton onClickSignIn={f}/>*/}
                {hasCart && <CartButton/>}
            </div>
        </Container>
    </header>);
}

