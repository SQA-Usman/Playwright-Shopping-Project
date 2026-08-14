import { test, expect } from '@playwright/test'
import { RegistrationPage } from '../PageObject/registrationpage'
import { LoginPage } from '../PageObject/loginpage'
import { Dashboard } from '../PageObject/dashboard'
import { CardPage } from '../PageObject/cardPage'
import { checkoutpage } from '../PageObject/checkout'
import { OrdersPage } from '../PageObject/orderHistroyPage'
const loginTestData = JSON.parse(JSON.stringify(require('../utils/loginTestData.json')))
const registerTestData = JSON.parse(JSON.stringify(require('../utils/RegisterTestData.json')))

test('User Registration', async ({ page }) => {
    const registar = new RegistrationPage(page)
    const userData = {
        firstname: registerTestData.firstname,
        lastname: registerTestData.lastname,
        email : `testuser${Math.floor(Math.random() * 100000 + 1)}@gmail.com`,
        phoneNumber : Math.floor(1000000000 + Math.random() * 9000000000).toString(),
        occupation: registerTestData.occupation,
        password: `TestUser${Math.floor(Math.random() * 10000 + 1)}`
    }
    const confirmPassword = userData.password
    // Navigate to register page
    await registar.Navigation(page)
    await expect(page).toHaveTitle("Let's Shop")

    //Fillout the form
    await registar.registerUser(userData.firstname, userData.lastname, userData.email,
        userData.phoneNumber, userData.occupation, userData.password, confirmPassword)
    // Click Register button
    await registar.clickRegisterButton()
    await expect(page.getByText('Account Created Successfully')).toBeVisible()

})

for (const data of loginTestData) {
    test(`Checkout with one product name ${data.productName}`, async ({ page }) => {
        const login = new LoginPage(page)
        // Navigation to Website
        await login.goTo()

        // Perform Login
        await login.validLogin(data.username, data.password)

        // Ensure navigation after login
        await expect(page.locator('.card-body b').first()).toContainText('ADIDAS ORIGINAL')

        // Search Product name and add to cart
        const dashboard = new Dashboard(page)

        await dashboard.searchProduct(data.productName)

        await expect(page.locator('[role="alert"]')).toContainText('Product Added To Cart')

        // Navigate to Cart page
        await dashboard.navigateToCart()
        // Validte product details
        await expect(page.getByText('My Cart')).toBeVisible()
        await expect(page.locator('.cartSection h3')).toContainText(data.productName)

        const cardPage = new CardPage(page)
        // Navigate to checkout
        await cardPage.goToCheckout()

        //    Enter card details
        const cardnumber = '5555555555555555'
        const month = '05'
        const year = '16'
        const cvv = '876'
        const cardName = 'Test User'

        await cardPage.enterCardDetails(cardnumber, month, year, cvv, cardName)

        // select country
        const countrySearch = 'Sau'
        const countryName = 'Saudi Arabia'
        await cardPage.selectCounty(countrySearch, countryName)

        // Validate country is selected
        await expect(page.locator('[placeholder="Select Country"]')).toHaveValue('Saudi Arabia');

        // Validate email is correct
        const email = data.username
        await expect(page.locator('label[type="text"]')).toContainText(email)

        // Click place order button
        await cardPage.ClickPlaceOrderButton()
        await expect(page.getByText(' Thankyou for the order. ')).toBeVisible()

        const checkoutPage = new checkoutpage(page)
        // Get the order id
        const orderId = await checkoutPage.getOrderId()
        console.log(orderId)

        // Navigate to Orders Page
        await checkoutPage.navigateToOrdersPage()
        await expect(page.getByText('Your Orders')).toBeVisible()

        const ordersPage = new OrdersPage(page)
        await ordersPage.openOrder(orderId)

        await expect(page.getByText(' order summary ')).toBeVisible()
        await expect(await ordersPage.verifyOrder()).toContain(orderId)



    })
}