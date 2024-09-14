import { CSSProperties, FC, useState } from "react";
import Image from "next/image";
import classNames from "classnames";

import styles from "./product_card_styles.module.scss";

import { FlippingCard, VisibleFace, FrontFace, BackFace } from "@/app/components/flipping_card/flipping_card";
import { UIProduct } from "@/app/product_ui_details/ui_product";

import flippableIndicatorImage from "@/app/assets/flippable-indicator.png";
import { CartViewModel, ProductCardUiState } from "../../view_model";
import { UIProducts } from "@/app/product_ui_details/ui_products";

export interface ProductCardProps {
    style?: CSSProperties;
    className?: string;
    viewModel: CartViewModel;
    product: ProductCardUiState;
    backFaceText: string;
}

export const ProductCard: FC<ProductCardProps> = (props) => {
    const [isHovering, setIsHovering] = useState<boolean>(false);
    
    const uiProduct: UIProduct = UIProducts.withId(props.product.variantId)!;

    return (
        <div className={styles.product_card}>
            <a className={styles.flipping_card_container} href={props.product.pageLink}>
                <FlippingCard
                    visibleFace={(!isHovering) ? VisibleFace.front : VisibleFace.back} 
                    duration={300}
                    onMouseEnter={(event) => setIsHovering(true)} onMouseLeave={(event) => setIsHovering(false)}
                    style={{backgroundColor: uiProduct.color, ...props.style}} className={classNames(styles.flipping_card, props.className)}
                >
                    <FrontFace className={styles.front_face}>
                        <Image src={flippableIndicatorImage} alt="" className={styles.flippable_indicator} />

                        <div className={styles.main}>
                            <Image src={uiProduct.wrappedCookiePortraitImage} alt="" className={styles.cookie} />
                        </div>
                    </FrontFace>

                    <BackFace className={classNames("dark_theme", styles.back_face)}>
                        <p className={styles.back_face_text}>{props.backFaceText}</p>
                    </BackFace>
                    
                    <Image src={uiProduct.fruits[0]} alt="" className={classNames(styles.corner_fruit, styles.top_right_fruit)} />
                    
                    <Image src={uiProduct.fruits[0]} alt="" className={classNames(styles.corner_fruit, styles.bottom_left_fruit)} />
                </FlippingCard>
            </a>

            <button onClick={(event) => { props.viewModel.productCardAddButtonClicked(props.product.variantId) }}>
                ADD
            </button>
        </div>
    );
};