import styles from "./main_area_styles.module.scss";
import classNames from "classnames";

import { OrderSummaryArea } from "./order_summary_area/order_summary_area";
import { CheckoutForm } from "./checkout_form/checkout_form";
import { PriceDetailsArea } from "./price_details_area/price_details_area";
import { CheckoutPageViewModel } from "../view_model/view_model";


export interface MainAreaProps {
    readonly viewModel: CheckoutPageViewModel;
}

export function MainArea({viewModel}: MainAreaProps) {
    return (
        <div className={classNames("container", styles.main_area)}>
            <div className={styles.left_grid_cell}>
                <CheckoutForm viewModel={viewModel} />
            </div>

            <div className={styles.right_grid_cell}>
                <OrderSummaryArea viewModel={viewModel} className={styles.order_summary_area} />

                <PriceDetailsArea viewModel={viewModel} className={styles.price_details_area} />
            </div>
        </div>
    );
};