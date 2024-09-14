import { CSSProperties, FC, MouseEventHandler, useCallback, useState } from "react";
import classNames from "classnames";
import Image from "next/image";

import { FlippingCard, VisibleFace, FrontFace, BackFace } from "@/app/components/flipping_card/flipping_card";

import styles from "./flipping_product_card_styles.module.scss";
import { UIProduct } from "@/app/product_ui_details/ui_product";

import flippableIndicatorImage from "@/app/assets/flippable-indicator.png";
import { NextRouter, useRouter } from "next/router";

export interface FlippingProductCardProps {
    style?: CSSProperties;
    className?: string;
    uiProduct: UIProduct;
    backFaceText: string;
}

export const FlippingProductCard: FC<FlippingProductCardProps> = (props) => {
    const [isHovering, setIsHovering] = useState<boolean>(false);

    const onMouseEnter = useCallback(
        ((event): void => {
            setIsHovering(true);
        }) as MouseEventHandler,
        []
    );

    const onMouseLeave = useCallback(
        ((event): void => {
            setIsHovering(false);
        }) as MouseEventHandler,
        []
    );

    return (
        <div onClick={(event) => window.location.href = `/product/${props.uiProduct.name.toLowerCase()}`} className={classNames("dark_theme", styles.card_container)}>
            <FlippingCard
                visibleFace={(!isHovering) ? VisibleFace.front : VisibleFace.back} 
                duration={300}
                onMouseEnter={onMouseEnter} 
                onMouseLeave={onMouseLeave}
                style={{backgroundColor: props.uiProduct.color, ...props.style}} 
                className={classNames(styles.flipping_card, props.className)}
            >
                <FrontFace className={styles.front_face}>
                    <Image src={flippableIndicatorImage} alt=""  className={styles.flippable_indicator} />

                    <div className={styles.cookie_hider_container}>
                        <Image src={props.uiProduct.wrappedCookiePortraitImage} alt="" className={styles.cookie} />
                        
                        <Image src={props.uiProduct.wrappedCookiePortraitImage} alt="" className={classNames(styles.cookie, styles.cookie_shadow)} />
                    </div>
                </FrontFace>

                <BackFace className={styles.back_face}>
                    <p>{props.backFaceText}</p>
                </BackFace>
                
                <Image src={props.uiProduct.fruits[0]} alt="" className={classNames(styles.corner_fruit, styles.top_right_fruit)} />
                
                <Image src={props.uiProduct.fruits[1]} alt="" className={classNames(styles.corner_fruit, styles.bottom_left_fruit)} />
            </FlippingCard>

            {/* <Image src={flippableIndicatorImage} alt="" style={{opacity: (flippedOnce) ? 0.0 : 1.0 }} className={styles.flippable_indicator} /> */}
        </div>
    );
};
