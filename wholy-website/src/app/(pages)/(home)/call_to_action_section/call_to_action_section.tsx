import { FC } from "react";
import Image from "next/image";
import styles from "./call_to_action_section_styles.module.scss";
import { UIProducts } from "@/app/product_ui_details/ui_products";
import { ProductCard } from "./product_card/product_card";
import classNames from "classnames";
import multiColoredWavesImage from "./assets/multi-colored-waves.png";
import Link from "next/link";

export const CallToActionSection: FC = (_) => {
    return (
        <section id="call_to_action_section" className={classNames("light_theme", styles.section)}>

            <div className={classNames(styles.container)}>
                <h1>Now that we got your attention, <br />Go on! <br /><strong>Grab a bite!</strong></h1>
                
                <div className={classNames(styles.grid_area)}>
                    <div className={classNames("container", styles.grid)}>
                        {UIProducts.array.map(
                            (value) => {
                                return (
                                    <ProductCard key={value.id} uiProduct={value} backfaceText={backFaceText[value.id]}  />
                                );
                            }
                        )}
                    </div>
                    
                    <Image src={multiColoredWavesImage} alt="" className={styles.multi_colored_waves} />
                </div>

                <Link href="/shop"><button>SHOP OUR RANGE</button></Link>
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
