import classNames from "classnames";
import { CSSProperties, FC } from "react";

import styles from "./add_more_area_styles.module.scss";
import { ProductCard } from "./product_card/product_card";
import { UIProducts } from "@/app/product_ui_details/ui_products";
import { CartViewModel } from "../view_model";

export interface AddMoreAreaProps {
    viewModel: CartViewModel;
    style?: CSSProperties;
    className?: string;
}

export const AddMoreArea: FC<AddMoreAreaProps> = (props) => {
    return (
        <div style={props.style} className={classNames(styles.add_more_area, props.className)}>
            <p className={styles.heading}>If you like one, quickly add more!</p>

            <div className={styles.products_grid}>
                {props.viewModel.products.map(
                    (value, array, index) => {
                        return (
                            <ProductCard key={value.productId} viewModel={props.viewModel} product={value} backFaceText={backFaceText[value.variantId]} />
                        );
                    }
                )}
            </div>
        </div>
    );
};

const backFaceText: { [key: string]: string } = {
    [UIProducts.blueberry.id]: "Eat your blues away with Blueberry!",
    [UIProducts.pineapple.id]: "No one has time to cut and carve a pineapple! we've done it all for you! Welcoming Fine Pineapple!",
    [UIProducts.strawberry.id]: "Who doesn't like a good sweet tasting strawberry treat. Merry Strawberry!",
    [UIProducts.fig.id]: "Fig'ured out that this was the most delicious form of figs. Here comes Fig!"
};