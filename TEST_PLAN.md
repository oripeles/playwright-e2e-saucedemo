# Test Plan – Saucedemo E2E Automation

## 1. Overview

This document describes the test plan for end-to-end (E2E) automated testing of the Saucedemo demo e-commerce website (https://www.saucedemo.com).

The purpose of this test plan is to validate core user flows using Playwright, with a focus on building a modular, maintainable, and scalable automation framework following industry best practices.

---

## 2. Scope

### In Scope
- Login functionality
- User authentication scenarios
- Error handling and validation messages
- Navigation after successful login

### Out of Scope
- Advanced security testing (SQL injection, brute force attacks)
- UI/UX visual validation
- Backend/API testing
- User management (create/update/delete users)

---

## 3. Test Data

The application provides built-in demo users with predefined behaviors:
- standard_user
- locked_out_user
- problem_user
- performance_glitch_user

Credentials and environment-specific values are managed via environment variables.

---

## 4. Login Test Cases

| Test ID     | Description                        | Priority |
| ----------- | ---------------------------------- | -------- |
| TC-LOGIN-01 | Login with valid user              | High     |
| TC-LOGIN-02 | Login with locked user             | High     |
| TC-LOGIN-03 | Login with invalid password        | High     |
| TC-LOGIN-04 | Login with empty fields            | Medium   |
| TC-LOGIN-05 | Login with problem user            | Medium   |
| TC-LOGIN-06 | Login with performance glitch user | Low      |

### TC-LOGIN-01 – Login with valid user

**Steps:**

1. Navigate to the login page.

2. Enter a valid username (standard_user).

3. Enter a valid password.

4. Click the Login button.

**Expected Result:**

User is successfully authenticated.

User is redirected to the Products page.

### TC-LOGIN-02 – Login with locked user

**Steps:**

1. Navigate to the login page.

2. Enter username locked_out_user.

3. Enter a valid password.

4. Click the Login button.

**Expected Result:**

Login fails.

An error message indicating the user is locked is displayed.

User remains on the login page.

### TC-LOGIN-03 – Login with invalid password 

**Steps:**

1. Navigate to the login page.

2. Enter a valid username.

3. Enter an invalid password.

4. Click the Login button.

**Expected Result:**

Login fails.

An authentication error message is displayed.

User remains on the login page.

### TC-LOGIN-04 – Login with empty fields

**Steps:**

1. Navigate to the login page.

2. Leave username and password fields empty.

3. Click the Login button.

**Expected Result:**

Login is blocked.

A validation error message is displayed.

### TC-LOGIN-05 – Login with problem user

**Steps:**

1. Navigate to the login page.

2. Enter username problem_user.

3. Enter a valid password.

4. Click the Login button.

**Expected Result:**

User is redirected to the Products page.

Application does not crash or block the user flow.

### TC-LOGIN-06 – Login with performance glitch user

**Steps:**

1. Navigate to the login page.

2. Enter username performance_glitch_user.

3. Enter a valid password.

Click the Login button.

**Expected Result:**

Login succeeds after a noticeable but reasonable delay.

User is redirected to the Products page.

---

## 5. Products Test Cases

| Test ID    | Description                                | Priority |
| ---------- | ------------------------------------------ | -------- |
| TC-PROD-01 | Products page is displayed                 | High     |
| TC-PROD-02 | Products list contains valid product items | High     |
| TC-PROD-03 | Sort products by name (A to Z)             | Medium   |
| TC-PROD-04 | Sort products by price (low to high)       | Medium   |
| TC-PROD-05 | Open product details page                  | Medium   |
| TC-PROD-06 | Add product to cart from products page     | High     |


### TC-PROD-01 – Products page is displayed

**Steps:**

1. Login with a valid user.

2. Navigate to the Products page.

**Expected Result:**

Products page is displayed successfully.

The page title "Products" is visible.

A list of products is shown.

### TC-PROD-02 – Products list contains valid product items

**Steps:**

1. Login with a valid user.

2. Navigate to the Products page.

**Expected Result:**

At least one product is displayed.

Each product contains:

Product name

Product price

"Add to cart" button

Product image

### TC-PROD-03 – Sort products by name (A to Z)

**Steps:**

1. Login with a valid user.

2. Navigate to the Products page.

3. Select sorting option "Name (A to Z)".

**Expected Result:**

Products are sorted alphabetically from A to Z by name.

### TC-PROD-04 – Sort products by price (low to high)

**Steps:**

1. Login with a valid user.

2. Navigate to the Products page.

3. Select sorting option "Price (low to high)".

**Expected Result:**

Products are sorted by price from lowest to highest.

### TC-PROD-05 – Open product details page

**Steps:**

1. Login with a valid user.

2. Navigate to the Products page.

3. Click on a product name.

**Expected Result:**

User is navigated to the Product Details page.

Product name, price, description, and image are displayed.

### TC-PROD-06 – Add product to cart from products page

**Steps:**

1. Login with a valid user.

2. Navigate to the Products page.

3. Click "Add to cart" on a product.

**Expected Result:**

Product is added to the cart.

Cart icon badge is updated accordingly.

---

## 7. Cart Test Cases

| Test ID     | Description                                   | Priority |
| ----------- | --------------------------------------------- | -------- |
| TC-CART-01  | Cart is empty initially                       | Medium   |
| TC-CART-02  | Added product appears in cart                 | High     |
| TC-CART-03  | Multiple products appear correctly in cart    | High     |
| TC-CART-04  | Remove product from cart                      | Medium   |
| TC-CART-05  | Continue shopping navigates to Products page  | Medium   |
| TC-CART-06  | Checkout button navigates to checkout page    | High     |

### TC-CART-01 – Cart is empty initially

**Steps:**

1. Login with a valid user.

2. Navigate to the Cart page.

**Expected Result:**

Cart page is displayed.

No products are listed in the cart.

Cart badge is not displayed.

### TC-CART-02 – Added product appears in cart

**Steps:**

1. Login with a valid user.

2. Add product "Sauce Labs Backpack" to the cart.

3. Navigate to the Cart page.

**Expected Result:**

Product "Sauce Labs Backpack" is displayed in the cart.

Product price "$29.99" is displayed.

Product quantity is set to 1.

Cart badge displays "1".

### TC-CART-03 – Multiple products appear correctly in cart

**Steps:**

1. Login with a valid user.

2. Add product "Sauce Labs Backpack" to the cart.

3. Add product "Sauce Labs Bolt T-Shirt" to the cart.

4. Navigate to the Cart page.

**Expected Result:**

Both products are displayed in the cart.

Each product shows the correct name and price.

Cart badge displays "2".

### TC-CART-04 – Remove product from cart

**Steps:**

1. Login with a valid user.

2. Add product "Sauce Labs Backpack" to the cart.

3. Navigate to the Cart page.

4. Click "Remove" for the product.

**Expected Result:**

Product is removed from the cart.

Cart badge is updated accordingly or removed.

Cart is empty.

### TC-CART-05 – Continue shopping navigates back to Products page

**Steps:**

1. Login with a valid user.

2. Add a product to the cart.

3. Navigate to the Cart page.

4. Click "Continue Shopping".

**Expected Result:**

User is navigated back to the Products page.

### TC-CART-06 – Checkout button navigates to checkout page

**Steps:**

1. Login with a valid user.

2. Add a product to the cart.

3. Navigate to the Cart page.

4. Click "Checkout".

**Expected Result:**

User is navigated to the checkout step one page.

Checkout form is displayed.

---

## 8. Checkout Test Cases

| Test ID   | Description                                                   | Priority |
| --------- | ------------------------------------------------------------- | -------- |
| TC-CHK-01 | Navigate to Checkout Step One from Cart                       | High     |
| TC-CHK-02 | Checkout Step One – validation: all fields empty              | High     |
| TC-CHK-03 | Checkout Step One – validation: missing First Name            | Medium   |
| TC-CHK-04 | Checkout Step One – validation: missing Last Name             | Medium   |
| TC-CHK-05 | Checkout Step One – validation: missing Zip/Postal Code       | Medium   |
| TC-CHK-06 | Complete checkout successfully (Step One → Overview → Finish) | High     |

### TC-CHK-01 – Navigate to Checkout Step One from Cart

**Steps:**

1. Login with a valid user.

2. Add a product to cart.

3. Open Cart page.

4. Click Checkout.

**Expected Result:**

User is navigated to Checkout: Your Information page (/checkout-step-one.html).

Checkout form fields are visible.

### TC-CHK-02 – Validation: all fields empty

**Steps:**

1. Login with a valid user.

2. Add a product to cart → open Cart → click Checkout.

3. Click Continue without filling anything.

**Expected Result:**

Error message is displayed: “Error: First Name is required” (this is what the site typically shows first).

User stays on Step One page.

### TC-CHK-03 – Validation: missing First Name

**Steps:**

1. Reach Checkout Step One.

2. Fill Last Name + Zip Leave First Name empty.

3. Click Continue.

**Expected Result:**

Error message: “Error: First Name is required”.

### TC-CHK-04 – Validation: missing Last Name

**Steps:**

1. Reach Checkout Step One.

2. Fill First Name + Zip. Leave Last Name empty.

3. Click Continue.

**Expected Result:**

Error message: “Error: Last Name is required”.

### TC-CHK-05 – Validation: missing Zip/Postal Code

**Steps:**

1. Reach Checkout Step One.

2. Fill First Name + Last Name. Leave Zip empty.

3. Click Continue.

**Expected Result:**

Error message: “Error: Postal Code is required”.

### TC-CHK-06 – Complete checkout successfully

**Steps:**

1. Login with a valid user.

2. Add 1–2 products to cart.

3. Open Cart → Checkout.

4. Fill First Name, Last Name, Zip and click Continue.

5. On Overview page verify items + total area is visible.

6. Click Finish.

**Expected Result:**

User reaches Checkout Complete page .

A success message is displayed.

---

## 9. Logout & Navigation Test Cases

| Test ID   | Description                                                   | Priority |
| --------- | ------------------------------------------------------------- | -------- |
| TC-NAV-01 | Open and close side menu                                      | Medium   |
| TC-NAV-02 | Logout redirects user to Login page                           | High     |
| TC-NAV-03 | Cannot access Products page after logout                      | High     |
| TC-NAV-04 | Direct navigation to protected URL without login              | High     |
| TC-NAV-05 | Cart icon navigates correctly                                 | Medium   |
| TC-NAV-06 | Reset App State clears cart and restores product button state | Medium   |

### TC-NAV-01 – Open and close side menu

**Steps:**

1. Login with a valid user.

2. Click the menu (hamburger) button in the header.

3. Verify that the side menu is displayed.

4. Click the close (X) button on the side menu.

**Expected Result:**

Side menu is opened successfully.

Menu items are visible:

All Items

About

Logout

Reset App State

Side menu is closed after clicking the close button.

User remains on the current page.

### TC-NAV-02 – Logout redirects user to Login page

**Steps:**

1. Login with a valid user.

2. Open the side menu.

3. Click the Logout option.

**Expected Result:**

User is logged out successfully.

User is redirected to the Login page.

Login form (username and password fields) is visible.

### TC-NAV-03 – User cannot access Products page after logout

**Steps:**

1. Login with a valid user.

2. Logout from the application.

3. Manually navigate to /inventory.html using the browser URL.

**Expected Result:**

User is redirected back to the Login page.

Products page is not accessible without authentication.

### TC-NAV-04 – Direct access to protected pages without login

**Steps:**

1. Open a new browser session.

2. Navigate directly to /cart.html.

3. Navigate directly to /checkout-step-one.html.

**Expected Result:**

User is redirected to the Login page.

Protected pages cannot be accessed without login.

### TC-NAV-05 – Cart icon navigation

**Steps:**

1. Login with a valid user.

2. Click the Cart icon in the header.

**Expected Result:**

User is navigated to the Cart page.

Cart page title “Your Cart” is displayed.

### TC-NAV-06 – Reset App State clears cart and restores application state

**Steps:**

1. Login with a valid user.

2. Add a product to the cart.

3. Verify that the Cart badge displays the correct item count.

4. Open the side menu.

5. Click Reset App State.

6. Open the Cart page.

**Expected Result:**

Cart badge is cleared or not displayed.

Cart page is empty.

Previously added products are removed from the cart.

Application returns to its initial state.

**Note**
If product buttons remain in “Remove” state after reset, this should be reported as a UI state defect!!!

---

## 10. Risks

- The demo site behavior may change without notice
- Performance-related scenarios may be inconsistent
- Error message text may vary

---

## 11. Summary

This test plan defines a focused and effective set of login test scenarios that cover both positive and negative flows, ensuring reliable validation of the authentication process.  
Additional application areas will be added incrementally as automation coverage expands.
