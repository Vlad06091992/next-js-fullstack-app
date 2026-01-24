export interface CartItemProps {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  disabled?: boolean;
  details?: string;
}
