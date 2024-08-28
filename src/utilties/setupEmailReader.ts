//Pre-requiste
//Account for Google to read emails from Gmail
//Create project in Google Cloud
//Enable Gmail API from project created
//Create Credintials for Gmail API with User Data
//Get the OAuth Client ID with Application Type Desktop app
//Download the Client ID & Client Credintials as json file 
//Rename as credintials.json
//Add as Test User as user in project to get the code

export async function readEmailFromGmail(appointmentTitle :string , emailaddress:string):Promise<boolean> {

    const path = require("path");
    const gmail = require("gmail-tester");
    const emailReceivedFlag = await gmail.check_inbox(
    path.resolve(__dirname, "credentials.json"), // Assuming credentials.json is in the current directory.
    path.resolve(__dirname, "gmail_token.json"), // Look for gmail_token.json in the current directory (if it doesn't exists, it will be created by the script).
    {
        subject:appointmentTitle, 
        from: "no-reply@MyBookingApp.com",
        to: emailaddress, // Which inbox to poll. credentials.json should contain the credentials to it.
        wait_time_sec: 10, // Poll interval (in seconds).
        max_wait_time_sec: 30, // Maximum poll time (in seconds), after which we'll giveup.
        include_body: true
    }
);
return emailReceivedFlag;
}