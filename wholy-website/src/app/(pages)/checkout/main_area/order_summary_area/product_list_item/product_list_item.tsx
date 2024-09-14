import { CSSProperties, FC } from "react";

import Image from "next/image";

import { ListItem } from "@/app/components/list_item/list_item";
import { Leading } from "@/app/components/list_item/leading";
import { Main } from "@/app/components/list_item/main";
import { Trailing } from "@/app/components/list_item/trailing";

import styles from "./product_list_item_styles.module.scss";
import classNames from "classnames";
import { CartLineItemUiState, CheckoutPageViewModel } from "../../../view_model";

export interface ProductListItemProps {
    uiState: CartLineItemUiState;
    viewModel: CheckoutPageViewModel;
    style?: CSSProperties;
    className?: string;
}

export function ProductListItem(props: ProductListItemProps) {
    return (
        <ListItem style={props.style} className={classNames(styles.product_list_item, props.className)}>
            <Leading>
                <Image src={props.uiState.thumbnail} alt="" width={300} height={300} />
            </Leading>

            <Main>
                <h3>{props.uiState.productName}</h3>
                
                <h3>x{props.uiState.quantity}</h3>

                <h3>&#x20B9; {props.uiState.unitPrice}</h3>
            </Main>

            <Trailing>
                <span>{props.uiState.totalPrice}</span>
            </Trailing>
        </ListItem>
    );
};