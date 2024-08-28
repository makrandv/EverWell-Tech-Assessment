# EverWell-Tech-Assessment
Technical Assessment for EverWell Test automation Lead role

MyBookings web application provides basic functionalities for organizing calendar activities hence the Test automation solution ensures that end-to-end (E2E) scenarios are functioning correctly for users when scheduling online appointments. 
The test automation solution covers below uses cases currently
1. User authentication to the application
2. Logged in user making an appointment for future date and time and confirming visibility of the appointment in the calendar and confirming receiving an email notification
3. Ensuring user is unable to make an past timed or dated appointment
4. Confirming unsaved appointments do not erroneously appear in the calendar

Test coverage could expanded to editing or deleting existing appointment although the wireframe does not specify UI behavior or flows for this scenario , hence these scenarios could be easily incorporated in testing suite in future.

Technology choices :
We have considered building the test automation framework using below test automation tools\libraries

Automation Testing Tool: Playwright
Cross browser compatibility testing - Playwright supports all modern rendering engines, including Firefox, WebKit, and Chromium. MyBookings application being a web application ensuring its compatibility all popular web browsers is crucial for providing a seamless user experience.
Headless and GUI execution - Playwright provides both execution of test through UI for debugging and Headless support of faster execution
API testing - Playwright provides capability of doing API testing.With its capabilities, you can effectively test the business logic of Web APIs in your MyBookings application.Moreover, its integration features allow for seamless interaction with services like Azure Redis and external vendors such as Google, enabling comprehensive contract and service-level testing. 
In the current implementation have mechanism of verifying the email notifications sent to Gmail over Gmail APIs

Test cases documentation : Cucumber
Cucumber was used to document test cases in Gherkin format (Given When Then) which makes its easier for business stakeholders and test analysts to understand the coverage. With understanding that this framework would be consumed by the other teams considering the test documentation in a user friendly language will encourage the usage and collaboration.
 
2. Architectural decisions
With seamless integration of Cucumber libraries with Playwright as automation tool are able provide a structured approach for test automation development. 

Test case development
- Feature files helps provides test documentation capability in plain English language and its abstracted from technical implementation in the steps definition file. 

Hooks
- Common steps which are required for each test execution (e.g. setting up browser , selecting environment to run the test in, closing browsers etc. ) are scripted in Hooks folders for reusability and readability

Helpers
- Common routines for managing browsers , execution environment and functions which are facilitating the test execution are separated from the test implementation. This enables better readability of the test steps and have common implementations which can shared across the different test flows in future

Utilities
- Any third party integration methods would be implemented 

Reporting
- Cucumber provides inbuilt HTML reporting capabilities for test execution which is configured from the Cucumber.js config file , hence we don't need any separate third party libraries for test reporting

Test Configuration
- Test configuration parameters such as environment selection , selection of test cases based on tags and browser selection can managed over command line argument.

Test Data Management
- Test scenarios requiring testing with combination of test data can be provided along with test scenarios as examples


3. Implementation strategies

