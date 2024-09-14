import { CSSProperties, FC } from "react";
import classNames from "classnames";

import styles from "./coupon_code_form_styles.module.scss";
import { YellowUnderline } from "@/app/components/text_highlighters/underline/underline";
import { CheckoutPageViewModel } from "../../../view_model/view_model";

export interface CouponCodeFormProps {
    readonly viewModel: CheckoutPageViewModel;
    style?: CSSProperties;
    className?: string;
}

export function CouponCodeForm(props: CouponCodeFormProps) {
    const { viewModel } = props;

    return (
        <div style={props.style} className={classNames("dark_theme", styles.coupon_code_form, props.className)}>
            <YellowUnderline><p className={"personalized_text"}>Got a coupon?</p></YellowUnderline>

            <div className={styles.input_field_area}>
                <input
                    placeholder="Enter Coupon Code" 
                    value={viewModel.couponCodeFieldValue} 
                    onChange={(event) => viewModel.couponCodeFieldValueChanged(event.target.value)} 
                />

                <button className={"button_yellow"} onClick={(event) => viewModel.applyCouponCodeButtonClicked()}>APPLY</button>
            </div>
        </div>
    );
};