import {Container, PizzaImage, Title} from "@/shared/components";
import {prisma} from "@/prisma/client";
import {notFound} from "next/navigation";
import {GroupVariants} from "@/shared/components/shared/group-variants/group-variants";


export default async function Product({params: {id}}: { params: { id: string } }) {

    const product = await prisma.product.findFirst({where: {id}});


    if (!product) {
        return notFound();
    }

    return (
        <Container className={"flex flex-col my-10"}>
            <div className="flex flex-1">
                <PizzaImage size={40} name={product.name} imageUrl={product.imageUrl}/>
            <div className={"w-[490px] bg-[#f7f6f5] p-7"}>
                <Title text={product.name} size="md" className="font-extrabold mb-1" />
                <p className="text-gray-400">{"fksdfjsdlk"}</p>
                <GroupVariants value={"2"}  items={[
                    {
                        name: "Маленькая",
                        value: "1",
                        disabled:true
                    },
                    {
                        name: "Средняя",
                        value: "2",
                        disabled:false,
                    },
                    {
                        name: "Большая",
                        value: "3",
                        disabled:false
                    },
                ]}
                />
            </div>
            </div>
        </Container>
    );
}