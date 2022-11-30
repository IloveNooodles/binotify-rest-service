export interface StandardError {
    error_code: string;
    message: string;
}

export enum ErrorCode {
    INVALID_API_KEY = 'INVALID_API_KEY',
    API_VALIDATION_ERROR = 'API_VALIDATION_ERROR',
    DATABASE_ERROR = 'DATABASE_ERROR',
    USERNAME_ALREADY_EXIST = 'USERNAME_ALREADY_EXIST',
    EMAIL_ALREADY_EXIST = 'EMAIL_ALREADY_EXIST',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    PASSWORD_INVALID = 'PASSWORD_INVALID',
    API_KEY_MISSING = 'API_KEY',
    INVALID_USER_TYPE = 'INVALID_USER_TYPE',
    SONG_NOT_FOUND = 'SONG_NOT_FOUND',
    INVALID_SINGER_SONG = 'INVALID_SINGER_SONG',
    NOT_SUBSCRIBED = 'NOT_SUBSCRIBED',
    SINGER_NOT_FOUND = 'SINGER_NOT_FOUND',
}

export enum ErrorMessage {
    INVALID_API_KEY = 'Your API key is invalid',
    API_VALIDATION_ERROR = 'Your request is invalid',
    DATABASE_ERROR = 'Database error',
    USERNAME_ALREADY_EXIST = 'Username already exist',
    EMAIL_ALREADY_EXIST = 'Email already exist',
    USER_NOT_FOUND = 'User not found',
    PASSWORD_INVALID = 'Password invalid',
    API_KEY_MISSING = 'API key is missing',
    INVALID_USER_TYPE = 'Invalid user type',
    SONG_NOT_FOUND = 'Song not found',
    INVALID_SINGER_SONG = 'The singer does not have this song',
    NOT_SUBSCRIBED = 'You are not subscribed',
    SINGER_NOT_FOUND = 'Singer not found',
}
