export interface StandardError {
    error_code: string;
    message: string;
}

export enum ErrorCode {
    INVALID_API_KEY = 'INVALID_API_KEY',
    API_VALIDATION_ERROR = 'API_VALIDATION_ERROR'
}

export enum ErrorMessage {
    INVALID_API_KEY = 'Your API key is invalid',
    API_VALIDATION_ERROR = 'Your request is invalid'
}
