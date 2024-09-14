import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export async function GET(request: MedusaRequest, response: MedusaResponse): Promise<void> {
    response
        .status(200)
        .json({ "message": "pong" });
}