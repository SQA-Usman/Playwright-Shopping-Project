export class checkoutpage {

    constructor(page) {
        this.page = page
        this.orderId = page.locator('.em-spacer-1 .ng-star-inserted')
        this.ordersButton = page.locator('button[routerlink="/dashboard/myorders"]')
    }

    async getOrderId() {
        const orderId = await this.orderId.textContent();
        return orderId.replace(/\|/g, '').trim();;
    }

    async navigateToOrdersPage() {
        await this.ordersButton.click()
        await this.page.waitForLoadState('networkidle');
    }
}