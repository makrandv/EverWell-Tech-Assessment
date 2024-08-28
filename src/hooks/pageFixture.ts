import { Page } from "@playwright/test";

//Helps creating new page for each scenario to avoid complexity of sharing the page between scenarios
export const pageFixture = {
    //@ts-ignore
    page: undefined as Page
}
