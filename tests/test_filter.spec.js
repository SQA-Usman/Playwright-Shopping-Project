import { expect, test } from "@playwright/test";
import { LoginPage } from "../PageObject/loginpage";
import fs from "fs";

const users = JSON.parse(
    fs.readFileSync("./utils/userData.json", "utf-8")
);

test("Filter", async ({ page }) => {

    const user = users[3];
    const loginPage = new LoginPage(page);

    // Go to application
    await loginPage.goTo();

    // Login
    await loginPage.validLogin(user.email, user.password);

    // Ensure navigation after login
    await expect(page.locator(".card-body b").first())
        .toContainText("ADIDAS ORIGINAL");

    // Apply price filter
    await page.locator('[name="minPrice"]').nth(1).fill("10000");
    await page.locator('[name="maxPrice"]').nth(1).fill("20000");
    await page.keyboard.press('Enter');

    // Verify iPhone 13 Pro is NOT displayed
   await expect(page.getByText("iPhone 13 Pro", { exact: true }))
    .not.toBeVisible();
});