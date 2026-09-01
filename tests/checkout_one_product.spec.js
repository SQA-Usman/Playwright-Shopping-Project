import { expect, test } from "@playwright/test";
import fs from 'fs'
const users = JSON.parse(
    fs.readFileSync('./utils/userData.json', 'utf-8')
);

test.describe('checkoutflow', () => {

    test('Checkout with product', async ({ page }) => {
        const user = users[1]
        await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
        await page.getByPlaceholder('email@example.com').fill(user.email)
        await page.getByPlaceholder('enter your passsword').fill(user.password)
        await page.getByRole('button' , {name:'login'}).click()
        await page.locator('.card-body').filter({hasText:'iphone 13 pro'}).getByRole('button' , {name:'Add To Cart'}).click()
        await expect(page.locator('[role="alert"]')).toContainText('Product Added To Cart')

        // Navigate to cart
        await page.getByRole('listitem').getByRole('button' , {name:'Cart'}).click()
        await expect(page.getByText('My Cart')).toBeVisible()
        await expect(page.locator('.cartSection h3')).toContainText('iphone 13 pro')

        // Navigate to checkout
        await page.getByText('Checkout').click()
        // Filing credit card details
        const creditCardNumber = page.locator('.field').filter({hasText:'Credit Card Number'}).locator('input')
        await creditCardNumber.clear()
        await creditCardNumber.fill('200 899 876 102')
        const expiryDate =  page.locator('.field:has-text("Expiry Date")')
        const monthDropdown = expiryDate.locator('select').first()
        const yearDropdowmm = expiryDate.locator('select').last()

        await monthDropdown.selectOption('12')
        await yearDropdowmm.selectOption('22')

        const cvvCode =  page.locator('.field:has-text("CVV Code ")')
        await cvvCode.locator('input').fill('529')

        const nameOnCard =  page.locator('.field:has-text("Name on Card ")')
        // await nameOnCard.scrollIntoViewIfNeeded();
        await nameOnCard.locator('input').fill('Test User')

        const coupon = page.locator('[name="coupon"]')

        await coupon.fill('rahulshettyacademy')
        await page.getByRole('button', { name: 'Apply Coupon' }).click()
        await expect(page.locator('text=* Coupon Applied')).toBeVisible()

        await page.getByPlaceholder('Select Country').pressSequentially('Saudi')
        await page.getByRole('button', {name:'Saudi Arabia'}).click()
        await expect(page.getByPlaceholder('Select Country')).toHaveValue('Saudi Arabia');

        // Validate email
        const email = user.email
        await expect(page.locator('label[type="text"]')).toContainText(email)
        // Click Place order
        await page.getByText('Place Order ').click()
        // Validate order is completed
        await expect(page.getByText(' Thankyou for the order. ')).toBeVisible()
        const orderId = (await page.locator('.em-spacer-1 .ng-star-inserted').textContent()).replace(/\|/g, '').trim()
        console.log(orderId)

        // Navigate to Orders
        await page.locator('button[routerlink="/dashboard/myorders"]').click()
        await expect (page.getByText('Your Orders')).toBeVisible()
        // Validate order Id
        const totalOrders = await page.locator('tbody tr')
        const orderRow = totalOrders.filter({has: page.locator('th' , {hasText: orderId})})
        await expect(orderRow).toBeVisible()
        await orderRow.getByRole('button' , {name:'View'}).click()
        await expect (page.getByText(' order summary ')).toBeVisible()
        const orderIdDetails = await page.locator('.col-text').textContent()
        await expect (orderIdDetails).toContain(orderId)


    })

})