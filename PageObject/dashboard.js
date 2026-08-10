export class Dashboard{

    constructor(page){
        this.page = page
        this.products = page.locator('.card-body')
        this.productsText = page.locator('.card-body b')
        this.cart = page.locator('[routerlink="/dashboard/cart"]')
    }

    async searchProduct(productName){
        const tittles = await this.productsText.allTextContents()
        const count = await this.products.count()
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator('b').textContent() === productName) {
                await this.products.nth(i).getByText(' Add To Cart').click()
                break;
            }

        }
    }
    async navigateToCart(){
        await this.cart.click()
    }
}