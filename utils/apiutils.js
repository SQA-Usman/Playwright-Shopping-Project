export class APIUtils {

    constructor(apiContext, loginPayload) {
        this.context = apiContext
        this.loginpayload = loginPayload

    }

    async createToken() {
        const apiResponse = await this.context.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.loginpayload
            })
        const loignResponseJson = await apiResponse.json()
        const token = loignResponseJson.token;
        console.log('Token:', token)
        return token
    }

    async createOrder(orderPayload, token) {
        const orderRespone = await this.context.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: orderPayload,
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })
        console.log("Status:", orderRespone.status());

        const responseJson = await orderRespone.json();
        console.log(responseJson);
        return responseJson.orders[0];
    }
}
