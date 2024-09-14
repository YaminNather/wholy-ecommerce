"use client";

import { CSSProperties, FC } from "react";
import styles from "./product_styles.module.scss";
import { ProductCard } from "./product_card/product_card";
import classNames from "classnames";
import Link from "next/link";
import { ServerSideProduct } from "../../server_side_product";

export interface ProductProps {
    product: ServerSideProduct;
    backFaceText: string;
    style?: CSSProperties;
    className?: string;
}

export const Product: FC<ProductProps> = (props) => {
    return (
        <div style={props.style} className={classNames(styles.container, props.className)}>
            <div className={styles.flipping_card_container}>
                <ProductCard product={props.product} backFaceText={props.backFaceText} className={styles.flipping_card} />
            </div>

            <p className={styles.product_name}>{props.product.name.toUpperCase()} | {props.product.price}</p>

            <div className={styles.buttons_area}>
                <Link href={`/product/${props.product.handleName}`}>
                    <button>VIEW DETAILS</button>
                </Link>

                <button>BUY NOW</button>
            </div>
        </div>
    );
};