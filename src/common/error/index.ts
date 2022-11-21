export interface StandardError {
    error_code: string;
    message: string;
}

export enum ErrorCode {
    INVALID_API_KEY = 'INVALID_API_KEY',
    API_VALIDATION_ERROR = 'API_VALIDATION_ERROR',
    DATABASE_ERROR = 'DATABASE_ERROR',
    USERNAME_ALREADY_EXIST = 'USERNAME_ALREADY_EXIST',
    EMAIL_ALREADY_EXIST = 'EMAIL_ALREADY_EXIST'
}

export enum ErrorMessage {
    INVALID_API_KEY = 'Your API key is invalid',
    API_VALIDATION_ERROR = 'Your request is invalid',
    DATABASE_ERROR = 'Database error',
    USERNAME_ALREADY_EXIST = 'Username already exist',
    EMAIL_ALREADY_EXIST = 'Email already exist'
}
