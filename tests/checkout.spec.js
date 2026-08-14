import { expect, test } from "@playwright/test";

test.describe('checkoutflow', () => {

    test('Register new user', async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
        await expect(page).toHaveTitle("Let's Shop")
        await page.locator('.text-reset').click()
        await page.locator('#firstName').fill('Test')
        await page.locator('#lastName').fill('User')
        await page.locator('#userEmail').fill(`testuser${Math.floor(Math.random()*1000)}@gmail.com`)
        await page.locator('#userMobile').fill(`${Math.floor(1000000000 + Math.random() * 9000000000)}`)
        await page.locator('[formcontrolname="occupation"]').selectOption('Engineer')
        await page.locator('[formcontrolname="gender"]').first().click()
        await page.locator('#userPassword').fill('Abc@123456')
        await page.locator('#confirmPassword').fill('Abc@123456')
        await page.locator('[formcontrolname="required"]').click()
        const registerButton = page.locator('[type="submit"]')
        await expect(registerButton).toBeEnabled()
        await registerButton.click()
        await expect(page.getByText('Account Created Successfully')).toBeVisible()
    })
    test('Checkout with product', async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
        await page.locator('#userEmail').fill('testuser20911@gmail.com')
        await page.locator('#userPassword').fill('Abc@123456')
        await page.locator('#login').click()
        const products = page.locator('.card-body')
        await expect(page.locator('.card-body b').first()).toContainText('ADIDAS ORIGINAL')

        const tittles = await page.locator('.card-body b').allTextContents()
        const productName = 'ZARA COAT 3'
        const count = await products.count()
        for (let i = 0; i < count; i++) {
            if (await products.nth(i).locator('b').textContent() === productName) {
                await products.nth(i).getByText(' Add To Cart').click()
                break;
            }

        }
        await expect(page.locator('[role="alert"]')).toContainText('Product Added To Cart')

        // Navigate to cart
        await page.locator('[routerlink="/dashboard/cart"]').click()
        await expect(page.getByText('My Cart')).toBeVisible()
        await expect(page.locator('.cartSection h3')).toContainText(productName)

        // Navigate to checkout
        await page.getByText('Checkout').click()
        // Filing credit card details
        const creditCardNumber = page.getByText('Credit Card Number ').locator('..').locator('input')
        await creditCardNumber.clear()
        await creditCardNumber.fill('200 899 876 102')
        const expiryDate = await page.locator('.field:has-text("Expiry Date")')
        const monthDropdown = expiryDate.locator('select').first()
        const yearDropdown = expiryDate.locator('select').last()

        await monthDropdown.selectOption('12')
        await yearDropdown.selectOption('22')

        const cvvCode = await page.locator('.field:has-text("CVV Code ")')
        await cvvCode.locator('input').fill('529')

        const nameOnCard = await page.locator('.field:has-text("Name on Card ")')
        // await nameOnCard.scrollIntoViewIfNeeded();
        await nameOnCard.locator('input').fill('Test User')

        const coupon = page.locator('[name="coupon"]')

        await coupon.fill('rahulshettyacademy')
        await page.getByRole('button', { name: 'Apply Coupon' }).click()
        await expect(page.locator('text=* Coupon Applied')).toBeVisible()

        const selectCountry = page.locator('[placeholder="Select Country"]')
        await selectCountry.pressSequentially('sau')
        const dropdown = page.locator('.ta-results')
        await dropdown.waitFor()
        const optionCount = await dropdown.locator('button').count()

        for (let i = 0; i < optionCount; i++) {
            const text = await dropdown.locator('button').nth(i).textContent()
            if (text === " Saudi Arabia") {
                await dropdown.locator('button').nth(i).click()
                break;
            }
        }
        await expect(selectCountry).toHaveValue('Saudi Arabia');

        // Validate email
        const email = 'testuser20911@gmail.com'
        await expect(page.locator('label[type="text"]')).toContainText(email)
        // Click Place order
        await page.getByText('Place Order ').click()
        // Validate order is completed
        await expect(page.getByText(' Thankyou for the order. ')).toBeVisible()
        const orderId = (await page.locator('.em-spacer-1 .ng-star-inserted').textContent()).replace(/\|/g, '').trim()
        console.log(orderId)

        // Navigate to Orders
        await page.locator('button[routerlink="/dashboard/myorders"]').click()
        await expect(page.getByText('Your Orders')).toBeVisible()
        // Validate order Id
        const totalOrders =  page.locator('tbody tr')
        for (let i = 0; i < await totalOrders.count(); ++i) {
            const rowOrderId = (await totalOrders.nth(i).locator('th').textContent()).trim()
            console.log(rowOrderId)
            if (rowOrderId ===orderId) {
                await totalOrders.nth(i).locator('button').first().click()
                break;
            }

        }
        await expect(page.getByText(' order summary ')).toBeVisible()
        const orderIdDetails = await page.locator('.col-text').textContent()
        await expect(orderIdDetails).toContain(orderId)

    })

})