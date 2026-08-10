export class OrdersPage{
    constructor(page){
        this.page = page
        this.totalOrders = page.locator('tbody tr')
        this.ordersummary = page.getByText(' order summary ')
        this.orderIdDetails = page.locator('.col-text')
    }

    async openOrder(orderId){
        console.log('open order called')
        const count = await this.totalOrders.count()
        console.log(count)
        for (let i = 0; i < count; ++i) {
            const rowOrderId = await this.totalOrders.nth(i).locator('th').textContent()
            console.log(rowOrderId)
            if (orderId.includes(rowOrderId)) {
                await this.totalOrders.nth(i).locator('button').first().click()
                break;
            }

        }
    }

    async verifyOrder(){
        return await this.orderIdDetails.textContent()
    }

}