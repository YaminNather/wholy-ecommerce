import { AddToCartUseCase } from "@/app/use_cases/add_to_cart_use_case";
import { useMemo, useState } from "react";
import { container } from "tsyringe";

export function useViewModel(productId: string, productPrice: number): ProductPageViewModel {
  let addToCartUseCase = useMemo(() => container.resolve(AddToCartUseCase), []);

  let [isLoading, setIsLoading] = useState<boolean>(false);
  let [quantity, setQuantity] = useState<number>(0);
  
  return {
    isLoading: isLoading,
    quantity: quantity,
    totalPrice: (productPrice / 100) * quantity,
    isAddToCartButtonEnabled: quantity !== 0,
    
    incrementQuantityButtonClicked: () => setQuantity((value) => value + 1),
    
    decrementQuantityButtonClicked: () => setQuantity((value) => Math.max(0, value - 1)),
    
    addToCartButtonClicked: () => {
      console.log("Add to cart button clicked");

      async function asyncPart() {
        setIsLoading(true);
        
        try { 
          await addToCartUseCase.add(productId, quantity);
        }
        catch (exception) {
          throw exception;
        }
        finally {
          setIsLoading(false);
        }
        
        alert("Added to cart");
        setQuantity(0);
      }

      asyncPart();
    }
  };
}

export interface ProductPageViewModel {
  readonly isLoading: boolean;
  readonly quantity: number;
  readonly totalPrice: number;
  readonly isAddToCartButtonEnabled: boolean;
  
  readonly incrementQuantityButtonClicked: () => void;
  readonly decrementQuantityButtonClicked: () => void;
  readonly addToCartButtonClicked: () => void;
}