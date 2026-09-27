import { test, expect } from '../utils/fixtures'
import { LoginPage } from '../PageObject/loginpage'
import fs from 'fs'

const users = JSON.parse(
    fs.readFileSync('./utils/userData.json', 'utf-8')
)

test.describe('Login', () => {

    test('Login with valid credentials', async ({ page }) => {
        const user = users[0]
        const loginPage = new LoginPage(page)

        await loginPage.goTo()
        await loginPage.validLogin(user.email, user.password)

        await expect(page.locator('.card-body b').first())
            .toContainText('ADIDAS ORIGINAL')
        await expect(page).toHaveURL(/dashboard/)
    })

    test('Login with invalid password', async ({ page }) => {
        const user = users[0]
        const loginPage = new LoginPage(page)

        await loginPage.goTo()
        await loginPage.validLogin(user.email, 'WrongPassword@123')

        await expect(page).toHaveURL(/auth\/login/)
        await expect(page.locator('#userEmail')).toBeVisible()
        await expect(page.locator('.card-body')).toHaveCount(0)
    })

    test('Login page shows error for empty credentials', async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.goTo()
        await loginPage.loginButton.click()

        await expect(page.locator('#userEmail')).toBeVisible()
    })

    test('Login using fixture', async ({ login, page }) => {
        await expect(page.locator('.card-body b').first())
            .toContainText('ADIDAS ORIGINAL')
        await expect(login.username).toBeHidden()
    })
})
