# COVER-E2E-PLAYWRIGHT

E2E test automation project for **SauceDemo** (https://www.saucedemo.com) using **Playwright + TypeScript**, **POM**, **Custom Fixtures**, and **Reports (HTML + Allure)**.

---

## Project Overview

This project validates core user flows:
- Login (valid/invalid/locked users)
- Products listing and sorting
- Cart operations (add/remove/empty cart)
- Checkout (Step One validations + full successful flow)
- Navigation & logout (protected URLs, side menu)

Test cases and priorities are documented in: **TEST_PLAN.md**

---

## Tech Stack

- Playwright (TypeScript)
- Page Object Model (POM) + Components
- Custom Fixtures (injecting page objects)
- Built-in Assertions + Soft Assertions (where appropriate)
- Reporting: Playwright HTML Reporter + Allure
- Env config: `.env` + `.env.example`

---

## Prerequisites

- Node.js (LTS recommended)
- npm

---

## Installation

```bash
git clone <YOUR_REPO_URL>
cd COVER-E2E-PLAYWRIGHT
npm install
```

---

## Environment Variables

This project reads base URL and credentials from `.env`.

The repository includes a `.env.example` file that defines all required environment variables.

### 1️⃣ Create a local `.env` file

```bash
cp .env.example .env
```

### 2️⃣ Fill the values inside `.env`

```env
BASE_URL=https://www.saucedemo.com

STANDARD_USER=standard_user
LOCKED_OUT_USER=locked_out_user
PROBLEM_USER=problem_user
PERFORMANCE_USER=performance_glitch_user

PASSWORD=secret_sauce
```

> ⚠️ The `.env` file should **NOT** be committed to version control.  
> Only `.env.example` is tracked in the repository.

---

## Running Tests

### Run all tests (all configured browsers)

```bash
npx playwright test
```

### Run tests on Chromium only (recommended locally)

```bash
npx playwright test --project=chromium
```

### Run tests in UI mode

```bash
npx playwright test --ui --project=chromium
```

### Run in headed mode (visible browser)

```bash
npx playwright test --headed --project=chromium
```

---

## Parallel Execution

The tests are fully isolated and support parallel execution.

- Each test runs in a fresh browser context
- No shared state between tests
- Login and setup are handled via custom fixtures
- Configured with `fullyParallel: true`

---

## Retry Logic

Retry logic is configured globally in `playwright.config.ts`:

```
retries: 1
```

If a test fails, it will automatically retry once before being marked as failed.

---

## Visual Regression Testing
A minimal visual regression test is implemented using Playwright’s screenshot comparison to detect unintended UI changes on the Products page.

## Screenshots, Videos & Traces

Configured in `playwright.config.ts`:

```
trace: 'on-first-retry'
screenshot: 'only-on-failure'
video: 'retain-on-failure'
```

- 📸 Screenshot is captured on failure
- 🎥 Video is retained on failure
- 🔍 Trace is recorded on the first retry

---

## Reports

### Playwright HTML Report

```bash
npx playwright show-report
```

Report output directory: `playwright-report/`

### Allure Report

Allure results are generated automatically in: `allure-results/`

To view the Allure report locally:

```bash
allure serve allure-results
```

---

## Project Structure

```
COVER-E2E-PLAYWRIGHT/
├── components/          # Reusable UI components (e.g., SideMenu)
├── fixtures/            # Custom Playwright fixtures
├── pages/               # Page Object Model (POM) classes
├── tests/               # Test specifications grouped by feature
├── utils/               # Config and helper utilities
├── data/                # Test data (if applicable)
├── playwright.config.ts # Global configuration
├── TEST_PLAN.md         # Test cases and priorities
├── README.md            # Project documentation
├── .env.example         # Environment variables template
└── .env                 # Local environment variables (not committed)
└── .gitignore           # Git ignore rules
```

---

## Notes

- Cross-browser testing is configured (Chromium, Firefox, WebKit)
- Tests support parallel execution
- Environment variables are required for execution
- Reporting includes both HTML and Allure formats
