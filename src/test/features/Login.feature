Feature: User Authentication

  Background:
    Given User launches MyBooking application

  @Smoke
  Scenario: Authorize user are able to login to the MyBooking application
    Given User enter the username as "ValidUserEmailAddress"
    Given User enter the password as "ValidPassword"
    When User click on the login button
    Then Login should be "successful"

  @Regression
  Scenario: Unauthorized user cannot log in to the MyBooking application
    Given User enter the username as "ValidUserEmailAddress"
    Given User enter the password as "InvalidPassword"
    When User click on the login button
    Then Login should be "Unsuccessful"

    