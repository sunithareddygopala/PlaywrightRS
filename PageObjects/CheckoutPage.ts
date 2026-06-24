import { type Page, type Locator, expect } from '@playwright/test';



export class CheckoutPage {
    page: Page;
    cartItems: Locator;
    cartItem: Locator;
    checkoutBtn: Locator;
    cardNumber: Locator;
    expirydateDropdown: Locator;
    cvv: Locator;
    nameOncard: Locator;
    applyCoupon: Locator;
    couponMsg: Locator;
    applycouponBtn: Locator;
    userName: Locator;
    countryTxtbox: Locator;
    countryDropdownList: Locator;
    plcaorderBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator("//div[@class='cart']");
        this.cartItem = page.locator("//h3[text()='ZARA COAT 3']");
        this.checkoutBtn = page.locator("//button[text()='Checkout']");
        this.cardNumber = page.locator("//input[@value='4542 9931 9292 2293']");
        this.expirydateDropdown = page.locator("//div[text()='Expiry Date ']/parent::div/select");
        this.cvv = page.locator("//div[text()='CVV Code ']/parent::div/input");
        this.nameOncard = page.locator("//div[text()='Name on Card ']/parent::div/input");
        this.applyCoupon = page.locator("//div[text()='Apply Coupon ']/parent::div/input");
        this.applycouponBtn = page.locator("//button[text()='Apply Coupon']");
        this.couponMsg = page.locator("//p[text()='* Coupon Applied']");
        this.userName = page.locator("//div[@class='user__name mt-5']/label");
        this.countryTxtbox = page.locator("//input[@placeholder='Select Country']");
        this.countryDropdownList = page.locator("//div[@class='ta-backdrop']/parent::section/button");
        this.plcaorderBtn = page.locator("//a[text()='Place Order ']");
    }

    async clickCheckOut() {
        await this.cartItems.first().waitFor();
        const bool = await this.cartItem.isVisible();
        expect(bool).toBeTruthy();

        await this.checkoutBtn.click();
    }

    async placeOrder(emailID:string){
        await this.page.waitForLoadState("networkidle");

    await this.cardNumber.fill("1423546578900");
    await this.expirydateDropdown.nth(0).selectOption("03");
    await this.expirydateDropdown.nth(1).selectOption("23");
    await this.cvv.fill("677");
    await this.nameOncard.fill("sunitha reddy");
    await this.applyCoupon.fill("rahulshettyacademy");
    await this.page.waitForLoadState("networkidle");
    await this.applycouponBtn.click();
    await expect(this.couponMsg).toHaveText("* Coupon Applied");
    
    await expect(this.userName).toHaveText(emailID);
    await this.countryTxtbox.pressSequentially("Ind");
    await this.countryDropdownList.first().waitFor();
    let countryCount = await this.countryDropdownList.count();
    for(let i=0; i<countryCount;i++)
    {
        if(await this.countryDropdownList.nth(i).textContent() ===" India")
        {
            await this.countryDropdownList.nth(i).click();
            break;
        }
    }
    await this.plcaorderBtn.click();

    }
}
