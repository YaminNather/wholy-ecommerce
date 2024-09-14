"use client";

import 'reflect-metadata';

import { useState } from "react";

import { HeroSection } from "./hero_section/hero_section";
import { StorySection } from "./story_section/story_section";
import { UniqueSellingPointsSection } from "./unique_selling_points_section/unique_selling_points_section";
import { CallToActionSection } from "./call_to_action_section/call_to_action_section";
// import { FollowUsSection } from "./follow_us_section/follow_us_section";

import { NavBar } from "@/app/components/nav_bar/nav_bar";
import { NavMenu } from "@/app/components/nav_bar/nav_menu/nav_menu";

import { Cart } from "@/app/components/cart/cart";

import { FooterSection } from "@/app/components/common_sections/footer_section/footer_section";

export default function HomePage() {
    const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

    return (
        <>
            <Cart isOpen={isCartOpen} onDismiss={() => setIsCartOpen(false)} />

            <NavBar highlightedLink="home" onOpenCartButtonClicked={() => setIsCartOpen(true)} />

            <NavMenu isOpen={isNavMenuOpen} onCloseButtonClicked={() => setIsNavMenuOpen(false)} onOpenCartButtonClicked={() => setIsCartOpen(false)} />

            <HeroSection />

            <StorySection />

            <UniqueSellingPointsSection />

            <CallToActionSection />

            {/* <FollowUsSection /> */}

            <FooterSection />
        </>
    );
};
