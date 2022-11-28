const SUBSCRIPTION_SERVICE_BASE_URL = process.env.SUBSCRIPTION_SERVICE_BASE_URL as string;

export default class SubscriptionService {
    public static async post(path: string, data: any): Promise<any> {
        const response = await fetch(SUBSCRIPTION_SERVICE_BASE_URL + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/xml'
            },
            body: data
        });

        return response.json();
    }

    public static async get(path: string): Promise<any> {
        const response = await fetch(SUBSCRIPTION_SERVICE_BASE_URL + path);

        return response.json();
    }
}