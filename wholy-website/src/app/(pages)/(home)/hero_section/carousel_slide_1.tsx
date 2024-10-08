import { FC } from "react";
import Image from "next/image";
import styles from "./carousel_slide_1_styles.module.scss";
import { greenPlant1Image } from "@/app/common_imported_images/plants";
import classNames from "classnames";
import { greenTexturedBackgroundImage } from "@/app/common_imported_images/textured_backgrounds";
import commonCarouselSlideStyles from "./common_carousel_slide_styles.module.scss";

import personWithBarsImage from "./assets/person-with-bars.png";
import { YellowUnderline } from "@/app/components/text_highlighters/underline/underline";
import { YellowCircled } from "@/app/components/text_highlighters/circled/circled";
import { yellowCurvesImages } from "@/app/common_imported_images/curves";
import { UIProducts } from "@/app/product_ui_details/ui_products";
import Link from "next/link";

export const CarouselSlide1: FC = (props) => {
    return (
        <div className={classNames(commonCarouselSlideStyles.carousel_slide, styles.carousel_slide_1)}>
            <Image src={greenTexturedBackgroundImage} alt="" className="background_image" />

            <Image src={UIProducts.strawberry.fruits[0]} alt="" className={classNames("background_prop", styles.bottom_left_strawberry_0)} />

            <Image src={UIProducts.strawberry.fruits[0]} alt="" className={classNames("background_prop", styles.bottom_left_strawberry_1)} />

            <Image src={UIProducts.fig.fruits[1]} alt="" className={classNames("background_prop", styles.fig_1)} />

            <Image src={UIProducts.blueberry.fruits[1]} alt="" className={classNames("background_prop", styles.blueberry_0)} />

            {/* <Image src={strawberryImages[1]} alt="" className={classNames("background_prop", styles.strawberry_1)} /> */}

            <Image src={UIProducts.pineapple.fruits[0]} alt="" className={classNames("background_prop", styles.bottom_right_pineapple)} />

            <Image src={greenPlant1Image} alt="" className={classNames("background_prop", styles.plant)} />

            <Image src={yellowCurvesImages[1]} alt="" className={classNames("background_prop", styles.yellow_curve_0)} />

            <Image src={yellowCurvesImages[0]} alt="" className={classNames("background_prop", styles.yellow_curve_1)} />

            <div className={classNames(styles.container)}>
                <div className={styles.left_grid_cell}>
                    <Image src={personWithBarsImage} alt="" />
                </div>

                <div className={styles.right_grid_cell}>
                    <p>
                        Bringing <strong className="personalized_text">wholesomeness</strong> to food in the most 
                        &nbsp;<YellowCircled>Natural</YellowCircled>, 
                        &nbsp;<YellowUnderline>Vegan and delicious</YellowUnderline> way possible!
                    </p>

                    <Link href="/shop">
                        <button className="button_yellow">SHOP THE RANGE</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
