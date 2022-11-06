export interface StandardError {
    error_code: string;
    message: string;
}

export enum ErrorCode {
    INVALID_API_KEY = 'INVALID_API_KEY',
}

export enum ErrorMessage {
    INVALID_API_KEY = 'Your API key is invalid',
}