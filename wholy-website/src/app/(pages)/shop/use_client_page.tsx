"use client";

import 'reflect-metadata';

import { NavBar } from "@/app/components/nav_bar/nav_bar";
import { CatalogueSection } from "./catalogue_section/catalogue_section";
import { FooterSection } from "@/app/components/common_sections/footer_section/footer_section";
import { NavMenu } from "@/app/components/nav_bar//nav_menu/nav_menu";
import { ServerSideProduct } from "./server_side_product";

export interface UseClientShopPageProps {
    readonly products: ServerSideProduct[];
}

export function UseClientShopPage(props: UseClientShopPageProps) {
    return (
        <>
            <NavBar colorScheme={"light"} highlightedLink={"shop"} />

            <NavMenu isOpen={false} />

            <CatalogueSection products={props.products} />

            <FooterSection />
        </>
    );
};