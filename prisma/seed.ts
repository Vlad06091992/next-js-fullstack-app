import {Prisma} from '@prisma/client';
import {categories, _ingredients, products, UUIDS} from './constants';
import {prisma} from './client';
import {hashSync} from 'bcrypt';

const randomDecimalNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = (
    {
        productId,
        pizzaType,
        id,
        size,
    }: {
        productId: string;
        id: string;
        pizzaType?: 1 | 2;
        size?: 20 | 30 | 40;
    }) => {
    return {
        id,
        productId,
        price: randomDecimalNumber(190, 600),
        pizzaType,
        size,
        // } as Prisma.ProductItemUncheckedCreateInput;
    }
};

async function up() {

    await prisma.user.createMany({
        data: [
            {
                id: UUIDS.users.user1Id,
                fullName: 'User Test',
                email: 'user@test.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'USER',
            },
            {
                id: UUIDS.users.user2Id,
                fullName: 'Admin Admin',
                email: 'admin@test.ru',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'ADMIN',
            },
        ],
    });

    await prisma.category.createMany({
        data: categories,
    });

    await prisma.ingredient.createMany({
        data: _ingredients,
    });

    await prisma.product.createMany({
        data: products,
    });

    // 3 пиццы с одной категорией "0af2eb5f-206e-4872-9c35-169c9d263c67",

    const pizza1 = await prisma.product.create({
        data: {
            id: UUIDS.pizza.pizza1Id,
            name: 'Пепперони фреш',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
            categoryId: UUIDS.categories.cat1Id,
            ingredients: {
                connect: _ingredients.slice(0, 5),
            },
        },
    });

    const pizza2 = await prisma.product.create({
        data: {
            id: UUIDS.pizza.pizza2Id,
            name: 'Сырная',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
            categoryId: UUIDS.categories.cat1Id,
            ingredients: {
                connect: _ingredients.slice(5, 10),
            },
        },
    });

    const pizza3 = await prisma.product.create({
        data: {
            id: UUIDS.pizza.pizza3Id,
            name: 'Чоризо фреш',
            imageUrl:
                'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
            categoryId: UUIDS.categories.cat1Id,
            ingredients: {
                connect: _ingredients.slice(10, 40),
            },
        },
    });

    await prisma.productItem.createMany({
        data: [
            // Пицца "Пепперони фреш"
            generateProductItem({productId: pizza1.id, pizzaType: 1, size: 20, id: UUIDS.productItems.productItem1Id}),
            generateProductItem({productId: pizza1.id, pizzaType: 2, size: 30, id: UUIDS.productItems.productItem2Id}),
            generateProductItem({productId: pizza1.id, pizzaType: 2, size: 40, id: UUIDS.productItems.productItem3Id}),

            // Пицца "Сырная"
            generateProductItem({productId: pizza2.id, pizzaType: 1, size: 20, id: UUIDS.productItems.productItem4Id}),
            generateProductItem({productId: pizza2.id, pizzaType: 1, size: 30, id: UUIDS.productItems.productItem5Id}),
            generateProductItem({productId: pizza2.id, pizzaType: 1, size: 40, id: UUIDS.productItems.productItem6Id}),
            generateProductItem({productId: pizza2.id, pizzaType: 2, size: 20, id: UUIDS.productItems.productItem7Id}),
            generateProductItem({productId: pizza2.id, pizzaType: 2, size: 30, id: UUIDS.productItems.productItem8Id}),
            generateProductItem({productId: pizza2.id, pizzaType: 2, size: 40, id: UUIDS.productItems.productItem9Id}),

            // Пицца "Чоризо фреш"
            generateProductItem({productId: pizza3.id, pizzaType: 1, size: 20, id: UUIDS.productItems.productItem10Id}),
            generateProductItem({productId: pizza3.id, pizzaType: 2, size: 30, id: UUIDS.productItems.productItem11Id}),
            generateProductItem({productId: pizza3.id, pizzaType: 2, size: 40, id: UUIDS.productItems.productItem12Id}),

            // Остальные продукты
            generateProductItem({productId: UUIDS.products.product1, id: UUIDS.productItems.productItem13Id}),
            generateProductItem({productId: UUIDS.products.product2, id: UUIDS.productItems.productItem14Id}),
            generateProductItem({productId: UUIDS.products.product3, id: UUIDS.productItems.productItem15Id}),
            generateProductItem({productId: UUIDS.products.product4, id: UUIDS.productItems.productItem16Id}),
            generateProductItem({productId: UUIDS.products.product5, id: UUIDS.productItems.productItem17Id}),
            generateProductItem({productId: UUIDS.products.product6, id: UUIDS.productItems.productItem18Id}),
            generateProductItem({productId: UUIDS.products.product7, id: UUIDS.productItems.productItem19Id}),
            generateProductItem({productId: UUIDS.products.product8, id: UUIDS.productItems.productItem20Id}),
            generateProductItem({productId: UUIDS.products.product9, id: UUIDS.productItems.productItem21Id}),
            generateProductItem({productId: UUIDS.products.product10, id: UUIDS.productItems.productItem22Id}),
            generateProductItem({productId: UUIDS.products.product11, id: UUIDS.productItems.productItem23Id}),
            generateProductItem({productId: UUIDS.products.product12, id: UUIDS.productItems.productItem24Id}),
            generateProductItem({productId: UUIDS.products.product13, id: UUIDS.productItems.productItem25Id}),
            generateProductItem({productId: UUIDS.products.product14, id: UUIDS.productItems.productItem26Id}),
            generateProductItem({productId: UUIDS.products.product15, id: UUIDS.productItems.productItem27Id}),
            generateProductItem({productId: UUIDS.products.product16, id: UUIDS.productItems.productItem28Id}),
            generateProductItem({productId: UUIDS.products.product17, id: UUIDS.productItems.productItem29Id})
        ],
    });

    await prisma.cart.createMany({
        data: [
            {
                id: UUIDS.carts.cart1Id,
                userId: UUIDS.users.user1Id,
                totalAmount: 0,
                token: '11111',
            },
            {
                id: UUIDS.carts.cart2Id,
                userId: UUIDS.users.user2Id,
                totalAmount: 0,
                token: '222222',
            },
        ],
    });

    await prisma.cartItem.create({
        data: {
            id: UUIDS.cartItems.cartItem1Id,
            productItemId: UUIDS.productItems.productItem1Id,
            // productItemId: "8a885bac-e8e9-4b1d-9613-465b9a2ff0b6",
            cartId: UUIDS.carts.cart1Id,
            quantity: 2,
            ingredients: {
                connect: [{id: UUIDS.ingredients.ingredient1Id}, {id: UUIDS.ingredients.ingredient2Id}, {id: UUIDS.ingredients.ingredient3Id}],
            },
        },
    });

    // await prisma.story.createMany({
    //     data: [
    //         {
    //             previewImageUrl:
    //                 'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
    //         },
    //         {
    //             previewImageUrl:
    //                 'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
    //         },
    //         {
    //             previewImageUrl:
    //                 'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
    //         },
    //         {
    //             previewImageUrl:
    //                 'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
    //         },
    //         {
    //             previewImageUrl:
    //                 'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
    //         },
    //         {
    //             previewImageUrl:
    //                 'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284',
    //         },
    //     ],
    // });
    //
    // await prisma.storyItem.createMany({
    //     data: [
    //         {
    //             storyId: 1,
    //             sourceUrl:
    //                 'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
    //         },
    //         {
    //             storyId: 1,
    //             sourceUrl:
    //                 'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
    //         },
    //         {
    //             storyId: 1,
    //             sourceUrl:
    //                 'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
    //         },
    //         {
    //             storyId: 1,
    //             sourceUrl:
    //                 'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
    //         },
    //         {
    //             storyId: 1,
    //             sourceUrl:
    //                 'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
    //         },
    //     ],
    // });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" CASCADE`;
}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
