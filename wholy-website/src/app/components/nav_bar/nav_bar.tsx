"use client";

import { FC, ReactNode, TransitionEventHandler, useCallback, useState } from "react";
import Image from "next/image";
import styles from "./nav_bar_styles.module.scss";

import Link from "next/link";
import { NavBarPage } from "./nav_bar_page";
import { links } from "./links";
import classNames from "classnames";

import { Link as NavBarLink } from "./link";

import { AccountButton } from "./account_button/account_button";
import { companyLogoDarkVector, companyLogoVector } from "@/app/common_imported_images/company_logo";

export interface NavBarProps {
    highlightedLink?: NavBarPage;
    onOpenNavMenuButtonClicked?: ()=>void;
    onOpenCartButtonClicked?: ()=>void;
    colorScheme?: ColorScheme;
}

export function NavBar(props: NavBarProps) {
    const colorScheme: ColorScheme = props.colorScheme ?? "dark";

    const isLoggedIn: boolean = false;
    const [compactState, setCompactState] = useState<CompactState>(CompactState.default);

    const onNavTransitionEnd = useCallback<TransitionEventHandler<HTMLElement>>(
        (event) => {
            if (!event.currentTarget.classList.contains(styles.detailed_section)) return;  

            const opacity: number = Number(window.getComputedStyle(event.currentTarget).opacity);
            // console.log(`CustomLog: Opacity on transitionEnd = ${opacity}`);

            if (opacity === 0.0) {
                // console.log(`Setting compactState to compact`);
                setCompactState(CompactState.compact);
            }
            else if (opacity === 1.0) {
                // console.log(`Setting compactState to default`);
                setCompactState(CompactState.default);
            }
        },
        [compactState]
    );

    const buildLinks = useCallback(
        (): ReactNode => {
            return (
                <>
                    {Array.from(links.keys()).map(
                        (value, index, array) => {
                            const link: NavBarLink = links.get(value)!;
                            return (
                                <Link 
                                    key={value} 
                                    href={link.url} 
                                    className={classNames(styles.nav_item, styles.nav_link, (value === props.highlightedLink) ? styles.currently_open_page_link : undefined)}
                                >
                                    {link.uiText}
                                </Link>
                            );
                        }
                    )}
                </>
            );
        },
        []
    );

    // useEffectClientSide(
    //     () => {
    //         const scrollListener = (event: Event): any => {
    //             if (window.scrollY > 280) {
    //                 if (compactState !== CompactState.toCompact && compactState !== CompactState.compact) {
    //                     setCompactState(CompactState.toCompact);
    //                 }
    //             }
    //             else {
    //                 if (compactState !== CompactState.toDefault && compactState !== CompactState.default) {
    //                     setCompactState(CompactState.toDefault);
    //                 }
    //             }
    //         };
    //
    //         window.addEventListener("scroll", scrollListener);
    //
    //         return () => window.removeEventListener("scroll", scrollListener);
    //     },
    //     [compactState]
    // );
    
    return (
        <div 
            className={classNames(
                styles.nav_bar,
                (colorScheme === "light") ? styles.nav_bar_light_theme : undefined,
                (compactState === CompactState.toCompact || compactState === CompactState.compact) ? styles.nav_bar_compact : undefined
            )}
        >
            <div className={styles.detailed_section} style={{ display: (compactState === CompactState.compact) ? "none" : undefined }} onTransitionEnd={onNavTransitionEnd}>
                {/* <Image src={greenTexturedBackgroundImage} alt="" className={"background_image"} /> */}

                <Image src={(colorScheme === "dark") ? companyLogoVector : companyLogoDarkVector } alt="" className={styles.company_logo} />

                <nav style={{display: (compactState !== CompactState.compact) ? undefined : "none"}}>
                    {buildLinks()}

                    <button 
                        className={classNames(styles.nav_item, "icon_button", styles.background_icon_button)} 
                        onClick={(event) => props.onOpenCartButtonClicked?.()}
                    >
                        <span className={classNames("material-icons")}>shopping_cart</span>
                    </button>

                    <Link href="/authentication" className={styles.nav_item} style={{display: (!isLoggedIn) ? undefined : "none"}}>
                        <button className={classNames("icon_button", styles.account_button)}>
                            <span className={"material-symbols-outlined"}>account_circle</span>
                        </button>
                    </Link>

                    <AccountButton className={styles.nav_item} isLoggedIn={isLoggedIn} />
                </nav>  
            </div>

            <button
                onClick={(event) => props.onOpenNavMenuButtonClicked?.()} 
                className={classNames("icon_button", styles.open_nav_menu_button)}
            >
                <span className={classNames("material-icons")}>menu</span>
            </button>
        </div>
    );
};

export type ColorScheme = "light" | "dark";

enum CompactState {
    toDefault,
    default,
    toCompact,
    compact
}

export type { NavBarPage as Page };