import { Link } from "./link";
import { NavBarPage } from "./nav_bar_page";

export const links: Map<NavBarPage, Link> = new Map(
    [
        ["home", new Link("home", "/", "HOME")],
        ["ourStory", new Link("ourStory", "/our-story", "OUR STORY")],
        ["shop", new Link("shop", "/shop", "SHOP")],
        ["contact", new Link("shop", "/#footer", "CONTACT")]
    ]
);