"use client";

import classNames from "classnames";
import { ReactNode, useState } from "react";
import { OrderListItem } from "./order_list_item/order_list_item";
import { NavMenu } from "@/app/components/nav_bar/nav_menu/nav_menu";
import { NavBar } from "@/app/components/nav_bar/nav_bar";
// import { OrderListItemDetails, OrderItemListItemDetails } from "./order_list_item_details";

import styles from "./orders_page_styles.module.scss";

export default function OrderConfirmationPage() {
    const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);

    return (
        <>
            <NavBar colorScheme={"light"} onOpenCartButtonClicked={() => {}} onOpenNavMenuButtonClicked={() => setIsNavMenuOpen(true)} />

            <NavMenu isOpen={isNavMenuOpen} onOpenCartButtonClicked={() => {}} onCloseButtonClicked={() => setIsNavMenuOpen(false)} />

            <div className={styles.order_page}>

                {/* <Image src={backgroundImage} alt="" className={"background_image"} /> */}

                <div className={classNames("light_theme", styles.main_content_container)}>
                    <h1>YOUR ORDERS</h1>

                    <p className={styles.informal_message}>Superfood is on its way!</p>

                    <div className={classNames(styles.orders_list_container)}>
                        {new Array(5).fill(0).map(
                            (_, index): ReactNode => <OrderListItem className={styles.order_list_item} key={index} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};