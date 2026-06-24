import { Locator, Page, expect } from '@playwright/test'
export class OrdersummaryPage {
    page: Page;
    successMsg: Locator;
    orderId: Locator;
    orders:Locator;
    ordersList :Locator;
    view:Locator;
    orderIDSummary:Locator;

    constructor(page: Page) {
        this.page = page;
        this.successMsg = page.locator("//h1[@class='hero-primary']");
        this.orderId = page.locator("//label[@class='ng-star-inserted']");
        this.orders = page.locator("//button[@routerlink='/dashboard/myorders']");
        this.ordersList = page.locator("//tbody/tr/th");
    this.view = page.locator("//button[text()='View']");
    this.orderIDSummary =page.locator("//div[@class='col-text -main']");
    }

    async verifysuccessMessage(successMessage: string) {
        await this.page.waitForLoadState("networkidle");
        await expect(this.successMsg).toHaveText(successMessage);

    }

    async getOrderId() {
        const ordernumberDetails = (await this.orderId.textContent()) || "";
        const orderIdDetails = ordernumberDetails.split(" ");
        const orderNumber = orderIdDetails[2]
        return orderNumber;

    }
    async clickViewOrder(orderId: string) {
        await this.page.waitForLoadState("networkidle");

        const ordersCount = await this.ordersList.count();
        for (let i = 0; i < ordersCount; i++) {
            if ((await this.ordersList.nth(i).textContent()) === orderId) {
                console.log("order present in orders list");
                await this.view.nth(i).click();
                break;
            }
        }
    }
}