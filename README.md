# EverWell-Tech-Assessment
Technical Assessment for EverWell Test automation Lead role

# Introduction
MyBookings web application provides basic functionalities for organizing calendar activities hence the Test automation solution ensures that end-to-end (E2E) scenarios are functioning correctly for users when scheduling online appointments. 

The test automation solution covers below uses cases currently
1. User authentication to the application
2. Logged in user making an appointment for future date and time and confirming visibility of the appointment in the calendar and confirming receiving an email notification
3. Ensuring user is unable to make a past appointment
4. Confirming unsaved appointments do not erroneously appear in the calendar

Test coverage could be expanded to editing or deleting existing appointment although the wireframe does not specify UI behavior or flows for these scenarios , however these scenarios could be easily incorporated in testing suite in future.

# Technology choices :
We have considered building the test automation framework using below test automation tools\libraries

**Automation Testing Tool: Playwright**
Cross browser compatibility testing - Playwright supports all modern rendering engines, including Firefox, WebKit, and Chromium. MyBookings application being a web application ensuring its compatibility all popular web browsers is crucial for providing a seamless user experience.
Headless and GUI execution - Playwright provides both execution of test through UI and headless mode to support faster execution
API testing support - Playwright provides capability of doing API testing.With this capability, you can effectively test the business logic of Web APIs in MyBookings application.Playwright API testing feature can be utilized to verify MyBooking's integration with services like Azure Redis and external vendors such as Google, enabling comprehensive contract and service-level testing. 
In the current implementation have mechanism of verifying the email notifications sent to Gmail over Gmail APIs

**Test cases documentation : Cucumber**
Cucumber was used to document test cases in Gherkin format (Given When Then) which makes its easier for business stakeholders and test analysts to understand the coverage. With understanding that this framework would be consumed by the other teams considering the test documentation in a user friendly language will encourage the usage and collaboration.
 
# Architectural decisions
Integrating Cucumber libraries with Playwright for automation offers a structured approach that enhances both the technological outlook and user experience.Below aspects of test automation framework provides full-fledge solution which is maintainable , flexible and scalable.

**Test case development**
- Feature files helps provides test documentation capability in plain English language and is abstracted from technical implementation in the steps definition file.
- 
**Hooks**
- Common steps which are required for each test execution (e.g. setting up browser , selecting environment to run the test in, closing browsers etc. ) are scripted in Hooks folders for reusability and readability

**Helpers**
- Common routines for managing browsers , execution environment and functions which manipulate test data for execution are separated from the test implementation. This enables better readability of the test steps and common implementations can shared across the different test flows in future

**Utilities**
- Any third party integration methods would be implemented 

**Reporting**
- Cucumber provides inbuilt HTML reporting capabilities for test execution which is configured from the Cucumber.js config file , hence we don't need any separate third party libraries for test reporting

**Test Configuration**
- Test configuration parameters such as environment specific parameter , selection of test cases based on tags and browser selection is parameterized and can managed over command line argument.

**Test Data Management**
- Test scenarios requiring testing with combination of test data can be provided along with test scenarios as examples so no requirement of external source for generating and maintaining test data.

# 3. Implementation strategy
   
