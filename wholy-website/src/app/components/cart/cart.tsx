import { useEffect } from "react";
import classNames from "classnames";

import { CartViewModel, useViewModel } from "./view_model";
import styles from "./cart_styles.module.scss";

import { CartItemsArea } from "./checkout_section/cart_items_list/cart_items_area";

import { AddMoreArea } from "./add_more_area/add_more_area";
import { LoadingIndicatorModal } from "../loading_indicator_modal/loading_indicator_modal";

export interface CartProps {
    readonly isOpen: boolean;
    readonly onDismiss: () => void;
}

export function Cart({ isOpen, onDismiss }: CartProps) {
    const viewModel: CartViewModel = useViewModel();
    
    useEffect( () => { viewModel.opened(); }, [] );
    
    useEffect(
        () => {
            if (viewModel.isDismissing) {
                onDismiss();
                viewModel.dismissed();
            }
        }, 
        [viewModel.isDismissing]
    );

    return (
        <>
            <div style={{display: (isOpen) ? undefined : "none"}} className={classNames(styles.cart_container)}>
                <LoadingIndicatorModal isVisible={viewModel.isLoading} />
                
                <div style={{overflowY: (viewModel.isLoading) ? "hidden" : undefined}} className={classNames("light_theme", styles.cart)}>

                    <div className={styles.tool_bar}>
                        <button 
                            className={classNames("icon_button", styles.close_button)}
                            onClick={(_) => viewModel.onCloseButtonClicked()}
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        
                        <h1>Your Cart <span style={{fontWeight: "400"}}>({viewModel.items.length} Items)</span></h1>                        
                    </div>

                    <div className={styles.area}>
                        <CartItemsArea viewModel={viewModel} />

                        <div className={styles.detail_container}>
                            <p className={classNames(styles.name, styles.heading)}>Order Total</p>

                            <p className={styles.value}>&#x20B9; {viewModel.total}</p>
                        </div>

                        <hr />
                    </div>
                    
                    <AddMoreArea className={classNames(styles.area, styles.add_more_area)} viewModel={viewModel} />

                    <div className={classNames(styles.area)}>

                        <a href="/checkout">
                            <button className={classNames("button_yellow", styles.place_order_button)} disabled={viewModel.isPlaceOrderButtonDisabled} >
                                PLACE ORDER
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};