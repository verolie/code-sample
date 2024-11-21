# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### The App
#### Backend and Frontend Integration
To ensure smooth operation, follow these steps:

**Start the Backend:**
Make sure the backend is running before the frontend.

**Run the Frontend:**
Access the login page, enter credentials, and verify that the backend returns a valid token.
Check if the token is stored in the browser's cookies and if the username is saved in local storage.
Navigate through the Home Page, Create Product page, and Edit Product page to verify that the status updates (e.g., changing a product to inactive or draft) work as intended.

remember from the backend repo that the product have 3 status:
- active
- draft
- inactive

#### App Structure Overview
**Login Page:**
- The user logs in using credentials.
- On successful login, the backend returns a token:
  - The auth token is stored in cookies.
  - The username is saved in local storage.
-The user is then redirected to the Home Page.

**Home Page:**
- Displays a list of all products with their status (active, draft, or inactive).
- The user has options to:
- Create a new product (navigates to the Create Product page).
- Edit an existing product (navigates to the Edit Product page for that product).
- Delete a product:
  - If the product is active, clicking delete changes its status to inactive.
  - If the product is in draft status, clicking delete performs a hard delete (removes it from the database).
 
**Create Product Page:**
- A form is available to enter product details.
- Two options for saving:
  - Save as Draft: The product status is set to draft.
  - Submit: The product status is set to active.
  - After saving or submitting, the user is redirected to the Home Page.

**Create Product Page:**
- A form is available to enter product details.
- Two options for saving:
  - Save as Draft: The product status is set to draft.
  - Submit: The product status is set to active.
- After saving or submitting, the user is redirected to the Home Page.

**Navigation and User Actions:**
- NavBar includes a user menu:
  - Clicking the username in the NavBar logs out the user.
  - It clears the auth token from cookies and username from local storage.
  - The user is then redirected back to the Login Page.
