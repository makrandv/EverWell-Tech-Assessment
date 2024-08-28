import { Given, When, Then } from "@cucumber/cucumber"

import { pageFixture } from "../../hooks/pageFixture";
import { expect } from "@playwright/test";

Given('User launches MyBooking application', async function () {
    await pageFixture.page.goto(process.env.BASEURL);
});

Given('User enter the username as {string}', async function (userEmailaddress) {
    await pageFixture.page.locator("input[test-data-id*='emailaddress']").fill(userEmailaddress)
});

Given('User enter the password as {string}', async function (userPassword) {
    await pageFixture.page.locator("input[test-data-id*='password']").fill(userPassword)
});

When('User click on the login button', async function () {
    await pageFixture.page.locator("button[test-data-id*='loginbutton']").click();
});

Then('Login should be {string}', async function (loginAttempt) {
    if (loginAttempt === "successful") {
        const user = pageFixture.page.locator("label[test-data-id*=AccountUsername]");
        await expect(user).toBeVisible();
    }
    else {
        const failureMesssage = pageFixture.page.locator("mat-error[role='alert']");
        await expect(failureMesssage).toBeVisible();
    }
});