Test scenario execution can be triggered via command line using command npm run test --ENVIRONMENT=<execution envrionment(prod,uat,sit> this will launch application with url from specified environment file in Chrome (default browser) and will start executing all the tests from all the feature files.

Additional arguments can be provided in the command line to specify which browser to run the test cases and test cases with specific tags to be executed 
e.g. npm run test --TAGS=@E2E --BROWSER=chrome --ENVIRONMENT=prod

New test execution report is generated for each execution under test-results folder in the project

# 4. Independency in execution 
Tests implemented doesn't require any pre-requiste with regards to data setup prior to execution. Test data is self generated in the test specifically the date and time of the appointments are based on your current date and time of the system and is up to date for every execution.

# 4. Testing automation education and coaching
With the test cases implemented in the Gherkin format gives better understanding of the test coverage and doesn't require specialized training to understand test implementation. Also each step implementated performs the actions specified in the scenarios so testers can start contributing by generating the scenarios and reusing the steps already implemented with minimal supervision.

# Assumptions
1. The automation test solution is build on the wireframe provided in the document. The UI controls shown the wireframe screens are considered to have selection attribute named "test-data-id" and this attribute will be available to all the UI controls with the value unique to that control on the page e.g. Email address field on login page will have "test-data-id*='emailaddress'" . Developers would consulted to ensure that all the UI controls added to the page will have associated test-data-id attribute which can help to identity control uniquely and consistently.

2. Tests currently only adds appointment which are future dated or timed, past added appointments are not saved

3. Email notification is verified only currently for Gmail addresses , however we would need to enable Gmail API for the google account and also would need account specific Client ID and Client Secret to call the Gmail API to read emails.

# Installation 
1. Clone or download the project from the GitHub using command git clone https://github.com/makrandv/EverWell-Tech-Assessment.git
2. Open the cloned project in the VS-Code
3. Run npm i to install the dependencies
4. npx playwright install to install the browsers
5. npm run test --ENVIRONMENT=<execution envrionment(prod,uat,sit> e.g. npm run test --ENVIRONMENT=prod
Note : Current we don't have MyBooking application hosted on working environment hence the tests would fail 
6. Use tags to run a specific or collection of specs or use BROWSER command line argument to run against specific browser
e.g. npm run test --TAGS=@E2E --BROWSER=chrome --ENVIRONMENT=prod

**Project Folder Structure**

config\cucumber.js -> File holding the configuration for Cucumber for running scenarios , this includes location of features file , step definitions , enabling reporting 
environment -> Hold env files one for each environment (.env.prod (production) ,.env.sit(System integration),.env.uat(UAT))  
src\test\features -> write your features here
src\test\steps -> Your step definitions goes here
src\hooks\hooks.ts -> Browser setup and test setup and cleanup code post execution 
src\hooks\pageFixture.ts -> Way to share the page objects to steps
src\helper\environmentManager.ts -> Switching of environments are handled
src\helper\browserManager.ts -> Listing different browsers supported
src\helper\dateTimeManipulation.ts -> Manipulating date and time based on current date and time.
src\utilties -> Place to hold methods to access third party integrations
src\utilties\setupEmailreader.ts -> Connect to Gmail API and read emails for the specified gmail account
src\utilties\credintials.json -> File to hold Client ID and Client Secret to connect to Gmail API.
test-results -> To hold generated test report
types -> To get environment code suggestions
package.json -> Contains all the dependencies ,script to run 
tsconfig.json ->type script configuration file for visibility of options to be available for selection at complie time

**Dependencies Added **
- gmail-tester : to connect to Gmail api 
- dotenv :  loads environment variables from a .env file into process.env
- cross-env : Specify environment variable to run test against in command line at run time.
- ts-node : TypeScript execution engine 

**Enhancements which can be considered to be added in future:**

1. Utilizing Page Object Model design pattern for adding one more layer of the abstraction for page so step definition files will only implement the actions to performed reference the controls from the specific page.
2. Adding retry mechanism for failed scenarios
3. Adding reporting capabilities with Dashboard and screenshot for failed scenarios
4. Inclusion of Database level testing from test cases currently verified in UI

# Excreise 2

**Handling of Test Configuration**
- All the test configuration parameters (Environment specific urls , test user accounts , DB connection parameters) are grouped under central configuration file\s independent of the test.
- if same parameters are used across different environments (TEST,UAT,PreProd etc.) but with different values then separate environment specific should be created and can be referenced during the setup phase of the test execution , so tests are executed with those configuration values. 
- None of the tests should include hard coded urls or configuration parameters
- Approach implemented in the provided automation solution demonstrates this approach

Example
In our current project in Customs E2E flow includes data flowing through 6 different UI applications and we are require to execute the e2e test in three different environment. Hence we have created 3 different config file one per environment and each environment file maintaining configuration parameters for all applications specific to that environment and any update to the parameter can be targeted to specific environmental config file.

**Handling Test coverage with Automation**
- Linking of the automated test with the requirements can provide traceability information around the test coverage 

Example
In previous project we were using Azure test plan to document test cases on high level and 
- Test cases IDs from Azure test plan were added to the test methods in automation solution as the attributes
- Further test cases were linked with the stories in Azure Devops Board
- This provided e2e traceability of requirement to automated test
- Azure Test plan exposed the RestAPIs for updating the test results in the test suite ,hence after each automation test execution the linked test cases were updated with status in Azure Test Plan automatically using the Rest calls made from the test method

Apart from test linkage with requirement we could also group test cases using tags , so test execution can managed based on tags e.g. critical business scenarios can be grouped with tags Smoke so after each deployment we run testcase with tag as Smoke to get quicker feedback on deployment.This would provide better control of test execution when coverage of the automated tests keeps increasing over the period of time.

**Handling of Flaky test cases**
- Understanding cause for flakiness of the test\s (e.g. rendering of UI or network connectivity or delay in the response time) and refactor the test case to use other methods of verification for same tests (e.g. if tests is verifying business logic can we consider skipping the UI and business logic can verified on API level\DB level) this would improve test execution time.
- Mock responses from third party application for standard responses.
- Separate flaky test cases from Smoke or Regression suite so pipeline are not impacted and run flaky tests as separate suite with some delay or add retry mechanism for failed tests.
- Disintegrate flaky tests in small tests if possible

Example
In our current project triggering point for the automated E2E tests is dependent on creation of database record which is triggered from other external application.Time required to create record in DB is not consistent hence E2E tests failed in many occasions. Hence to reduce failure due time delay in record creation , we are created the required record in the database using script using library called Liquibase before the test is triggered.Hence we are no more dependent on external response to generated record. This has reduced execution time and inconsistent result frequency significantly and we are able to run test cases across different environment parallely with unexpected failures.
