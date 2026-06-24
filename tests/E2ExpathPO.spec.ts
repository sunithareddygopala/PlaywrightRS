import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjects/LoginPage';
import { DashboardPage } from '../PageObjects/DashboardPage';
import { OrdersummaryPage } from '../PageObjects/OrdersummaryPage';
import { OrderdetailPage } from '../PageObjects/OrderdetailPage';
import { POManager } from '../PageObjects/POManager';
import { Screenshots } from '../Utils/Screenshot';

test("E2E_scenario ", async ({ page }, testInfo) => {
    const url = "https://rahulshettyacademy.com/client/#/auth/login";
    const emaiId = "sunithareddygopala@gmail.com";
    const password = "Sunitha@1";
    const product = "ZARA COAT 3"
    const successMessage = " Thankyou for the order. ";
    //let screenshotPath = "Screenshots/${testInfo.title}-${new Date().toISOString().replace(/[:.]/g, '-')}/.png"


    let screenshot = new Screenshots(page);

    let poManager = new POManager(page);
    const loginPage = poManager.getLoginPage()
    await loginPage.goto(url);

    await loginPage.validLogin(emaiId, password);

    screenshot.takeScreenshot(testInfo)

    const dashboardpage = poManager.getDashboardPage();
    await dashboardpage.searchproduct(product);
    screenshot.takeScreenshot(testInfo)
    await dashboardpage.navigateTocart();
    screenshot.takeScreenshot(testInfo)
    const checkoutPage = poManager.getCheckoutpage();
    await checkoutPage.clickCheckOut();
    screenshot.takeScreenshot(testInfo)
    await checkoutPage.placeOrder(emaiId);
    screenshot.takeScreenshot(testInfo)

    const ordersummaryPage = poManager.getOrdersummarypage();
    await ordersummaryPage.verifysuccessMessage(successMessage);
    screenshot.takeScreenshot(testInfo)
    let orderNumber = await ordersummaryPage.getOrderId();
    await ordersummaryPage.clickViewOrder(orderNumber);
    screenshot.takeScreenshot(testInfo)
    const orderdetailsPage = poManager.getOrderdetailPage();
    await orderdetailsPage.viewOrderDetails(orderNumber);
    screenshot.takeScreenshot(testInfo)

});