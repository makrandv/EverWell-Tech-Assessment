import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";
import { getAppointmentDate, getAppointmentTime, getAppointmentDay } from "../../helpers/dateTimeManipulation"
import { readEmailFromGmail } from "../../utilties/setupEmailReader";

//Declared local variables to be shared with other steps
let dateOfAppointment, titleOfAppointment, timeofAppointment;

When('User click on the new appointment button', async function () {
    await pageFixture.page.locator("button[test-data-id*='addappointment']")
});

When('User enters appointment {string} ,{string},{string} in the appointment popup', async function (appointmentName, appointmentDate, appointmentTime) {

    titleOfAppointment = appointmentName;

    //Format appointment to in acceptable format in the field
    dateOfAppointment = await getAppointmentDate(appointmentDate);
    timeofAppointment = await getAppointmentTime(appointmentTime);

    console.log("Appointment Date :" + dateOfAppointment);
    console.log("Appointment Time :" + timeofAppointment);

    await expect(pageFixture.page.locator(".modal-dialog")).toBeVisible()

    await pageFixture.page.locator("input[test-data-id*='appointmentName']").fill(appointmentName);

    await pageFixture.page.locator("input[test-data-id*='appointmentDate']").fill(dateOfAppointment);

    await pageFixture.page.locator("input[test-data-id*='appointmentTime']").fill(timeofAppointment);
});


When('Click {string} on the appointment popup', async function (string) {
    await pageFixture.page.locator("button[test-data-id*='actionbutton']")
});

Then('user is shown with {string} message on screen', async function (notificationMessage) {
    
    //
    let userNotificaitonMsg = await pageFixture.page.locator("//span['" + notificationMessage + "']");
    await expect(userNotificaitonMsg).toBeVisible();
});

Then('new appointment is visible on calendar and has the entered details', async function () {
    
    //Calculate day of the week based on the Appointment date to 
    let dayOfAppointment = getAppointmentDay(dateOfAppointment)
    console.log("Appointment Day :" + dayOfAppointment);
    
    //Based on the Weekday for the appointment, validate if the appointment with the given details is present under that specific week column
    let WeekColumn = await pageFixture.page.locator(".calendarCtrl ."+dayOfAppointment);
    await expect(WeekColumn.locator("span").filter({hasText:titleOfAppointment})).toBeVisible()
    await expect(WeekColumn.locator("span").filter({hasText:timeofAppointment})).toBeVisible()
});

Then('email notification is sent to users {string}', async function (emailaddress) {

    //Check if the email is sent to configured Gmail account after appointment is created successfully
    expect(readEmailFromGmail(titleOfAppointment, emailaddress)).toBeTruthy()

});

Then('new appointment is NOT visible on calendar', async function () {
    let dayOfAppointment = getAppointmentDay(dateOfAppointment)
    let WeekColumn = await pageFixture.page.locator(".calendarCtrl ."+dayOfAppointment);
     //Based on the Weekday for the appointment, validate that no appointment with the given details is present under that specific week column
    await expect(WeekColumn.locator("span").filter({hasText:titleOfAppointment})).not.toBeVisible();
});

Then('no email notification is sent to users {string}', async function (emailaddress) {
    expect(readEmailFromGmail(titleOfAppointment, emailaddress)).toBeFalsy();
});
