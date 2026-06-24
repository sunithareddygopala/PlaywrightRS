import { Page } from "@playwright/test";

export class Screenshots
{
    page:Page;
    constructor(page:Page)

    {
        this.page=page;
        
       
    }
    async takeScreenshot(testInfo: { title: any; })
    {
         await this.page.screenshot({ path: `Screenshots/${testInfo.title}/${new Date().toISOString().replace(/[:.]/g, '-')}.png` });
    }
}