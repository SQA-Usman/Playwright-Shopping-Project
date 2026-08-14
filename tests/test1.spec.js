const { test, expect } = require('@playwright/test');

test('broswer context', async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await page.locator('#username').fill('johndoe112@gmail.com')
    await page.locator('#password').fill('P@ss123')
    await page.locator('#signInBtn').click()
    console.log(await page.locator('[style*=block]').textContent())
    await expect(page.locator('[style*=block]')).toContainText('Incorrect')
})

test('geting products name', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await page.locator('#username').fill('rahulshettyacademy')
    await page.locator('#password').fill('Learning@830$3mK2')
    await page.locator('#signInBtn').click()
    await expect(page).toHaveTitle('ProtoCommerce');
    const productsName = page.locator('.card-body a')
    // console.log(await productsName.first().textContent())
    await page.waitForLoadState('networkidle')
    console.log(await productsName.allTextContents())
})

test('Test Radio button dropdown and checkbox', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    // Select dropdown value
    await page.locator('select.form-control').selectOption('Consultant')
    await expect(page.locator('select.form-control option:checked')).toHaveText('Consultant')
    // Select Radio button
    await page.locator('input[type="radio"]').last().click()
    await page.locator('#okayBtn').click()
    await expect(page.locator('input[type="radio"]').last()).toBeChecked()
    // Select checkbox
    await page.locator('#terms').click()
    await expect(page.locator('#terms')).toBeChecked()
    // Uncheck checkbox
    await page.locator('#terms').uncheck()
    expect(await page.locator('#terms').isChecked()).toBeFalsy()
    // Checking the blinking link
    const documentLink = page.locator('[href="https://rahulshettyacademy.com/documents-request"]')
    await expect(documentLink).toHaveAttribute('class', 'blinkingText')

})

test('Test new page', async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const documentLink = page.locator('[href="https://rahulshettyacademy.com/documents-request"]')
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ])
    const text = await newPage.locator('.red').textContent()
    const arraytext = text.split('@')
    const domain = arraytext[1].split(' ')[0]
    console.log(domain)
    await page.locator('#username').fill(domain)
    console.log(await page.locator('#username').textContent())
    console.log(await page.locator('#username').inputValue())

})