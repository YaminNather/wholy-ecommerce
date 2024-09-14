import { CSSProperties, FC, useContext } from "react";
import classNames from "classnames";

import { ProductListItem } from "./product_list_item/product_list_item";

import styles from "./order_summary_area_styles.module.scss";
import { CheckoutPageViewModel } from "../../view_model/view_model";

export interface OrderSummaryAreaProps {
    readonly viewModel: CheckoutPageViewModel;
    style?: CSSProperties;
    className?: string;
}

export function OrderSummaryArea(props: OrderSummaryAreaProps) {
    const { viewModel } = props;

    if (viewModel.cartLineItems.length === 0) {
        return <></>;
    }

    return (
        <div style={props.style} className={classNames(styles.order_summary_area, props.className)}>
            <h2>Order Summary</h2>

            <ul>
                {viewModel.cartLineItems?.map( 
                    (value, index, array) => {
                        return (
                            <li key={index}>
                                <ProductListItem uiState={value} viewModel={viewModel} /> 
                            </li>
                        );
                    }
                )}
            </ul>
        </div>
    );
};