import { singleton } from "tsyringe";

import { BackendClient } from "@/app/backend_client/backend_client";
import { JwtRepository } from "@/app/jwt_repository/jwt_repository";

@singleton()
export class LoginUseCase {
    constructor(
        private readonly backendClient: BackendClient,
        private readonly jwtRepository: JwtRepository, 
    ) {}

    async login(email: string, password: string): Promise<void> {
        const jwt: string = await this.backendClient.authentication.jwtLogin(email, password);
        
        this.jwtRepository.saveToken(jwt);
    }
}