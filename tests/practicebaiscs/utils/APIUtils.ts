import { APIRequestContext, expect } from "@playwright/test";

class APIUtils
{
    private apiContext: any;
    private orderPayload: any;
    private loginPayload: any;
    private token: string | undefined;

    constructor(apiContext: any, loginPayload: any){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken()
    {
       

       const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
           {
                  data: this.loginPayload
           })
       
           expect(loginResponse.ok()).toBeTruthy();
           const loginResponseJson = await loginResponse.json();
           this.token = loginResponseJson.token;
       
           console.log(this.token);
           return this.token;
    }


    async createOrder(orderPayload: any)

    {
        let response: any = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            },
        }
        );

        const orderResponseJson = await orderResponse.json();
        const orderIdPayload = orderResponseJson.orders[0];
        response.orderIdPayload = orderIdPayload;
        return response;
    }

}

export { APIUtils };