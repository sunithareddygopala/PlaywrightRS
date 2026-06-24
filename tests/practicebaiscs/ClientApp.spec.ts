import{test,expect} from '@playwright/test'



test("client app login",async({page})=>{

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const  loginBtn = page.locator("#login");
    const cardbody =page.locator(".card-body b");


    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await email.fill("sunithareddygopala@gmail.com");
    await password.fill("Sunitha@1");
    await loginBtn.click();

    await page.waitForLoadState("networkidle"); //flaky now
    await cardbody.first().waitFor();
    const titles = await cardbody.allTextContents();
    console.log(titles);




});