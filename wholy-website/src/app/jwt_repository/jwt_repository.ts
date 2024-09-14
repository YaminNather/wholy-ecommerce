import { singleton } from "tsyringe";

@singleton()
export class JwtRepository {
    async saveToken(token: string): Promise<void> {
        localStorage.setItem(JwtRepository.key, token);
    }

    async getToken(): Promise<string | null> {
        return localStorage.getItem(JwtRepository.key);
    }

    async removeToken(): Promise<void> {
        return localStorage.removeItem(JwtRepository.key);
    }


    private static readonly key: string;
}