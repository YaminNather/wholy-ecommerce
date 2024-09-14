import Image from "next/image";
import classNames from "classnames";

import { CartItemUiState, CartViewModel } from "../../view_model";
import { UIProducts } from "@/app/product_ui_details/ui_products";
import { DecreaseButton, IncreaseButton, QuantityLabel, Stepper } from "@/app/components/stepper";

import styles from "./cart_item_list_item_styles.module.scss";

export interface CartItemListItemProps {
    viewModel: CartViewModel;
    uiState: CartItemUiState;
}

export function CartItemListItem({ viewModel, uiState }: CartItemListItemProps) {
    return (
        <div className={styles.cart_item_list_item}>            
            <Image src={UIProducts.withId(uiState.variantId)!.wrappedCookieImage} alt="" width={518} height={754} className={styles.product_image} />            
            
            <div className={classNames(styles.area, styles.titles_area)}>
                <p className={styles.product_name}>{uiState.productName}</p>

                <Stepper className={styles.quantity_stepper}>
                    <DecreaseButton onClick={(_) => viewModel.decrementQuantityButtonClicked(uiState.id)}>-</DecreaseButton>
                    
                    <QuantityLabel>{uiState.quantity}</QuantityLabel>

                    <IncreaseButton onClick={(_) => viewModel.incrementQuantityButtonClicked(uiState.id)}>+</IncreaseButton>
                </Stepper>

                <p className={styles.price}>&#x20b9;50</p>
            </div>
        </div>
    );
};