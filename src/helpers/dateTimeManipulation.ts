//Format Appointment date in acceptable format to application
export function getAppointmentDate(appointmentDateText: string): string {

    let appointmentDate = "ERR_INVALID_APPOINTMENT_DATE";
    let currentDateTime = new Date();
    let offsetDayIndex: number;

    if (appointmentDateText == "Today") {
        appointmentDate = currentDateTime.getDate() + "/" + (currentDateTime.getMonth() + 1) + "/" + currentDateTime.getFullYear();
    }
    // Add offset date for future appointment date
    if (appointmentDateText.includes("Today +")) {
        offsetDayIndex = +appointmentDateText.split("+")[1];
        appointmentDate = (currentDateTime.getDate() + offsetDayIndex) + "/" + (currentDateTime.getMonth() + 1) + "/" + currentDateTime.getFullYear();
    }
    // Back date appointment date
    if (appointmentDateText.includes("Today -")) {
        offsetDayIndex = +appointmentDateText.split("-")[1];
        appointmentDate = (currentDateTime.getDate() - offsetDayIndex) + "/" + (currentDateTime.getMonth() + 1) + "/" + currentDateTime.getFullYear();
    }

    return appointmentDate;
}

//Format Appointment time in acceptable format to application
export function getAppointmentTime(appointmentTimeText: string): string {

    let appointmentTime = "ERR_INVALID_APPOINTMENT_TIME";
    var appointmentFromTime, appointmentToTime, formattedAppointmentFromTime, formattedAppointmentToTime;

    appointmentFromTime = appointmentTimeText.split("to")[0];
    appointmentToTime = appointmentTimeText.split("to")[1];

    //Format appointment time as hh:mm am\pm based on the input
    formattedAppointmentFromTime = formatEnteredTime(appointmentFromTime);
    formattedAppointmentToTime = formatEnteredTime(appointmentToTime);

    appointmentTime = formattedAppointmentFromTime + " - " + formattedAppointmentToTime;

    return appointmentTime;
}

//Extracting the day of the week based on the appointment date
export function getAppointmentDay(appointmentDateText: string): string {
    let appointmentDay = "ERR_INVALID_APPOINTMENT_DAY";
    var Weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dateParts = appointmentDateText.split("/");

    //Convert String to Date format 
    var dateObject = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);

    //Get the Week day based on the appointment date
    appointmentDay = Weekdays[dateObject.getDay()];

    return appointmentDay;
}

//private function to format From and To time in 12 hour format
function formatEnteredTime(enteredTime: string): string {
    let actualTime = new Date();
    let offSetHours: number
    let formattedTime, offsetfromCurrent: string;
    var formattedHour, AmOrPm;
    formattedTime = enteredTime;



    if (enteredTime == "currenttime") {
        //Converting 24 hour time to 12 hour format
        AmOrPm = actualTime.getHours() >= 12 ? 'pm' : 'am';
        formattedTime = actualTime.getHours() + ":" + actualTime.getMinutes() + " " + AmOrPm;

    }

    //Adding offset hours to given time
    if (enteredTime.includes("currenttime +")) {
        offsetfromCurrent = enteredTime.split("+")[1]
        offSetHours = +offsetfromCurrent;
        formattedHour = ((actualTime.getHours() + offSetHours) % 12) || 12;
        AmOrPm = formattedHour >= 12 ? 'pm' : 'am';
        formattedTime = formattedHour + ":" + String(actualTime.getMinutes()).padStart(2, "0") + " " + AmOrPm;

    }

    //Adjusting the time to past time
    if (enteredTime.includes("currenttime -")) {
        offsetfromCurrent = enteredTime.split("-")[1]
        offSetHours = +offsetfromCurrent;
        formattedHour = ((actualTime.getHours() - offSetHours) % 12) || 12;
        AmOrPm = formattedHour >= 12 ? 'pm' : 'am';
        formattedTime = formattedHour + ":" + String(actualTime.getMinutes()).padStart(2, "0") + " " + AmOrPm;

    }
    return formattedTime;
}

