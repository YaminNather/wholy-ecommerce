import Link from "next/link";
import Image from "next/image";

import styles from "./cart_items_area_styles.module.scss";

import { CartItemListItem } from "./cart_item_list_item";
import KeepItRealImage from "./assets/keep-it-real.png";
import { CartViewModel } from "../../view_model";

export interface CartItemProps {
    viewModel: CartViewModel;
} 

export function CartItemsArea({ viewModel }: CartItemProps) {
    function buildCartItemsList() {
        if(viewModel.items.length === 0) {
            return (
                <>
                    <Image src={KeepItRealImage} alt="" className={styles.keep_it_real} />

                    <p className={styles.empty_cart_label}>The cart is really really empty. Bag some wholesome goodies and fill up your cart!</p>

                    <Link href="/shop">
                        <button onClick={() => viewModel.returnToShopButtonClicked()} className={styles.buy_now_button}>RETURN TO SHOP</button>
                    </Link>
                </>
            );
        }

        return (
            <>
                <ul className={styles.cart_items_list}>
                    {viewModel.items.map(
                        (value, index, array) => {
                            return (
                                <li key={value.productId}>
                                    <CartItemListItem viewModel={viewModel} uiState={value} />
                                </li>
                            );
                        }
                    )}
                </ul>
            </>
        );
    }

    return (
        <div className={styles.cart_area}>
            {buildCartItemsList()}
        </div>
    );
};