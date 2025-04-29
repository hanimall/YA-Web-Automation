# Case Study - Web Automation Tests

This project contains automated tests for the SauceDemo website ([https://www.saucedemo.com/](https://www.saucedemo.com/)) using **JavaScript**, **Selenium WebDriver**, and **Jest**.

## 📁 Project Structure

```
web-tests/
├── pages/
│   └── LoginPage.js          # Page Object Model (POM) for Login Page
│   └── InventoryPage.js      # Page Object Model (POM) for Inventory Page
├── tests/
│   └── login.test.js         # Login Test Cases
│   └── inventory.test.js     # Inventory Test Cases

├── config.js                 # Environment variables centralized
├── .env                      # Hidden credentials (not pushed to GitHub)
├── test-report.html          # HTML test report (generated after each run)
├── .gitignore
├── package.json
└── README.md
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/YA-Web-Automation.git
cd YA-Web-Automation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your `.env` file

At the root of the project, create a file named `.env` and add:

```env
USERNAME=standard_user
PASSWORD=secret_sauce
LOCKED_OUT_USERNAME=locked_out_user
VISUAL_USERNAME=visual_user
```

> These are the provided users for the SauceDemo site.

### 4. Run the tests

```bash
npm test
```

This will:
- Execute the Selenium tests
- Generate a `test-report.html` file
- Automatically open the report in your browser

---

## Test Scenarios

| Test Description                        | User                 | Expected Result |
|-----------------------------------------|----------------|-|
| Login with valid credentials            | `standard_user`   | Redirected to products page `/inventory.html` |
| Login with locked out user              | `locked_out_user` | Error message appears |
| Verify cart position for visual_user    | `visual_user`     | Cart position should be greater than default values |
| Detect image mismatch between header and reference | `visual_user` | Detect and log differences between screenshots |


---

## 🧰 Tech Stack

- [Node.js](https://nodejs.org/)
- [Selenium WebDriver](https://www.selenium.dev/)
- [Jest](https://jestjs.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [jest-html-reporter](https://www.npmjs.com/package/jest-html-reporter)
- [open-cli](https://www.npmjs.com/package/open-cli)
- [resemblejs](https://www.npmjs.com/package/resemblejs)

---

## 👤 Author

- Hani BOURAS
- han.bouras@gmail.com

---

## 📄 License

This project is for educational and demonstration purposes only.