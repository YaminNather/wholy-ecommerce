export class ClientEnvironmentVariables {
    static clientBackendUrl(): string {
        return process.env["NEXT_PUBLIC_CLIENT_BACKEND_URL"]!;
    }

    static serverBackendUrl(): string {
        return process.env["NEXT_PUBLIC_SERVER_BACKEND_URL"]!;
    }
}

export class ServerEnvironmentVariables {
    static backendUrl(): string {
        return process.env["NEXT_PUBLIC_SERVER_BACKEND_URL"]!;
    }

    static stripeSecretKey(): string {
        return process.env["STRIPE_SECRET_KEY"]!;
    }
}