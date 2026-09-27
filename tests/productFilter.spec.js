import { expect, test } from "../utils/fixtures";

test.use({ userIndex: 3 });

test("Filter", async ({ page, login }) => {

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
