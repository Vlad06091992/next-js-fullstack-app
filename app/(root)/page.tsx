// "use client"

import {Container, Filters, Title} from "@/shared/components";
import {TopBar} from "@/shared/components/shared/top-bar/top-bar";
import {ProductsGroupList} from "@/shared/components/shared/products-group-list/products-group-list";
import {Suspense} from "react";
import {findPizzas, GetSearchParams} from "@/shared/lib/find-pizzas";


export default async function Home({searchParams}: { searchParams: GetSearchParams }) {
    const categories = await findPizzas(searchParams);
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
                        <Suspense fallback={'loading...'}>
                            <Filters/>
                        </Suspense>
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


// import {Container, Filters, Title} from "@/shared/components";
// import {TopBar} from "@/shared/components/shared/top-bar/top-bar";
// import {ProductsGroupList} from "@/shared/components/shared/products-group-list/products-group-list";
// import {prisma} from "@/prisma/client";
// import {Suspense} from "react";
// import {GetSearchParams} from "@/shared/lib/find-pizzas";
//
//
// export default async function Home({params}: { params: GetSearchParams }) {
//
//
//     // const DEFAULT_MIN_PRICE = 0;
//     // const DEFAULT_MAX_PRICE = 1000;
//     //
//     // const sizes = params.sizes?.split(',').map(Number);
//     // const pizzaTypes = params.pizzaTypes?.split(',').map(Number);
//     // // const ingredientsIdArr = params.ingredients?.split(',');
//     const ingredientsIdArr = ["9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f"];
//     //
//     // const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
//     // const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;
//
//     // const categories = await prisma.category.findMany({
//     //
//     //     // where: {
//     //     // products: {
//     //     //     every: {
//     //     //         items: {
//     //     //             some: {
//     //     //                 price: {
//     //     //                     gte: 450,
//     //     //                     lte: 500,
//     //     //                 }
//     //     //             }
//     //     //         },
//     //     //
//     //     //         // ingredients: {
//     //     //         //     some: {id: {in: ingredientsIdArr}}
//     //     //         // }
//     //     //     }
//     //     // }
//     //     // },
//     //
//     //
//     //     include: {
//     //         products: {
//     //             where: {
//     //                 items: {
//     //                     some:{
//     //                         price: {
//     //                             gte: 481,
//     //                             lte: 485,
//     //                         }
//     //                         }
//     //
//     //                 },
//     //                 // ingredients: {
//     //                 //     where: {
//     //                 //         id: {
//     //                 //           in:ingredientsIdArr
//     //                 //         }
//     //                 //     }
//     //                 //
//     //                 // },
//     //             }
//     //         },
//     //     },
//     //
//     //
//     //     // include: {
//     //     //     products: {
//     //     //         include: {
//     //     //             ingredients: true,
//     //     //             items: true
//     //     //         }
//     //     //     }
//     //     // }
//     // });
//
//
//     // const categories = await prisma.category.findMany({
//     //     include: {
//     //         products: {
//     //             where: {
//     //                 items: {
//     //                     some: {
//     //                         price: {
//     //                             gte: 481,
//     //                             lte: 485,
//     //                         }
//     //                     }
//     //
//     //                 },
//     //             }
//     //         },
//     //     },
//     // });
//
//     // const categories = await prisma.category.findMany({
//     //     include: {
//     //         products: {
//     //             include: {
//     //                 ingredients: true,
//     //                 items: true
//     //             }
//     //         }
//     //     }
//     // });
//
//
//     // const categories = await prisma.category.findMany({
//     //     include: {
//     //         products: {
//     //             where: {
//     //                 items: {
//     //                     some: {
//     //                         price: {
//     //                             gte: 481,
//     //                             lte: 485,
//     //                         }
//     //                     }
//     //
//     //                 },
//     //             }
//     //         },
//     //     },
//     // });
//
//
//     // const categories = await prisma.category.findMany({
//     //     include: {
//     //         products: {
//     //             include: {
//     //                 ingredients: true,
//     //                 items: {
//     //                     where: {
//     //                         price: {
//     //                             gte: 481,
//     //                             lte: 485,
//     //                         }
//     //                     }
//     //
//     //                 },
//     //             }
//     //         }
//     //     }
//     // });
//
//
//     // const categories = await prisma.category.findMany({
//     //     include: {
//     //         products: {
//     //             where: {
//     //                 items: {
//     //                     some: {
//     //                         price: {
//     //                             gte: 481,
//     //                             lte: 485,
//     //                         }
//     //                     }
//     //
//     //                 },
//     //             }
//     //         },
//     //     },
//     // });
//
//
//
//     //
//     // const categories = await prisma.category.findMany({
//     //     include: {
//     //         products: {
//     //             include: {
//     //                 ingredients: true,
//     //                 items: {
//     //                     where: {
//     //                         price: {
//     //                             gte: 481,
//     //                             lte: 485,
//     //                         }
//     //                     }
//     //
//     //                 },
//     //             }
//     //         }
//     //     }
//     // });
//
//
//     const categories = await prisma.category.findMany({
//         include: {
//             products: {
//                 where: {
//                     items: {
//                         some: {
//                             price: {
//                                 gte: 481,
//                                 lte: 485,
//                             }
//                         }
//
//                     },
//                 },
//                 include: {
//                     ingredients: true,
//                     items: {
//                         where: {
//                             price: {
//                                 gte: 481,
//                                 lte: 485,
//                             }
//                         }
//
//                     },
//                 }
//             },
//         },
//     });
//
//
//     console.log('categoriess', JSON.stringify(categories));
//
//     const cats = categories.filter(category => category.products.length > 0)
//
//     return (
//         <>
//             <Container className='mt-10'>
//                 <Title size={'2xl'} text={"Все пиццы"} className={"font-extrabold"}/>
//             </Container>
//             <TopBar items={cats}/>
//             {/*<div className={"h[3000px]"}></div>*/}
//             <Container className={'mt-10 pb-14'}>
//                 <div className={'flex gap-[60px]'}>
//                     {/*Фильтрация*/}
//                     <div className={'w-[250px]'}>
//                         <Suspense fallback={'loading...'}>
//                             <Filters/>
//                         </Suspense>
//                     </div>
//                     <div className={'flex-1'}>
//                         <div className={'flex flex-col gap-16'}>
//                             {cats.map((category) => (
//                                 <ProductsGroupList
//                                     key={category.id}
//                                     categoryId={category.id}
//                                     title={category.name}
//                                     items={category.products}/>
//                             ))}
//                         </div>
//                     </div>
//
//                 </div>
//             </Container>
//         </>
//     );
// }
