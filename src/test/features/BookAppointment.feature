Feature: Book appointments from application

  Background:
    Given User launches MyBooking application
    And User enter the username as "ValidUser"
    And User enter the password as "ValidPassword"
    And User click on the login button

    @E2E @Smoke @Regression
    Scenario Outline: Users authorized on MyBooking app can schedule appointments online through the application
    When User click on the new appointment button
    And User enters appointment "<Appointmentname>" ,"<Date>","<Time>" in the appointment popup
    And Click "Save" on the appointment popup
    Then user is shown with "Appointment saved!" message on screen
    And new appointment is visible on calendar and has the entered details
    And email notification is sent to users "Emailaddress"
    
    Examples:
    | Appointmentname            |Date     |Time                                  |Emailaddress      |
    | Create Today's appointment |Today    |currenttime + 1 to currenttime + 2    |TestUser@gmail.com|
    | Create future appointment  |Today + 2|12:14 pm to 1:14 am                    |TestUser@gmail.com|

    @Failflow @Regression
    Scenario Outline: Users authorized on MyBooking app cannot schedule past dated appointments application
    When User click on the new appointment button
    And User enters appointment "<Appointmentname>" ,"<Date>","<Time>" in the appointment popup
    And Click "Save" on the appointment popup
    Then new appointment is NOT visible on calendar
    And no email notification is sent to users "Emailaddress"

    Examples:
    | Appointmentname                        |Date        |Time                              |Emailaddress           |
    | Create yesterday's appointment         |Today - 1   |11:00 am to 12:30 pm              |TestUser@gmail.com|
    | Create appointment with past time      |Today       |currenttime - 2 to currenttime - 1|TestUser@gmail.com|

    @Cancelflow @Failflow @Regression
    Scenario: Users authorized on MyBooking app cancel
    # When User click on the new appointment button
    And User enters appointment "Create Today's appointment" ,"Today","currenttime + 1 to currenttime + 2" in the appointment popup
    And Click "Cancel" on the appointment popup
    Then new appointment is NOT visible on calendar
    And no email notification is sent to users "Emailaddress"


    
