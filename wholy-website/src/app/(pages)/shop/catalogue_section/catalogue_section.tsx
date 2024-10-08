"use client";

import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from "pure-react-carousel";
import { UIProducts } from "../../../product_ui_details/ui_products";

import styles from "./catalogue_section_styles.module.scss";

import 'pure-react-carousel/dist/react-carousel.es.css';
import { Product } from "./product/product";
import classNames from "classnames";
import { useBreakpoint } from "../../../ui_helpers/breakpoint/use_breakpoint";
import { Breakpoint } from "../../../ui_helpers/breakpoint/breakpoint";
import { ServerSideProduct } from "../server_side_product";

export interface CatalogueSectionProps {
    readonly products: ServerSideProduct[];
}

export function CatalogueSection(props: CatalogueSectionProps) {
    const breakpoint: Breakpoint = useBreakpoint();

    return (
        <section id="catalogue" className={classNames("light_theme", styles.section)}>
            <CarouselProvider 
                totalSlides={props.products.length} 
                visibleSlides={(breakpoint != Breakpoint.extraSmall) ? 3 : 1}
                naturalSlideWidth={90} naturalSlideHeight={(breakpoint !== Breakpoint.extraSmall) ? 70 : 90} 
                className={styles.carousel}
            >
                <Slider>
                    {props.products.map(
                        (value, index, array) => {
                            return (
                                <Slide key={index} index={index}>
                                    <div className={classNames(styles.product_card_container)}>
                                        <Product product={value} backFaceText={backFaceText[value.id]} />
                                    </div>
                                </Slide>
                            );
                        }
                    )}
                </Slider>
                
                <div className={styles.carousel_controls}>
                    <ButtonBack className={styles.to_left_button}>
                        <span className="material-icons">keyboard_arrow_left</span>
                    </ButtonBack>
                    
                    <ButtonNext className={styles.to_right_button}>
                        <span className="material-icons">keyboard_arrow_right</span>
                    </ButtonNext>
                </div>
            </CarouselProvider>
        </section>
    );
};

const backFaceText: { [key: string]: string } = {
    [UIProducts.blueberry.id]: "Eat your blues away with Blueberry!",
    [UIProducts.pineapple.id]: "No one has time to cut and carve a pineapple! we've done it all for you! Welcoming Fine Pineapple!",
    [UIProducts.strawberry.id]: "Who doesn't like a good sweet tasting strawberry treat. Merry Strawberry!",
    [UIProducts.fig.id]: "Fig'ured out that this was the most delicious form of figs. Here comes Fig!"
};