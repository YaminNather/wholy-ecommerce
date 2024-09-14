"use client";

import { CSSProperties, FC, ReactNode } from "react";
import Image from "next/image";
import styles from "./footer_section_styles.module.scss";
import classNames from "classnames";

import { greenTexturedBackgroundImage } from "@/app/common_imported_images/textured_backgrounds";
import { companyLogoVector } from "@/app/common_imported_images/company_logo";

import { greenPlant0Image } from "@/app/common_imported_images/plants";

import yellowLineImage from "@/app/assets/yellow-line.png";
import { UIProducts } from "@/app/product_ui_details/ui_products";
import { SocialMediaLink } from "./social_media_link";
import { YellowStrikeThrough } from "@/app/components/text_highlighters/strike_through/strike_through";
import { yellowCurvesImages } from "@/app/common_imported_images/curves";
import { socialMediaLinks } from "./social_media_links";
import Link from "next/link";

export interface FooterSectionProps {
    readonly style?: CSSProperties;
    readonly className?: string;
}

export const FooterSection: FC<FooterSectionProps> = (props) => {
    return (
        <section id="footer" style={props.style} className={classNames(styles.footer_section, props.className)}>
            <Image src={greenTexturedBackgroundImage} alt="" className={"background_image"} />

            {/* <Image src={yellowLeavesImage} alt="" className={classNames("background_prop", styles.yellow_leaves)} /> */}
            
            <Image src={greenPlant0Image} alt="" height={200} className={classNames("background_prop", styles.top_right_green_leaves)} />
            
            <Image src={UIProducts.blueberry.fruits[1]} alt="" className={classNames("background_prop", styles.fruit, styles.top_left_blueberry)} />
            
            <Image src={UIProducts.fig.fruits[0]} alt="" className={classNames("background_prop", styles.fruit, styles.top_left_fig)} />

            <Image src={UIProducts.fig.fruits[1]} alt="" className={classNames("background_prop", styles.fruit, styles.top_right_fig)} />

            <Image src={UIProducts.blueberry.fruits[0]} alt="" className={classNames("background_prop", styles.fruit, styles.top_right_blueberry)} />

            <Image src={UIProducts.strawberry.fruits[0]} alt="" className={classNames("background_prop", styles.fruit, styles.bottom_right_fruit, styles.strawberry_0)} />
            
            <Image src={UIProducts.strawberry.fruits[1]} alt="" className={classNames("background_prop", styles.fruit, styles.bottom_right_fruit, styles.strawberry_1)} />
            
            <Image src={UIProducts.pineapple.fruits[0]} alt="" className={classNames("background_prop", styles.fruit, styles.bottom_left_pineapple_0)} />
            
            <Image src={UIProducts.pineapple.fruits[1]} alt="" className={classNames("background_prop", styles.fruit, styles.bottom_left_pineapple_1)} />
            
            <Image src={yellowCurvesImages[0]} alt="" className={classNames("background_prop", styles.bottom_curve)} />

            <Image src={greenPlant0Image} height={200} alt="" className={classNames("background_prop", styles.bottom_left_green_leaves)} />
            
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={classNames(styles.grid_cell, styles.first_grid_cell)}>
                        <Image src={companyLogoVector} alt="" className={styles.company_logo} />

                        <hr />

                        <div className={styles.contact_details_area}>
                            <ContactDetail 
                                heading={"We're only a call away"}
                                value={<Link href="tel://7418522332">(+91) 74185 22332</Link>}
                            />
                            
                            <ContactDetail heading={"Shy and would rather email us?"} value={"hello@eatwholy.com"} />
                        </div>
                    </div>

                    <div className={classNames(styles.grid_cell, styles.second_grid_cell)}>                    
                        <div className={styles.back_to_top_button_area}>
                            <p className={styles.message}>
                                <YellowStrikeThrough>You&apos;ve got a long way to slide.</YellowStrikeThrough>
                            </p>
                            
                            <button className="button_yellow" onClick={(event) => window.scrollTo(0, 0)}>BACK TO TOP</button>
                        </div>

                        <div className={styles.forms_area}>
                            <div className={styles.input_with_label_area}>
                                <label>Sign up for our newsletters</label>

                                <div className={styles.input_area}>
                                    <input placeholder="EMAIL" />
                                    
                                    <button className={classNames("button_outline")}>SUBMIT</button>
                                </div>

                                <p className={classNames("personalized_text", styles.personalized_text)}>We promise they&pos;re exciting!</p>
                            </div>

                            <div className={styles.input_with_label_area}>
                                <label>Drop us your pin code and check delivery</label>

                                <div className={styles.input_area}>
                                    <input placeholder="PINCODE" />
                                    
                                    <button className={classNames("button_outline")}>SUBMIT</button>
                                </div>

                                <p className={classNames("personalized_text", styles.personalized_text)}>We want everybody to get their hands on us!</p>
                            </div>
                        </div>

                        {/* <div className={styles.bottom_area}>
                            <p>T{"&"}C</p>
                            
                            <p>PRIVACY POLICY</p>
                            
                            <p>ALL RIGHTS RESERVED, EARLYBIRD FOOD AG, 2017</p>
                        </div> */}
                    </div>
                </div>

                <div className={styles.social_media_links_area}>
                    {socialMediaLinks.map( (value, index, array) => <SocialMediaLink key={index} href={value.href} image={value.image} className={styles.social_media_link} /> )}
                </div>
            </div>
        </section>
    );
};

export interface ContactDetailProps {
    heading: string;
    value: ReactNode;
}

export const ContactDetail: FC<ContactDetailProps> = (props) => {
    return (
        <div className={styles.contact_detail}>
            <h6 className={"personalized_text"}>
                {props.heading}

                <Image src={yellowLineImage} alt="" />
            </h6>

            <p>{props.value}</p>
        </div>
    );
}
