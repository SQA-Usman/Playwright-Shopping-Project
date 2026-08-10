import {test , expect} from "@playwright/test"

test('Test hide/unhide element' , async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    // Test hide and show elements
    // Validate field is visible
    await expect(page.locator('#displayed-text')).toBeVisible()
    // Hide the field
    await page.locator('#hide-textbox').click()
    // Validate field is hidden
    await expect(page.locator('#displayed-text')).toBeHidden()
})

test.only('Test popup' , async({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    // Click on confirm dialog and ok it
    await page.on('dialog' , async(dialog) => {
        expect(dialog.message()).toContain('Hello , Are you sure you want to confirm?')
        await dialog.accept()
    })
    await page.locator('#confirmbtn').click()

    // Click on confirm dialog and cancel it
    // await page.on('dialog', dialog => dialog.dismiss())
    // await page.locator('#confirmbtn').click()

    // Handle hover action
    await page.pause()
    await page.locator('#mousehover').hover()

    

})