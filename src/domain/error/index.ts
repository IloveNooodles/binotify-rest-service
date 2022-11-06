export interface StandardError {
    error_code: string;
    message: string;
}

export enum errorCode {
    INVALID_API_KEY = 'INVALID_API_KEY',
}

export enum errorMessage {
    INVALID_API_KEY = 'Your API key is invalid',
}