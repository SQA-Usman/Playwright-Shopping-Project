export class LoginPage {

    constructor(page) {
        this.page = page
        this.username = page.locator('#userEmail')
        this.passsword = page.locator('#userPassword')
        this.loginButton = page.locator('#login')
    }
    async goTo(){
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    }
    async validLogin(username, passsword) {
        await this.username.fill(username)
        await this.passsword.fill(passsword)
        await this.loginButton.click()
        await this.page.waitForLoadState('networkidle');
    }
}
