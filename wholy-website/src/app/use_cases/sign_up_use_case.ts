import { singleton } from "tsyringe";
import { BackendClient } from "@/app/backend_client/backend_client";

export interface SignUpUseCaseOptions {
    firstName: string; 
    lastName: string; 
    email: string; 
    password: string;
}

@singleton()
export class SignUpUseCase {
    constructor(private readonly backendClient: BackendClient) {}
    
    async perform(options: SignUpUseCaseOptions): Promise<void> {
        await this.backendClient.authentication.signUp({
            firstName: options.firstName,
            lastName: options.lastName,
            email: options.email,
            password: options.password,
        });
    }
}