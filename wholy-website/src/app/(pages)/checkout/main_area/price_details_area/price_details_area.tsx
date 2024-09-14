import { CSSProperties, useState } from "react";
import classNames from "classnames";
import { Accordion } from "@/app/components/accordion/accordion";
import { Header } from "@/app/components/accordion/header";
import { Content } from "@/app/components/accordion/content";

import styles from "./price_details_area_styles.module.scss";
import { CheckoutPageViewModel } from "../../view_model/view_model";

export interface PriceDetailsAreaProps {
    viewModel: CheckoutPageViewModel;
    className?: string;
    style?: CSSProperties;
}

export function PriceDetailsArea(props: PriceDetailsAreaProps) {
    const { viewModel } = props;

    const [isSubDetailsAreaOpened, setIsSubDetailsAreaOpened] = useState<boolean>(true);

    // const couponCode: string = "123";

    // function buildCouponCodeDiscountArea(): ReactNode {
    //     if (viewModel.couponCode === undefined)
    //         return <></>;

    //     return (
    //         <div className={classNames(styles.detail_container, styles.coupon_discount_detail_container)}>
    //             <div className={styles.left_area}>
    //                 <p>Coupon Discount</p>

    //                 <p className={styles.coupon_code}>{viewModel.couponCode}</p>

    //                 <button
    //                     onClick={viewModel.removeCouponCodeButtonClicked}
    //                     style={{ display: (!viewModel.isUsingCouponCode) ? "none" : undefined }}
    //                     className={classNames("icon_button", styles.remove_applied_coupon_code_button)}
    //                 >
    //                     <span className={classNames("material-symbols-outlined")}>remove</span>
    //                 </button>
    //             </div>

    //             <p>- &#x20B9; {viewModel.couponCodeDiscountPrice}</p>

    //         </div>
    //     );
    // };

    return (
        <div style={props.style} className={classNames(props.className, styles.price_details_area)}>
            <Accordion isExpanded={isSubDetailsAreaOpened}>
                <Header onToggled={(isExpanded) => setIsSubDetailsAreaOpened(isExpanded)}>
                    <h6 className={styles.heading}>Price Summary</h6>
                </Header>

                <Content>
                    <div className={styles.detail_container}>
                        <p>Item Subtotal</p>

                        <p>&#x20B9; {viewModel.priceSummary.subtotal}</p>
                    </div>
                    
                    {/* <div className={styles.detail_container}>
                        <p className={styles.name}>Item Discount</p>

                        <p className={styles.value}>- &#x20B9; 101</p>
                    </div> */}
                    
                    {/* {buildCouponCodeDiscountArea()} */}
                    
                    {/* <div className={styles.detail_container}>
                        <p>Shipping</p>

                        <p>
                            <span style={{textDecoration: (hasAboveHundredDiscount) ? "line-through" : "revert"}}>
                                &#x20B9; {viewModel.shippingCost}
                            </span> 
                            &nbsp;<span style={{display: (hasAboveHundredDiscount) ? "revert" : "none"}}>&#x20B9; 0</span>
                        </p>
                    </div> */}
                </Content>
            </Accordion>            

            <div className={styles.detail_container}>
                <p className={classNames(styles.name, styles.heading)}>Order Total</p>

                <p className={styles.value}>{viewModel.priceSummary.total}</p>
            </div>
        </div>
    );
};