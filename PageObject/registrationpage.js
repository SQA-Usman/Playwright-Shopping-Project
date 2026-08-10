export class RegistrationPage{
    constructor(page){
        this.page = page
        this.signupButton = page.locator('.text-reset')
        this.firstName = page.locator('#firstName')
        this.lastName = page.locator('#lastName')
        this.email =  page.locator('#userEmail')
        this.mobileNumber = page.locator('#userMobile')
        this.occupation = page.locator('[formcontrolname="occupation"]')
        this.gender = page.locator('[formcontrolname="gender"]')
        this.password = page.locator('#userPassword')
        this.confirmPassword = page.locator('#confirmPassword')
        this.ageCheck = page.locator('[formcontrolname="required"]')
        this.registerButton = page.locator('[type="submit"]')

    }
    async Navigation(page){
        await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
        await this.signupButton.click()
    }
    async registerUser(firstName, lastName, email, phoneNumber, 
        occupation, password,confirmPassword){
        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.email.fill(email)
        await this.mobileNumber.fill(phoneNumber)
        await this.occupation.selectOption(occupation)
        await this.gender.first().click()
        await this.password.fill(password)
        await this.confirmPassword.fill(confirmPassword)
        await this.ageCheck.click()
    }

    async clickRegisterButton(){
        await this.registerButton.click()
    }

}