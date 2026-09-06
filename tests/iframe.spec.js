import { test, expect } from '@playwright/test'

test('Hanfle iframe', async({page}) => {
    await page.goto('https://syntaxprojects.com/handle-iframe.php?')
    const outerFrame = page.frameLocator('#textfieldIframe')
    const innerFrame = outerFrame.frameLocator('#checkboxIframe')
    await outerFrame.locator('[placeholder="Topic"]').fill('Test')
    await innerFrame.getByLabel('Inner Frame Check box').check()
    await expect (outerFrame.locator('[placeholder="Topic"]')).toHaveValue('Test')
    await expect (innerFrame.getByLabel('Inner Frame Check box')).toBeChecked()
})