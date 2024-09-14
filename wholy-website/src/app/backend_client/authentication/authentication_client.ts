import { LoginEndpoint } from "./endpoints/jwt_login/endpoint";
import { SignUpEndpoint, SignUpRequest } from "./endpoints/sign_up/endpoint";
import { Customer } from "./models/customer";

export class AuthenticationClient {
    constructor(url: string) {
        this.signUpEndpoint = new SignUpEndpoint(url);
        this.loginEndpoint = new LoginEndpoint(url);
    }

    signUp(request: SignUpRequest): Promise<Customer> {
        return this.signUpEndpoint.perform(request);
    }

    jwtLogin(firstName: string, lastName: string): Promise<string> {
        return this.loginEndpoint.perform(firstName, lastName);
    }
    

    private readonly signUpEndpoint: SignUpEndpoint;
    private readonly loginEndpoint: LoginEndpoint;
}