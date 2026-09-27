# Playwright Shopping Project

A Playwright-based end-to-end test automation framework for an e-commerce web application, built with JavaScript and the Page Object Model (POM).

The project automates critical customer journeys including user registration, login, product selection, shopping cart, checkout, and order-related workflows.

## Project Overview

This project demonstrates practical experience in building and maintaining a structured Playwright automation framework for web application testing.

The framework uses reusable Page Objects to separate page interactions from test scenarios, making the automation suite easier to maintain, extend, and scale.

## Automated Test Coverage

The current test suite covers key e-commerce workflows, including:

* User registration / Sign Up
* User login scenarios
* Product filtering
* Add product to cart
* Checkout flow
* End-to-end purchase flow
* Order-related validation

## Key Features

* End-to-end UI automation with Playwright
* Page Object Model (POM)
* Reusable page classes and locators
* Functional workflow validation
* Login and authentication scenarios
* API testing
* Screenshot capture on test failure
* Trace collection for debugging
* Video recording on first retry
* HTML test reporting
* Chromium test execution
* GitHub Actions integration
* Jenkins CI/CD integration

## Technology Stack

* JavaScript
* Playwright
* Node.js
* Page Object Model (POM)
* Git
* GitHub
* GitHub Actions
* Jenkins

## Project Structure

```text
Playwright-Shopping-Project/
│
├── .github/
│   └── workflows/
│
├── PageObject/
│   ├── cardPage.js
│   ├── checkout.js
│   ├── dashboard.js
│   ├── loginpage.js
│   ├── orderHistroyPage.js
│   └── registrationpage.js
│
├── tests/
│   ├── checkoutEndToEnd.spec.js
│   ├── checkoutPageObject.spec.js
│   ├── login.spec.js
│   ├── productFilter.spec.js
│   └── userRegistration.spec.js
│
├── utils/
│
├── Jenkinsfile
├── playwright.config.js
├── package.json
└── package-lock.json
```

## Page Object Model

The framework follows the Page Object Model pattern.

Page-specific actions and locators are maintained separately from the test scenarios inside the `PageObject` directory.

This provides:

* Reusable page interactions
* Better test readability
* Easier maintenance
* Reduced duplication
* Scalable automation structure

### Page Objects

The framework currently includes Page Objects for:

* Registration
* Login
* Dashboard
* Shopping Cart
* Checkout
* Order History

## Test Scenarios

The `tests` directory contains independent Playwright test specifications covering different application workflows.

### Authentication

* User registration
* User login scenarios
* Authentication workflow validation

### Shopping

* Product filtering
* Add product to cart
* Checkout workflow
* End-to-end purchase flow

## Prerequisites

Before running the project, install:

* Node.js
* npm
* Git

Verify the installation:

```bash
node --version
npm --version
git --version
```

## Project Setup

Clone the repository:

```bash
git clone https://github.com/SQA-Usman/Playwright-Shopping-Project.git
```

Navigate to the project:

```bash
cd Playwright-Shopping-Project
```

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running the Tests

Run the complete test suite:

```bash
npm test
```

Run tests with the browser visible:

```bash
npm run test:headed
```

Run tests in debug mode:

```bash
npm run test:debug
```

## Running a Specific Test

Run the end-to-end checkout tests:

```bash
npx playwright test tests/checkoutEndToEnd.spec.js
```

Run the login tests:

```bash
npx playwright test tests/login.spec.js
```

Run the tests using the configured Chromium project:

```bash
npx playwright test --project=chromium
```

## Test Reports

The project uses Playwright's HTML reporter to generate detailed test execution reports.

After running the tests, open the report with:

```bash
npm run report
```

The framework is also configured to capture debugging artifacts such as:

* Screenshots on failure
* Playwright traces
* Videos on first retry

These artifacts help investigate failed test scenarios and identify the root cause of automation failures.

## CI/CD Integration

The project includes CI/CD configuration through:

* GitHub Actions
* Jenkins

This enables the automation suite to be integrated into continuous testing pipelines and executed as part of a CI/CD workflow.

## QA Practices Demonstrated

This project demonstrates practical experience with:

* End-to-end test automation
* Page Object Model
* Functional testing
* Authentication testing
* E-commerce workflow testing
* API testing
* Reusable automation components
* Test reporting
* Failure investigation
* CI/CD integration

## Future Enhancements

Potential improvements to the framework include:

* Cross-browser test execution
* Environment-based test configuration
* Centralized test data management
* Expanded negative and edge-case scenarios
* Parallel test execution
* Enhanced CI/CD reporting
* Additional API test coverage

## Author

Muhammad Usman Saleem

Software QA Engineer | Manual & Automation Testing | API & Database Testing
