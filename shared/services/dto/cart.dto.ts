import { Cart, CartItem, Ingredient, Product, ProductItem } from '@prisma/client';

export type CartItemDTO = CartItem & {
  productItem: ProductItem & {
    product: Product;
  };
  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

//TODO унести куда-нибудь, например в какие нибудь контракты? используется на фронте и в эндпоинтах
export interface CreateCartItemValues {
  productItemId: string;
  ingredients?: string[];
}
