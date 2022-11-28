const BINOTIFY_PHP_SERVICE_BASE_URL = process.env.BINOTIFY_PHP_SERVICE_BASE_URL as string; 

export default class BinotifyPhpService {
    public static async post(path: string, data: any): Promise<any> {
        const response = await fetch(BINOTIFY_PHP_SERVICE_BASE_URL + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return response.json();
    }

    public static async get(path: string): Promise<any> {
        const response = await fetch(BINOTIFY_PHP_SERVICE_BASE_URL + path);

        return response.json();
    }
}