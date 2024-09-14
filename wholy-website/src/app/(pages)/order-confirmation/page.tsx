import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

import handsImage from "./assets/hands.png";
import badgeImage from "./assets/badge.png";
import leavesImage from "./assets/leaves.png";

import { UIProducts } from "@/app/product_ui_details/ui_products";
import { redTexturedBackgroundImage } from "@/app/common_imported_images/textured_backgrounds";

import styles from "./order_confirmation_page_styles.module.scss"; 

export default function OrderConfirmationPage() {
    return (
        <div className={styles.order_confirmation_page}>
            <Image src={redTexturedBackgroundImage} alt="" className={classNames("background_image", styles.background_image)} />

            <Image src={handsImage} alt="" className={classNames("background_prop", styles.background_hands)} />
            
            <Image src={badgeImage} alt="" className={classNames(styles.badge)} />
            
            <Image src={UIProducts.strawberry.wrappedCookieImage} alt="" className={classNames(styles.strawberry_cookie)} />
                        
            <Image src={leavesImage} alt="" className={classNames(styles.leaves)} />
            
            <Image src={UIProducts.strawberry.fruits[0]} alt="" className={classNames(styles.fruit, styles.strawberry)} />
            
            <Image src={UIProducts.blueberry.fruits[0]} alt="" className={classNames(styles.fruit, styles.blueberry)} />
            
            <Image src={UIProducts.fig.fruits[0]} alt="" className={classNames(styles.fruit, styles.fig)} />

            <div className={classNames("light_theme", styles.main_content_container)}>
                <h1>Congratulations,<br /> your order has been placed.</h1>
                
                <p className={styles.main_text}>
                    Do take a look outside your window now and then, it should arrive shortly.
                    <br />Or you could track your order here.
                </p>                                

                <Link href="/orders"><button className={classNames("button_outline", styles.track_your_order_button)}>TRACK YOUR ORDER HERE</button></Link>

                <p className={styles.secondary_text}>Or dont, we cant tell you what to do!</p>

                <Link className={styles.to_home_page_button} href="/">{"<"} HOME PAGE</Link>
            </div>
        </div>
    );
};