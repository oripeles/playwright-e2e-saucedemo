# Playwright E2E – SauceDemo

E2E test automation project for **SauceDemo** (https://www.saucedemo.com) built with **Playwright + TypeScript**.

This project demonstrates a clean, scalable automation architecture including:

- **UI automation** with Playwright (Page Object Model)
- **BasePage** abstract class with built-in logging
- Clean **custom fixtures** architecture (auto-login, page injection)
- **Allure** reporting with `test.step()` integration
- **Native test tags** (`@smoke`, `@regression`, `@visual`)
- **ESLint + Prettier** with pre-commit hooks (Husky)
- **Global setup** with health check
- **Docker** execution (headless)
- **CI/CD** with GitHub Actions and **GitHub Pages** publishing of the Allure HTML report

---

## Tech Stack

- Language: TypeScript (strict mode)
- UI Automation: Playwright Test
- Design Pattern: Page Object Model (POM) + Components
- Fixtures: Custom Playwright fixtures (loginPage, productsPage)
- Assertions: Built-in + Soft Assertions
- Reporting: Playwright HTML Reporter + Allure
- Code Quality: ESLint + Prettier + Husky pre-commit hooks
- Containerization: Docker
- CI/CD: GitHub Actions + GitHub Pages (Allure HTML)

---

## What's Covered

### UI Tests

- Login (valid, invalid, locked, problem, performance glitch users)
- Products listing, sorting (A-Z, price), product details
- Cart operations (add, remove, multiple products, empty cart)
- Checkout (form validations + full successful flow)
- Navigation & logout (side menu, protected URLs, reset app state)
- Visual regression (screenshot comparison across 7 devices: desktop, mobile, tablet)
- Security-aware testing (SQL injection, XSS, input validation, password masking)

### Test Tags (Playwright Native)

Tags are defined using Playwright's native `tag` option, not in test names:

```typescript
test.describe('Login Tests', { tag: '@regression' }, () => {
  test('TC-LOGIN-01 – Login with valid user', { tag: '@smoke' }, async ({ loginPage }) => {
    // ...
  });
});
```

| Tag           | Purpose                              |
| ------------- | ------------------------------------ |
| `@smoke`      | Critical path tests (fast feedback)  |
| `@regression` | Broader suite                        |
| `@visual`     | Visual regression (excluded from CI) |

### Failure Debugging

- Screenshot captured on failure
- Video retained on failure
- Trace recorded on first retry

---

## Project Structure

```
playwright-e2e-saucedemo/
├── .github/
│   └── workflows/
│       └── playwright-ci.yml    # CI: smoke + nightly regression
├── .husky/
│   └── pre-commit               # Lint-staged on commit
├── components/                  # Reusable UI components (SideMenu)
├── fixtures/                    # Custom Playwright fixtures
├── pages/                       # Page Object Model classes
│   ├── base.page.ts             # Abstract BasePage with logger
│   ├── login.page.ts
│   ├── products.page.ts
│   ├── cart.page.ts
│   ├── checkout-step-one.page.ts
│   ├── checkout-overview.page.ts
│   ├── checkout-complete.page.ts
│   └── product-details.page.ts
├── tests/                       # Test specs grouped by feature
│   ├── login.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── navigation.spec.ts
│   ├── visual.spec.ts
│   └── security.spec.ts
├── utils/                       # Config and logger
│   ├── config.ts
│   └── logger.ts
├── global-setup.ts              # Health check before tests
├── Dockerfile                   # Docker execution
├── .dockerignore
├── playwright.config.ts         # Global configuration
├── tsconfig.json                # TypeScript strict mode
├── eslint.config.mjs            # ESLint flat config
├── .prettierrc                  # Prettier config
├── TEST_PLAN.md                 # Test cases and priorities
├── .env.example                 # Environment variables template
└── .gitignore
```

---

## Prerequisites

- Node.js (LTS recommended)
- npm
- Docker (optional, for containerized execution)

---

## Installation

```bash
git clone https://github.com/oripeles/playwright-e2e-saucedemo.git
cd playwright-e2e-saucedemo
npm install
npx playwright install --with-deps
```

---

## Environment Variables

Create a local `.env` file:

```bash
cp .env.example .env
```

The `.env.example` file is pre-filled with SauceDemo's public credentials:

```env
BASE_URL=https://www.saucedemo.com

STANDARD_USER=standard_user
LOCKED_OUT_USER=locked_out_user
PROBLEM_USER=problem_user
PERFORMANCE_USER=performance_glitch_user

PASSWORD=secret_sauce
```

---

## Running Tests Locally

```bash
# Run all tests (all browsers)
npm test

# Run on Chromium only
npm run test:chromium

# Run smoke tests only
npm run test:smoke

# Run regression tests
npm run test:regression

# Run in headed mode (visible browser)
npm run test:headed

# Run in UI mode (interactive)
npx playwright test --ui --project=chromium
```

---

## Running Tests with Docker

1. Build the Docker image:

```bash
docker build -t playwright-tests .
```

2. Run tests inside Docker:

```bash
docker run --rm \
  -e BASE_URL="https://www.saucedemo.com" \
  -e STANDARD_USER="standard_user" \
  -e LOCKED_OUT_USER="locked_out_user" \
  -e PROBLEM_USER="problem_user" \
  -e PERFORMANCE_USER="performance_glitch_user" \
  -e PASSWORD="secret_sauce" \
  -v "$(pwd)/allure-results:/app/allure-results" \
  playwright-tests
```

3. Run smoke tests only (override default CMD):

```bash
docker run --rm \
  -e BASE_URL="https://www.saucedemo.com" \
  -e STANDARD_USER="standard_user" \
  -e PASSWORD="secret_sauce" \
  -v "$(pwd)/allure-results:/app/allure-results" \
  playwright-tests \
  npx playwright test --project=chromium --grep @smoke
```

---

## Code Quality

### ESLint + Prettier

```bash
# Check for lint errors
npm run lint

# Auto-fix lint errors
npm run lint:fix

# Check formatting
npm run format:check

# Auto-format all files
npm run format
```

### Pre-commit Hooks (Husky + lint-staged)

On every `git commit`, Husky automatically runs:

- **`.ts` files** → ESLint fix + Prettier format
- **`.json`, `.yml`, `.md` files** → Prettier format

Bad code cannot be committed.

---

## Reports

### Playwright HTML Report

```bash
npm run report
```

### Allure Report

```bash
npm run allure:serve
```

Or generate a static report:

```bash
npm run allure:generate
```

---

## CI/CD (GitHub Actions)

Tests are executed inside Docker using the same image and configuration as local runs.

### Workflow: `.github/workflows/playwright-ci.yml`

| Trigger                      | Job                  | What Runs                                           |
| ---------------------------- | -------------------- | --------------------------------------------------- |
| Push to `main` / PR          | `smoke-tests`        | `@smoke` tagged tests only                          |
| Nightly (23:00 UTC) / Manual | `nightly-regression` | All tests (3 browsers) + visual on 4 mobile devices |
| After regression             | `deploy`             | Allure report to GitHub Pages                       |

### Live Allure Report

https://oripeles.github.io/playwright-e2e-saucedemo/

### CI Secrets Required

Create these in: **Settings > Secrets and variables > Actions**

| Secret             | Value                     |
| ------------------ | ------------------------- |
| `STANDARD_USER`    | `standard_user`           |
| `LOCKED_OUT_USER`  | `locked_out_user`         |
| `PROBLEM_USER`     | `problem_user`            |
| `PERFORMANCE_USER` | `performance_glitch_user` |
| `PASSWORD`         | `secret_sauce`            |

---

## Global Setup

Before any test runs, a health check verifies the target site is up. If the site is down, all tests are skipped immediately with a clear error message.

Configured in `playwright.config.ts`:

```typescript
globalSetup: './global-setup.ts';
```

---

## Parallel Execution

- Tests are fully isolated and run in parallel (`fullyParallel: true`)
- Each test runs in a fresh browser context
- Login and setup are handled via custom fixtures
- CI uses 1 worker for stability; locally uses all available CPU cores

---

## Cross-Browser & Multi-Device Support

Configured in `playwright.config.ts`:

### Functional Tests (all test suites)

| Project    | Browser         |
| ---------- | --------------- |
| `chromium` | Desktop Chrome  |
| `firefox`  | Desktop Firefox |
| `webkit`   | Desktop Safari  |

### Visual Tests – Mobile & Tablet (`@visual` only)

| Project                    | Device            |
| -------------------------- | ----------------- |
| `visual-iphone-14`         | iPhone 14         |
| `visual-iphone-14-pro-max` | iPhone 14 Pro Max |
| `visual-pixel-7`           | Pixel 7           |
| `visual-ipad`              | iPad (gen 7)      |

CI runs all browsers for regression + mobile devices for visual tests.
