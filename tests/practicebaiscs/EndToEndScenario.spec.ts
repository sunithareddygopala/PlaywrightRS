import{test,expect} from '@playwright/test'

test("E2E scenario", async({page})=>{
    const productName="ZARA COAT 3";
    const emailID ="sunithareddygopala@gmail.com"

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("#login");
    const products = page.locator("[class='card-body']");
    const cart = page.locator("[routerlink='/dashboard/cart']");
    const expiryDropdown = page.getByRole("combobox");
    const cardNumber =page.locator("[value='4542 9931 9292 2293']");
    const checkout =page.locator("text=Checkout");
    const emailValidation =page.locator(".user__name [type='text']");
    


    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await email.fill("sunithareddygopala@gmail.com");
    await password.fill("Sunitha@1");
    await loginBtn.click();
    await page.waitForLoadState("networkidle");
    await products.first().waitFor();
    //const titles = await products.allTextContents();
    const count =await  products.count();

    for(let i=0; i<=count;++i)
    {
        if(await products.nth(i).locator("b").textContent() === productName)
        {
           await products.nth(i).locator("text = Add To Cart").click();
            break;
        }
    }

    await cart.click();
    await page.locator("div   li").first().waitFor();
    const bool = page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await checkout.click();
    await cardNumber.clear();
    await cardNumber.fill("132435676890");
    await cardNumber.textContent();

   
    
    expect(await expiryDropdown.first().isVisible());
    await expiryDropdown.first().selectOption("07");
    await expiryDropdown.nth(1).selectOption("28");
    await page.getByRole('textbox').nth(1).fill("101")
    await page.getByRole('textbox').nth(2).fill("sunitha");
    await page.locator('input[name="coupon"]').fill("rahulshettyacademy");
    await page.locator("[type='submit']").click();
    await expect(page.getByText("* Coupon Applied")).toHaveText("* Coupon Applied");
    await page.getByRole('textbox').nth(4).click();
    await expect(emailValidation.first()).toHaveText(emailID);
    await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:100});
    const dropdown = page.locator(".ta-results ");
    await dropdown.waitFor();
    const optionscount = await dropdown.locator("button").count();
    for(let i =0; i<optionscount;i++)
    {
       const country =await  dropdown.locator("button").nth(i).textContent();
       if( country ===" India"){
        await dropdown.locator("button").nth(i).click();
        break;
       }
    }

    await page.locator("action__submit ").click();

    

});