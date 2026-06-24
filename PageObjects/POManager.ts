import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import {CheckoutPage} from "./CheckoutPage";
import { OrdersummaryPage } from "./OrdersummaryPage";
import {OrderdetailPage} from "./OrderdetailPage";

export class POManager {
    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    checkoutPage : CheckoutPage;
    ordersummaryPage : OrdersummaryPage;
    orderdetailsPage : OrderdetailPage;
    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page)
        this.ordersummaryPage = new OrdersummaryPage(this.page);
        this.orderdetailsPage = new OrderdetailPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }
    getCheckoutpage(){
        return this.checkoutPage;
    }

    getOrdersummarypage(){
        return this.ordersummaryPage;
    } 
    getOrderdetailPage()
    {
        return this.orderdetailsPage;
    }
}