"use client";

import 'reflect-metadata';

import classNames from "classnames";
import Image from "next/image";

import styles from "./product_page_styles.module.scss";

import { TopSection } from "./top_section/top_section";
import { NavBarSystem } from "@/app/components/nav_bar/nav_bar_system";
import { IngredientsSection } from "./ingredients_section/ingredients_section";
import { CallToActionSection } from "./call_to_action_section/call_to_action_section";
import { UniqueSellingPointsSection } from "./unique_selling_points_section/unique_selling_points_section";
import { FooterSection } from "@/app/components/common_sections/footer_section/footer_section";
import { ReviewSection } from "./review_section/review_section";


import { UIProduct } from "@/app/product_ui_details/ui_product";
import { UIProducts } from "@/app/product_ui_details/ui_products";

import { ProductPageViewModel, useViewModel } from "./view_model";
import { FullScreenLoadingIndicatorModal } from '@/app/components/full_screen_loading_indicator_modal/full_screen_loading_modal';

export interface UseClientProductPageProps {
    readonly id: string;
    readonly name: string;
    readonly images: string[];
    readonly price: number;
}

export default function UseClientProductPage(props: UseClientProductPageProps) {
    let uiProduct: UIProduct = UIProducts.withId(props.id)!;

    let viewModel: ProductPageViewModel = useViewModel(props.id, props.price);

    return (
        <>
            <NavBarSystem colorScheme={"light"} />
            
            <FullScreenLoadingIndicatorModal isVisible={viewModel.isLoading} />

            <TopSection viewModel={viewModel} productId={props.id} productName={props.name} images={props.images} price={props.price} />

            <div className={styles.colored_sections_container}>
                <Image src={uiProduct.concentricCirclesImage} alt="" className={classNames("background_prop", styles.concentric_circles)} />

                <IngredientsSection productId={props.id} uiProduct={uiProduct} />

                <UniqueSellingPointsSection productId={props.id} />
            </div>

            <ReviewSection />

            <CallToActionSection />

            <FooterSection />
        </>
    );
}