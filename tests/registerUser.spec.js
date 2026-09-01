import {test, expect} from '@playwright/test'
import fs from 'fs'
import { RegistrationPage } from '../PageObject/registrationpage'

test('Register User', async ({ page }) => {

    const registrationPage = new RegistrationPage(page);

    // Generate test data
    const firstName = 'Test';
    const lastName = 'User';
    const email = `testuser${Math.floor(Math.random() * 10000)}@gmail.com`;
    const phoneNumber = `9876543210`;
    const occupation = 'Engineer';
    const password = 'Test@12345';
    const confirmPassword = 'Test@12345';

    // Navigate to registration page
    await registrationPage.Navigation(page);

    // Fill registration form
    await registrationPage.registerUser(
        firstName,
        lastName,
        email,
        phoneNumber,
        occupation,
        password,
        confirmPassword
    );

    // Register
    await registrationPage.clickRegisterButton();

     // Read existing users from JSON
    const users = JSON.parse(
        fs.readFileSync('./utils/userData.json', 'utf-8')
    );

    // Add newly registered user
    users.push({
        email: email,
        password: password
    });

      // Save updated users
    fs.writeFileSync(
        './utils/userData.json',
        JSON.stringify(users, null, 2)
    );

})
