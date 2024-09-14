import { HttpError } from "@/app/backend_client/errors/HttpError";
import { Customer, mapCustomerApiResponseToModel } from "../../models/customer";

export interface SignUpRequest {
    firstName: string; 
    lastName: string; 
    email: string; 
    password: string;
}

export class SignUpEndpoint {
    constructor(private readonly url: string) { }

    async perform(request: SignUpRequest): Promise<Customer> {
        const requestBody: any = {
            "first_name": request.firstName,
            "last_name": request.lastName,
            "email": request.email,
            "password": request.password,
        };

        const response: Response = await fetch(
            `${this.url}/store/customers`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            }
        );
        if (HttpError.isResponseError(response)) throw new HttpError(response);
        
        const responseBody: any = await response.json();
        return mapCustomerApiResponseToModel(responseBody["customer"]);
    }
}