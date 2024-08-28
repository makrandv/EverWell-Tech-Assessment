//Hooks : Modules to be run before and after each scenario or each execution

import { BeforeAll,AfterAll, Before, After } from "@cucumber/cucumber";
import { Page, Browser, BrowserContext } from "@playwright/test"
import { pageFixture } from "./pageFixture";
import { invokeBrowser } from "../helpers/browserManager";
import { getEnv } from "../helpers/environmentManager";

let browser: Browser;
let context : BrowserContext;
let page: Page;

BeforeAll(async function(){
    //Get the Environment values to run the test against
    getEnv();
    browser = await invokeBrowser()
})

Before(async function(){
    // To operate multiple independent browser sessions.
    // Create a new incognito browser context
    context = await browser.newContext();
    // Create a new page inside context.
    page = await context.newPage();
    pageFixture.page = page;
})

After(async function (){

    pageFixture.page.close();
    // Dispose context once it's no longer needed.
    context.close();
})

AfterAll(async function() {
    browser.close();
})

