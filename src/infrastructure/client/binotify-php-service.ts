import { StandardError, ErrorCode, ErrorMessage } from "../../common/error";
import axios from "axios";

const BINOTIFY_PHP_SERVICE_BASE_URL = process.env
    .BINOTIFY_PHP_SERVICE_BASE_URL as string;

export default class BinotifyPhpService {
    public static async post(path: string, data: any): Promise<any> {
        try {
            const response = await axios.post(BINOTIFY_PHP_SERVICE_BASE_URL + path, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            const phpServiceError: StandardError = {
                error_code: ErrorCode.PHP_SERVICE_ERROR,
                message: ErrorMessage.PHP_SERVICE_ERROR
            };
            throw phpServiceError;
        }
    }

    public static async get(path: string): Promise<any> {
        const response = await fetch(BINOTIFY_PHP_SERVICE_BASE_URL + path);

        return response.json();
    }
}
