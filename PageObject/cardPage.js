export class CardPage {
    constructor(page) {
        this.page = page
        this.checkout = page.getByText('Checkout')
        this.creditCardNumber = page.getByText('Credit Card Number ').locator('..').locator('input')
        this.expirySection =  page.locator('.field:has-text("Expiry Date")')
        this.monthDropdowon = this.expirySection.locator('select').first()
        this.yearDropdown = this.expirySection.locator('select').last()
        this.cvv =  page.locator('.field:has-text("CVV Code ")').locator('input')
        this.nameOnCard = page.locator('.field:has-text("Name on Card")').locator('input');
        this.coupon = page.locator('[name="coupon"]');
        this.applyCouponButton = page.getByRole('button', { name: 'Apply Coupon' });
        this.couponMessage = page.locator('text=* Coupon Applied');
        this.country = page.locator('[placeholder="Select Country"]');
        this.countryDropdown = page.locator('.ta-results');
        this.placeOrderButton = page.getByText('Place Order');
    }
    async goToCheckout(){
        await this.checkout.click()
    }
    async enterCardDetails(number, month, year, cvv, cardName){
        await this.creditCardNumber.clear()
        await this.creditCardNumber.fill(number)
        await this.monthDropdowon.selectOption(month)
        await this.yearDropdown.selectOption(year)
        await this.cvv.fill(cvv)
        await this.nameOnCard.fill(cardName)
    }
    async applyCoupon(couponCode){
        await this.coupon.fill(couponCode)
        await this.applyCouponButton.click()
    }
    async selectCounty(countrySearch, countryName){
        await this.country.pressSequentially(countrySearch)
        await this.countryDropdown.waitFor()
        const optionCount = await this.countryDropdown.locator('button').count()

        for (let i = 0; i < optionCount; i++) {
            const text = await this.countryDropdown.locator('button').nth(i).textContent()
            if (text.trim() === countryName) {
                await this.countryDropdown.locator('button').nth(i).click()
                break;
            }
        }

    }
    async ClickPlaceOrderButton(){
        await this.placeOrderButton.click()
        
    }

}