import { test, expect, request } from "@playwright/test"
import { APIUtils } from "./utils/apiutils"

let token
let orderId
const loginPayload = { userEmail: "testuser20911@gmail.com", userPassword: "Abc@123456" }
const orderPayload = { orders: [{ country: "Italy", productOrderedId: "6960eae1c941646b7a8b3ed3" }] }

test.beforeAll(async () => {
    
    const apiContext = await request.newContext()
    const apiUtils = new APIUtils(apiContext, loginPayload) 
     token = await apiUtils.createToken()

    // Create order through api
    orderId = await apiUtils.createOrder(orderPayload, token)
    

})

test('Checkout with product', async ({ page }) => {
    // await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    // await page.locator('#userEmail').fill('testuser20911@gmail.com')
    // await page.locator('#userPassword').fill('Abc@123456')
    // await page.locator('#login').click()
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token)
    await page.goto('https://rahulshettyacademy.com/client/')
    
    // Navigate to Orders
    await page.locator('button[routerlink="/dashboard/myorders"]').click()
    await expect(page.getByText('Your Orders')).toBeVisible()
    // Validate order Id
    const totalOrders = await page.locator('tbody tr')
    const count = await totalOrders.count()
    for (let i = 0; i < count; ++i) {
        const rowOrderId = await totalOrders.nth(i).locator('th').textContent()
        if (orderId.includes(rowOrderId)) {
            await totalOrders.nth(i).locator('button').first().click()
            break;
        }

    }
    await expect(page.getByText(' order summary ')).toBeVisible()
        const orderIdDetails = await page.locator('.col-text').textContent()
        await expect(orderIdDetails).toContain(orderId)


})
