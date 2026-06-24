
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  page: Page;
  emailTxtbox: Locator;
  pwdTxtbox: Locator;
  loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailTxtbox = this.page.locator("//input[@id='userEmail']");
    this.pwdTxtbox = this.page.locator("//input[@id='userPassword']");
    this.loginBtn = this.page.locator("//input[@id='login']");
  }

  async goto(url: string) {
    
    await this.page.goto(url);
  }

  async validLogin(emailID: any, password: any) {
    await this.emailTxtbox.fill(emailID);
    await this.pwdTxtbox.fill(password);
    await this.loginBtn.click();
    await this.page.screenshot();
  }
}
