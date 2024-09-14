export class HttpError extends Error {
    constructor(response: Response) { 
        super(`${HttpError.name}: Fetch failed with status code ${response.status}: ${response.statusText}`);
    }
    
    static isResponseError(response: Response): boolean {
        return response.status < 200 || response.status > 300;
    } 
}