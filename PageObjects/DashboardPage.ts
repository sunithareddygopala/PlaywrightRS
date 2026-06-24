import { Locator, Page } from '@playwright/test';

export class DashboardPage {
    page: Page;
    products: Locator;
    productName: Locator;
    addTocard: Locator;
    cart: Locator;
    product: any;
    

    constructor(page: Page) {
        this.page = page;
        this.products= page.locator("//div[@class='card-body']");
        this.productName = page.locator("//div[@class='card-body']//child::b");
        this.addTocard = page.locator("//div[@class='card-body']/child::button[text()=' Add To Cart']");
        this.cart = page.locator("//button[contains(text(),'Cart ')]");

    }

    async searchproduct(product:any){
        this.product = product;
        await this.page.waitForLoadState("networkidle");
            await this.products.first().waitFor();
        
            let count = await this.products.count();
        
            for(let i=0; i<count;i++)
            {
                if(await this.productName.nth(i).textContent()=== product)
                {
                    await this.addTocard.nth(i).click();
                    break;
                }
            }
        
        
    }

    async navigateTocart(){
            await this.cart.click();
    }
}