import { test as base, expect } from '@playwright/test'
import fs from 'fs'
import { LoginPage } from '../PageObject/loginpage'

const readUsers = () =>
    JSON.parse(fs.readFileSync('./utils/userData.json', 'utf-8'))

export const test = base.extend({
    // Override per test with: test.use({ userIndex: 2 })
    userIndex: [0, { option: true }],

    user: async ({ userIndex }, use) => {
        const users = readUsers()
        await use(users[userIndex])
    },

    // Logs in before the test body runs and yields the LoginPage object
    login: async ({ page, user }, use) => {
        const loginPage = new LoginPage(page)
        await loginPage.goTo()
        await loginPage.validLogin(user.email, user.password)
        await use(loginPage)
    }
})

export { expect }
