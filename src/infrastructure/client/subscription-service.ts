const SUBSCRIPTION_SERVICE_BASE_URL = process.env
    .SUBSCRIPTION_SERVICE_BASE_URL as string;

export default class SubscriptionService {
    public static async post(path: string, data: any): Promise<any> {
        const response: any = await fetch(
            SUBSCRIPTION_SERVICE_BASE_URL + path,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml'
                },
                body: data
            }
        );

        return response;
    }
}
