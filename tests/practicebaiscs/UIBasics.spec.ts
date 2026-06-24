import {expect, test} from '@playwright/test'

test('first playwright test - browser context', async({browser})=>{
    //browser - plugins,coookies,history
    //context - freshbrowser - new instance-incognito mode - no cookies/plugins 
    // - we can send if we ant to send any that specific to that browser
    //context specific tot hat browser will not be shared with other browser context


    const context = await browser.newContext();
    const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise")

});

test('without ccreating browser context', async({page})=>{
    await page.goto("https://google.com")
    //test.only - executes only  the testcase
    //get title
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});


test('get error message', async({page})=>{

    const username = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body");
     await page.goto("https://rahulshettyacademy.com/loginpagePractise")
     await username.fill("sunitha");
     await password.fill("password");
     await signInBtn.click();
    console.log(await page.locator('[style*=block]').textContent());
    await expect(page.locator('[style*=block]')).toContainText("Incorrect username/password.");
    
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signInBtn.click();

    // console.log(await cardTitles.first().textContent());
     console.log(await cardTitles.nth(0).textContent());

    const allCardTitles = await cardTitles.allTextContents();

    console.log(allCardTitles);




});

test("UI controls", async({page})=>{

    
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body");
    const dropdown =page.locator("select.form-control");
    const radiobtn = page.locator(".radiotextsty");
    const okBtn = page.locator("#okayBtn");
    const termschkbox = page.locator("#terms");
    const documentLink = page.locator("[href*='documents-request']");


    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    await dropdown.selectOption("consult");
    await radiobtn.nth(1).click();
    await expect(radiobtn.nth(1)).toBeChecked();
    console.log(radiobtn.nth(1).isChecked());
    await okBtn.click();
    await termschkbox.click();
    await expect(termschkbox).toBeChecked();
    await termschkbox.uncheck();
    expect(await termschkbox.isChecked()).toBeFalsy();
    expect (await documentLink).toHaveAttribute("class","blinkingText");

});

test("child window handling", async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    const documentLink = page.locator("[href*='documents-request']");
    const username = page.locator('#username');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise");

    const [newPage] = await Promise.all(
        [context.waitForEvent('page'),
        documentLink.click(),

    ])

   // const page2 =context.waitForEvent('page');//listen for any new page opens - is should be before the event occur it should listen

    // documentLink.click();//new page is opened

    // await newPage.waitForLoadState('networkidle');
    const text = await newPage.getByText("Please email us at ").textContent();
    
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];

    // console.log(domain);
    await username.fill(domain);
    console.log(await username.inputValue());


});

test("calender validations", async({page})=>{
    const yearNumber ="2027";
    const monthNumber ="08";
    const dateNumber ="30";

    const datePicker = page.locator("//div[@class='react-date-picker__inputGroup']");
    const calNavigation =page.locator("//button[@class='react-calendar__navigation__label']");
    const year = page.getByText(yearNumber);
    const month = page.locator("//button[contains(@class, 'month')]").nth(Number(+monthNumber+-1));
    const date = page.locator("//abbr[text()="+dateNumber+"]");

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await datePicker.click();
    await calNavigation.click();
    await calNavigation.click();
    await year.click();
    await  month.click();
    await date.click();
    console.log("done");



});
