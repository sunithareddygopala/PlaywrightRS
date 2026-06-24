import { Locator, Page } from "@playwright/test";
import {OrdersummaryPage} from "./OrdersummaryPage";
export class OrderdetailPage{

    page:Page;
    ordersList:Locator;
    view:Locator;
    orderIDSummary:Locator;
    orderNumber: any;
    

    constructor(page:Page)
    {
        this.page =page;
        
            this.ordersList = page.locator("//tbody/tr/th");
            this.view = page.locator("//button[text()='View']");
            this.orderIDSummary =page.locator("//div[@class='col-text -main']");

    }

    async viewOrderDetails( orderNumber:any){
         await this.page.waitForLoadState("networkidle");
         this.orderNumber = orderNumber;

    let ordersCount = await this.ordersList.count();
    for(let i=0;i<ordersCount;i++)
    {
        if(await this.ordersList.nth(i).textContent() ===this.orderNumber)
        {
            console.log("order presnt in orders list");
            await this.view.nth(i).click();
            break;
        }
    }
    }

}