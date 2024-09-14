import { LineItem } from "@/app/backend_client/cart";

export interface CartLineItemUiState {
    readonly id: string;
    readonly productName: string;
    readonly thumbnail: string;
    readonly quantity: string;
    readonly totalPrice: string;
    readonly unitPrice: string;
}

export function mapCartLineItemToUiState(lineItem: LineItem): CartLineItemUiState {
    return {
        id: lineItem.id,
        productName: lineItem.title,
        thumbnail: lineItem.thumbnail,
        quantity: lineItem.quantity.toString(),
        unitPrice: `₹${lineItem.unitPrice / 100}`,
        totalPrice: `₹${(lineItem.unitPrice * lineItem.quantity) / 100}`,
    };
}