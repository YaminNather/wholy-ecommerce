import Image from "next/image";
import styles from "./unique_selling_points_section_styles.module.scss";
import classNames from "classnames";

import { UniqueSellingPointsArea } from "@/app/components/unique_selling_points_area/unique_selling_points_area";
import { productToTexturedBackgroundMap } from "../common/product_to_textured_background_map";

export interface UniqueSellingPointsSectionProps {
    readonly productId: string;
}

export function UniqueSellingPointsSection({ productId }: UniqueSellingPointsSectionProps) {
    return (
        <section id="unique_selling_points_section" className={classNames("light_theme", styles.section)}>
            <Image src={productToTexturedBackgroundMap.get(productId)!} alt="" className={classNames("background_image")} />
            
            {/* <Image src={controller.uiProduct.concentricCirclesImage} alt="" className={classNames("background_prop", styles.concentric_circles)} /> */}

            <UniqueSellingPointsArea className={"dark_theme"} />
        </section>
    );
};
