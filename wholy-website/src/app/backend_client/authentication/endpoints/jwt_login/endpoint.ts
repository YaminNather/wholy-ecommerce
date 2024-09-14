import { HttpError } from "@/app/backend_client/errors/HttpError";

export class LoginEndpoint {
    constructor(private readonly url: string) {}

    async perform(email: string, password: string): Promise<string> {
        const requestBody: any = { email, password };

        const response: Response = await fetch(
            `${this.url}/store/auth/token`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            }
        );
        if (HttpError.isResponseError(response)) throw new HttpError(response);
        
        const responseBody: any = await response.json();
        return responseBody['success_token'];
    } 
}