import { FC } from "react";
import Image from "next/image";
import styles from "./call_to_action_section_styles.module.scss";
import { UIProducts } from "@/app/product_ui_details/ui_products";
import { ProductCard } from "./product_card/product_card";
import classNames from "classnames";
import { greenTearEffectFlippedImage } from "@/app/common_imported_images/textured_backgrounds";

export const CallToActionSection: FC = (props) => {
    return (
        <section id="call_to_action_section" className={classNames("light_theme", styles.section)}>
            <Image src={greenTearEffectFlippedImage} alt="" className={classNames("tear_effect", styles.tear_effect)} />

            <div className={classNames(styles.container)}>
                <h1>If you like one, <br /> <strong>you&apos;re sure to like more!</strong></h1>
                
                <div className={classNames("dark_theme", styles.grid_area)}>
                    <div className={classNames("container", styles.grid)}>
                        {UIProducts.array.map(
                            (value, index, array) => {
                                return (
                                    <ProductCard key={value.id} uiProduct={value} backfaceText={backFaceText[value.id]}  />
                                );
                            }
                        )}
                    </div>
                    
                    {/* <Image src={multiColoredWavesImage} alt="" className={styles.multi_colored_waves} /> */}
                </div>
            </div>
        </section>
    );
};

const backFaceText: { [key: string]: string } = {
    [UIProducts.blueberry.id]: "Eat your blues away with Blueberry!",
    [UIProducts.pineapple.id]: "No one has time to cut and carve a pineapple! we've done it all for you! Welcoming Fine Pineapple!",
    [UIProducts.strawberry.id]: "Who doesn't like a good sweet tasting strawberry treat. Merry Strawberry!",
    [UIProducts.fig.id]: "Fig'ured out that this was the most delicious form of figs. Here comes Fig!"
};
