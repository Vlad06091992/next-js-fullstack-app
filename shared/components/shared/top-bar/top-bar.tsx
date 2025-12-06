import {Categories, Container, SortPopup, Title} from "@/shared/components";
import {cn} from "@/shared/lib/utils";
import {Category} from "@prisma/client";

interface TopBarProps {
    className?: string
    items:Category[]

}

export const TopBar = ({className,items}: TopBarProps) => {
    return (<div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
        <Container className="flex items-center justify-between ">
            <Categories items={items}/>
            <SortPopup/>
        </Container>
    </div>);
}

