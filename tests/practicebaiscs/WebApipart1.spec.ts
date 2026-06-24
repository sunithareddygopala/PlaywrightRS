import { test, expect, request, type APIRequestContext } from '@playwright/test'
import { APIUtils } from '../utils/APIUtils';

const loginPayload = {userEmail:"sunithareddygopala@gmail.com",userPassword:"Sunitha@1"};
const orderPayload ={orders: [{country: "cuba",productOrderedId: "6960eac0c941646b7a8b3e68" }]};


let token: any;
let orderidpayload: any;
let apiContext: APIRequestContext;
let response;

test.beforeAll(async () => {
    //login through api
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = apiUtils.createOrder(orderPayload);
    
    // const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    // {
    //        data:loginPayload
    // })

    // expect(loginResponse.ok()).toBeTruthy();
    // const loginResponseJson = await loginResponse.json();
    // token = loginResponseJson.token;

    // console.log(token);

    //creatingorder through api
    // const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    //     {
    //         data: orderPayload,
    //         headers: {
    //             'Authorization': token,
    //             'Content-Type': 'application/json'

    //         },
    //     }
    // )

    // const orderResponsJson = await orderResponse.json();
    // orderidpayload=  orderResponsJson.orders[0];
    // return orderPayload;
 
});

test.beforeEach(()=>{

});



test("E2E scenario ", async({page})=>{
    const emaiId ="sunithareddygopala@gmail.com";
    const password= "Sunitha@1";
    const product = "ZARA COAT 3"
    const successMessage = " Thankyou for the order. "

    const emailTxtbox =page.locator("//input[@id='userEmail']");
    const  pwdTxtbox =page.locator("//input[@id='userPassword']");
    const loginBtn = page.locator("//input[@id='login']");
    const products= page.locator("//div[@class='card-body']");
    const productName = page.locator("//div[@class='card-body']//child::b");
    const addTocard = page.locator("//div[@class='card-body']/child::button[text()=' Add To Cart']");
    const cart = page.locator("//button[contains(text(),'Cart ')]");
    const cartItems = page.locator("//div[@class='cart']");
    const cartItem = page.locator("//h3[text()='ZARA COAT 3']");
    const checkoutBtn = page.locator("//button[text()='Checkout']");
    const cardNumber = page.locator("//input[@value='4542 9931 9292 2293']");
    const expirydateDropdown = page.locator("//div[text()='Expiry Date ']/parent::div/select");
    const cvv = page.locator("//div[text()='CVV Code ']/parent::div/input");
    const nameOncard= page.locator("//div[text()='Name on Card ']/parent::div/input");
    const applyCoupon = page.locator("//div[text()='Apply Coupon ']/parent::div/input");
    const applycouponBtn = page.locator("//button[text()='Apply Coupon']");
    const couponMsg = page.locator("//p[text()='* Coupon Applied']");
    const userName = page.locator("//div[@class='user__name mt-5']/label");
    const countryTxtbox = page.locator("//input[@placeholder='Select Country']");
    const countryDropdownList = page.locator("//div[@class='ta-backdrop']/parent::section/button");
    const plcaorderBtn = page.locator("//a[text()='Place Order ']");
    const successMsg = page.locator("//h1[@class='hero-primary']");
    const orderId = page.locator("//label[@class='ng-star-inserted']");
    const orders = page.locator("//button[@routerlink='/dashboard/myorders']");
    const ordersList = page.locator("//tbody/tr");
    const view = page.locator("//button[text()='View']");
    const orderIDSummary =page.locator("//div[@class='col-text -main']");

    
   
    
    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    }, token);


    await page.goto("https://rahulshettyacademy.com/client/");
    await products.first().waitFor();


    // let count = await products.count();

    // for(let i=0; i<count;i++)
    // {
    //     if(await productName.nth(i).textContent()=== product)
    //     {
    //         await addTocard.nth(i).click();
    //     }
    // }

    // await cart.click();
    // await cartItems.first().waitFor();
    // const bool =await cartItem.isVisible();
    // expect(bool).toBeTruthy();

    // await checkoutBtn.click();

    // await page.waitForLoadState("networkidle");

    // await cardNumber.fill("1423546578900");
    // await expirydateDropdown.nth(0).selectOption("03");
    // await expirydateDropdown.nth(1).selectOption("23");
    // await cvv.fill("677");
    // await nameOncard.fill("sunitha reddy");
    // await applyCoupon.fill("rahulshettyacademy");
    // await page.waitForLoadState("networkidle");
    // await applycouponBtn.click();
    // await expect(couponMsg).toHaveText("* Coupon Applied");
    
    // await expect(userName).toHaveText(emaiId);
    // await countryTxtbox.pressSequentially("Ind");
    // await countryDropdownList.first().waitFor();
    // let countryCount = await countryDropdownList.count();
    // for(let i=0; i<countryCount;i++)
    // {
    //     if(await countryDropdownList.nth(i).textContent() ===" India")
    //     {
    //         await countryDropdownList.nth(i).click();
    //         break;
    //     }
    // }
    // await plcaorderBtn.click();

    // await page.waitForLoadState("networkidle");
    // await expect(successMsg).toHaveText(successMessage);

    // const ordernumber = (await orderId.textContent()) || "";
    // const orderIdAftersplit = ordernumber.split(" ");
    await orders.click();
    await page.waitForLoadState("networkidle");

    let ordersCount = await ordersList.count();
    for(let i=0;i<ordersCount;i++)
    {
        const rowOrderId = await ordersList.nth(i).locator("th").textContent();
        if((orderidpayload).includes(rowOrderId).toBeTruthy())
        {
            console.log("order presnt in orders list");
            await view.nth(i).click();
            break;
        }
    }
   // let orderDetails = await orderIDSummary.textContent();
    
    





});

function createOrder(orderIdPayload: any): any {
    throw new Error('Function not implemented.');
}