Test scenario execution can be triggered command line using command npm run test --ENVIRONMENT=<execution envrionment(prod,uat,sit> this will launch application with url from specified environment in Chrome and will start executing all the tests from all the feature files
Additional arguments can be provided in the command line to specify Browser to run the test cases and test cases with specific tags to be executed e.g. npm run test --TAGS=@E2E --BROWSER=chrome --ENVIRONMENT=prod
Test execution report is generated for each execution under test-results folder in the project

4. Testing automation education and coaching
With the test cases implemented in the Gherkin format gives better understanding of the test coverage and testers will start contributing by generating the scenarios and reusing the steps already implemented. Well commented code and code reviews for tests will help understand framework

Assumptions
1. The automation test solution is build on the wireframe provided in the document. The UI controls shown the wireframe screen are considered to have selection attribute named "test-data-id" this id will be available to all the UI controls with the value unique to that control e.g. Email address field on login page will have "test-data-id*='emailaddress'" . Developer would consulted to ensure that all the UI controls associated with test-data-id which can help to identity control uniquely and consistently.

2. Tests currently only adds appointment which are future dated or after current time , past added appointments are not saved

3. Email notification is verified only for Gmail address , however we would need to enable Gmail API for the account and also would need Client ID and Client Secret to call the Gmail API to read emails.

Installation 

Clone or download the project from the GitHub
Extract and open in the VS-Code
npm i to install the dependencies
npx playwright install to install the browsers
npm run test --ENVIRONMENT=<execution envrionment(prod,uat,sit> e.g. npm run test --ENVIRONMENT=prod
Note : Current we don't have MyBooking application hosted on working environment hence the tests would fail 

Use tags to run a specific or collection of specs or use BROWSER command line argument to run against specific browser
npm run test --TAGS=@E2E --BROWSER=chrome --ENVIRONMENT=prod

Project Folder Structure

config\cucumber.js -> File holding the configuration for Cucumber for running scenarios , this includes location of features file , step definitions , enabling reporting 
environment -> Hold env files one for each environment (.env.prod (production) ,.env.sit(System integration),.env.uat(UAT))  
src\test\features -> write your features here
src\test\steps -> Your step definitions goes here
src\hooks\hooks.ts -> Browser setup and test setup and cleanup code post execution 
src\hooks\pageFixture.ts -> Way to share the page objects to steps
src\helper\environmentManager.ts -> Multiple environments are handled
src\helper\browserManager.ts -> Listing different browsers supported
src\helper\dateTimeManipulation.ts -> Manipulating date and time for provided in the test format it so that it can be consumed by Add appointment screen.
src\utilties -> Place to hold methods to access third party integrations
src\utilties\setupEmailreader.ts -> Connect to Gmail API and read emails for the specified gmail account
src\utilties\credintials.json -> File to Client ID and Client Secret to connect to Gmail API.
test-results -> To hold generated test report
types -> To get environment code suggestions
package.json -> Contains all the dependencies ,script to run 
tsconfig.json ->type script configuration file to all options to be available for selection at complie time

Dependencies 
- gmail-tester : to connect to Gmail api 
- dotenv :  loads environment variables from a .env file into process.env
- ts-node : TypeScript execution engine 

Enhancements which can be considered :

1. Utilizing Page Object Model design pattern for adding one more layer of the abstraction
2. Adding retry mechanism for failed scenarios
3. Adding reporting capabilities with Dashboard and screenshot for failures
4. Inclusion of Database level testing from test cases verified in UI

Handling of Test Configuration

- All the test configuration parameter (Environment specific urls , test user accounts , DB connection parameters) are group under central configuration file\s independent of the test.
- if same parameters are used across different environments (TEST,UAT,PreProd etc.) but with different values separate environment specific should be created and can be referenced during the setup phase of the test allows for greater flexibility and maintainability
- None of the tests should include hard coded urls or configuration parameters
- Approach implemented in the provided automation solution is maintainable scalable if additional environments are added for test execution

In our current project in customs E2E flow includes data flowing through 6-7 different UI application and we are require to execute the e2e test in three different environment. Hence we have created 3 different config file one per environment and each file maintaining configuration parameters for all applications and update to the parameter can be targeted to specific environmental config file.

Handling Test coverage with Automation
- Linking of the automated test with the requirements can provide traceability information. 

In previous project we were using Azure test plan to document test cases on high level and 
- Test cases IDs from Azure test plan were added to the test methods in Automation solution as the attributes
- Further Test cases were linked with the stories in Azure Devops Board
- This provided e2e traceability of requirement to automated test
- Azure Test plan exposed the RestAPIs for updating the test results in the test suite ,hence after each automation test execution the linked test cases were updated with status in Azure Test Plan automatically.

Apart from test linkage with requirement we could also grouping test cases using tags , so test execution can happen based on tags e.g. critical business scenarios can be grouped with tags Smoke so after each deployment we run testcase with tag as Smoke to get quicker feedback on deployment.


Handling of Flaky test cases
- Understanding reason for flakiness of the test\s (e.g. rendering of UI or network connectivity or delay in the response time) and refactor the test case to use other method of verification (e.g. if UI can be skipped and business logic can verified on API level)
- Mock responses from third party application
- Separate flaky test cases from Smoke or Regression suite so pipeline are not impacted and run flaky tests as separate suite with some delay
- Disintegrate flaky tests in small tests if possible 
- In our current project triggering point for the E2E tests is dependent creation of database record which is triggered from other external application, sometimes time required to create record in DB is not consistent hence E2E tests failed in many occasions. Hence we created the required record in the database using script using Liquibase libray before the test is triggered hence we are not more dependent on external response to generated record. This reduced execution time and inconsistent result frequency significantly and we are able to run test cases across different environment parallely with unexpected failures.






 













