import Image from "next/image";
import styles from "./top_section_styles.module.scss";

import classNames from "classnames";
import { DecreaseButton, IncreaseButton, QuantityLabel, Stepper } from "@/app/components/stepper";

import priceContainerImage from "./assets/price-container.png";
import { ProductImagesCarousel } from "./product_images_carousel/product_images_carousel";

import arrowImage from "../assets/arrow.png";
import { UIProducts } from "@/app/product_ui_details/ui_products";
import { ProductPageViewModel } from "../view_model";

export interface TopSectionProps {
    readonly productId: string;
    readonly productName: string;
    readonly images: string[];
    readonly price: number;
    readonly viewModel: ProductPageViewModel;
}

export function TopSection(props: TopSectionProps) {
    const uiProduct = UIProducts.withId(props.productId)!;
    
    function buildStepper() {
        return (
            <Stepper className={styles.quantity_stepper}>
                <DecreaseButton onClick={(_) => props.viewModel.decrementQuantityButtonClicked()}>-</DecreaseButton>

                <QuantityLabel>{(props.viewModel.quantity === 0) ? 'Add your energy bar' : props.viewModel.quantity}</QuantityLabel>

                <IncreaseButton onClick={(_) => props.viewModel.incrementQuantityButtonClicked()}>+</IncreaseButton>
            </Stepper>
        );
    }


    function  buildPriceContainer() {
        return (
            <div className={styles.price_container}>
                <Image src={priceContainerImage} alt="" className={styles.background} priority={true} />

                <p>&#8377;{props.viewModel.totalPrice.toString()}</p>

                <Image src={arrowImage} alt="" className={styles.arrow} priority={true} />
            </div>
        );
    }

    return (
        <section className={classNames(styles.top_section, "light_theme")}>
            {/* <Image src={greyTexturedBackgroundImage} alt="" className={"background_image"} /> */}

            <div className={classNames("container", styles.container)}>
                <div className={styles.left_grid_cell}>
                    <div className={styles.product_name_container}>
                        <Image src={uiProduct.nameContainerImage} alt="" className={classNames(styles.product_name_background)} priority={true} />
                        
                        <h1 className={classNames("dark_theme", "personalized_text")}>{randomCaseProductNameMap.get(props.productId)!}</h1>

                        {/* <Image src={doodleImage} alt="" className={styles.doodle} /> */}
                    </div>

                    <p className={styles.subtitle}>Cookie Bar</p>

                    {buildStepper()}

                    {buildPriceContainer()}

                    <button 
                        disabled={!props.viewModel.isAddToCartButtonEnabled} 
                        onClick={() => props.viewModel.addToCartButtonClicked()} 
                        className={classNames(styles.get_yours_button, "button_yellow")}
                    >
                        GET YOURS
                    </button>
                </div>

                <div className={styles.right_grid_cell}>
                    <ProductImagesCarousel images={props.images} className={styles.product_carousel} />

                    <p className={styles.description}>
                        {productDescriptions.get(props.productId)!}
                    </p>
                </div>
            </div>
        </section>
    );
};

const randomCaseProductNameMap: Map<string, string> = new Map<string, string>(
    [
        [UIProducts.blueberry.id, "BLUEBeRRY"],
        [UIProducts.pineapple.id, "PiNeAPPLe"],
        [UIProducts.strawberry.id, "STRaWBeRRY"],
        [UIProducts.fig.id, "FIG"]
    ]
);

const productDescriptions: Map<string, string> = new Map<string, string>(
    [
        [UIProducts.strawberry.id, "Who doesn't like a good sweet tasting strawberry treat. A little crispy, a little chewy, lots of fruity and oh so delicious! BTW, 100% vegan plant powered energy."],
        [UIProducts.blueberry.id, "Brilliant blueberry. Little crispy, little chewy, lots of fruity and oh so delicious. And btw 100% vegan plant powered energy."],
        [UIProducts.pineapple.id, "Fine pineapple. Little crispy, little chewy, lots of fruity and oh so delicious. And btw 100% vegan plant powered energy."],
        [UIProducts.fig.id, "Fantastically fruity fig. Little crispy, little chewy, lots of fruity and oh so delicious. And btw 100% vegan plant powered energy."]
    ]
);