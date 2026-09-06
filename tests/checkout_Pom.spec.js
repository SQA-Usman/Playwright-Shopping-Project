import { test, expect } from '@playwright/test'
import { LoginPage } from '../PageObject/loginpage'
import { Dashboard } from '../PageObject/dashboard'
import { CardPage } from '../PageObject/cardPage'
import { checkoutpage } from '../PageObject/checkout'
import { OrdersPage } from '../PageObject/orderHistroyPage'
import fs from 'fs'
const users = JSON.parse(
    fs.readFileSync('./utils/userData.json', 'utf-8'))

    test('Checkout with one product name', async ({ page }) => {
        const user = users[2]
        const login = new LoginPage(page)
        // Navigation to Website
        await login.goTo()

        // Perform Login
        await login.validLogin(user.email, user.password)

        // Ensure navigation after login
        await expect(page.locator('.card-body b').first()).toContainText('ADIDAS ORIGINAL')

        // Search Product name and add to cart
        const dashboard = new Dashboard(page)

        await dashboard.searchProduct('ADIDAS ORIGINAL')

        await expect(page.locator('[role="alert"]')).toContainText('Product Added To Cart')

        // Navigate to Cart page
        await dashboard.navigateToCart()
        // Validte product details
        await expect(page.getByText('My Cart')).toBeVisible()
        await expect(page.locator('.cartSection h3')).toContainText('ADIDAS ORIGINAL')

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
        const email = user.email
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
