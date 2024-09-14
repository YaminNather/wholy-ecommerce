import { BackendClient } from "@/app/backend_client/backend_client";
import { Cart } from "@/app/backend_client/cart";
import { AddToCartUseCase } from "@/app/use_cases/add_to_cart_use_case";
import { DecrementLineItemQuantityUseCase } from "@/app/use_cases/decrement_line_item_quantity_use_case";
import { GetCartUseCase } from "@/app/use_cases/get_cart_use_case";
import { IncrementLineItemQuantityUseCase } from "@/app/use_cases/increment_line_item_quantity_use_case";
import { useMemo, useState } from "react";
import { container } from "tsyringe";

export interface CartViewModel {
    readonly isDismissing: boolean;
    readonly isLoading: boolean;
    readonly total: string;
    readonly items: CartItemUiState[];
    readonly products: ProductCardUiState[];
    readonly isPlaceOrderButtonDisabled: boolean;
    
    readonly opened: () => void;
    readonly returnToShopButtonClicked: () => void;
    readonly onCloseButtonClicked: () => void;
    readonly decrementQuantityButtonClicked: (id: string) => void;
    readonly incrementQuantityButtonClicked: (id: string) => void;
    readonly productCardAddButtonClicked: (id: string) => void;
    readonly dismissed: () => void;
}

export interface CartItemUiState {
    readonly id: string;
    readonly productId: string;
    readonly variantId: string;
    readonly productName: string;
    readonly quantity: string;
}

export interface ProductCardUiState {
    readonly productId: string;
    readonly variantId: string;
    readonly name: string;
    readonly pageLink: string;
}

export function useViewModel(): CartViewModel {
    const getCartUseCase = useMemo(() => container.resolve(GetCartUseCase), []);
    const decrementLineItemQuantityUseCase = useMemo(() => container.resolve(DecrementLineItemQuantityUseCase), []);
    const incrementLineItemQuantityUseCase = useMemo(() => container.resolve(IncrementLineItemQuantityUseCase), []);
    const addToCartUseCase = useMemo(() => container.resolve(AddToCartUseCase), []);
    const backendClient = useMemo(() => container.resolve(BackendClient), []);

    const [isDismissing, setIsDismissing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [total, setTotal] = useState<string>("0");
    const [items, setItems] = useState<CartItemUiState[]>([]);
    const [products, setProducts] = useState<ProductCardUiState[]>([]);
    const [isPlaceOrderButtonDisabled, setIsPlaceOrderButtonDisabled] = useState<boolean>(false);
    
    async function loadCart() {
        const cart: Cart | null = await getCartUseCase.getCart();
        if (cart !== null) {
            const itemsUiState: CartItemUiState[] = cart
                .items
                .map(
                    (element) => ({
                        id: element.id,
                        productId: element.productId,
                        productName: element.title,
                        quantity: `${element.quantity} bars`,
                        variantId: element.variantId,
                    } as CartItemUiState)
                );

            setItems(itemsUiState);
            setTotal((cart.total / 100).toString());
        }
    }
    
    return {
        isDismissing: isDismissing,
        isLoading: isLoading,
        total: total,
        items: items,
        products: products,
        isPlaceOrderButtonDisabled: isPlaceOrderButtonDisabled,

        opened: async () => {
            await loadCart();

            const productItemsUiState: ProductCardUiState[] = (await backendClient.products.list({}))
                .products
                .map(
                    (element) => ({
                        productId: element.productId,
                        variantId: element.variantId,
                        name: element.title,
                        pageLink: `/product/${element.handle}`,
                    } as ProductCardUiState)
                );

            setProducts(productItemsUiState);

            setIsLoading(false);

        },
        
        returnToShopButtonClicked: () => {},
        
        onCloseButtonClicked: () => setIsDismissing(true),

        decrementQuantityButtonClicked: async (id: string) => { 
            setIsLoading(true);
            try {
                await decrementLineItemQuantityUseCase.decrement(id, 1);
                await loadCart();
            }
            catch(e) {
                console.log(e);
                alert("Failed to decrease quantity");
            }
            finally {
                setIsLoading(false);
            }
        },

        incrementQuantityButtonClicked: async (id: string) => {
            setIsLoading(true);
            try {
                await incrementLineItemQuantityUseCase.increment(id, 1);
                await loadCart();
            }
            catch(e) {
                console.log(e);
                alert('Failed to increase quantity');
            }
            finally {
                setIsLoading(false);
            }
         },

        productCardAddButtonClicked: async (id: string) => {
            setIsLoading(true);
            try {
                await addToCartUseCase.add(id, 1);
            }
            catch (e) {
                console.log(e);
                alert('Failed to add to cart');
            }
            finally {
                setIsLoading(false);
            }

            try { 
                await loadCart(); 
            }
            catch (e) { 
                console.log(e); 
            }
            finally {
                setIsLoading(false);
            }
            
        },

        dismissed: () => setIsDismissing(false),
    } as CartViewModel;
}