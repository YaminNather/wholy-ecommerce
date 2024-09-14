"use client";

import { NextPage } from "next";
import { TopSection } from "./top_section/top_section";
import { TexturedBackgroundSection } from "./textured_background_section/textured_background_section";
import { FooterSection } from "@/app/components/common_sections/footer_section/footer_section";

import { NavBar } from "@/app/components/nav_bar/nav_bar";
import { useState } from "react";
import { NavMenu } from "@/app/components/nav_bar/nav_menu/nav_menu";

import styles from "./our_story_page_styles.module.scss";

const OurStoryPage: NextPage = (props) => {
    const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);
        
    return (
        <>
            <NavBar
                highlightedLink="ourStory"
                colorScheme="light"
                onOpenNavMenuButtonClicked={() => setIsNavMenuOpen(true)}
             />

            <NavMenu isOpen={isNavMenuOpen} onCloseButtonClicked={() => setIsNavMenuOpen(false)} />

            <TopSection />

            <TexturedBackgroundSection />

            <FooterSection className={styles.footer_section} />
        </>
    );
};

export default OurStoryPage;
