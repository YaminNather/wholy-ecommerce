import { NavBarPage } from "./nav_bar_page";

export class Link {
    public constructor(page: NavBarPage, link: string, uiText: string) {
        this.page = page;
        this.url = link;
        this.uiText = uiText;
    }

    public isEqual(other: Link): boolean {
        return this.url === other.url;
    }
        
    
    public page: NavBarPage;
    public url: string;
    public uiText: string;    
}