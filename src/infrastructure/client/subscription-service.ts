import { StandardError, ErrorCode, ErrorMessage } from '../../common/error';
const soap = require('strong-soap').soap;

const SUBSCRIPTION_SERVICE_BASE_URL = process.env
    .SUBSCRIPTION_SERVICE_BASE_URL as string;
const SUBSCRIPTION_ENDPOINT = '/api/subscription';
const WSDL = '?wsdl';

export default class SubscriptionService {
    public response: any;
    public static post = async (funcName: string, payload: any) => {
        try {
            const url =
                SUBSCRIPTION_SERVICE_BASE_URL + SUBSCRIPTION_ENDPOINT + WSDL;

            const response: any = await new Promise(async (resolve, reject) => {
                await soap.createClient(url, async (err: any, client: any) => {
                    const header = {
                        'x-api-key': process.env.SUBSCRIPTION_SERVICE_API_KEY
                    };

                    await client[funcName](
                        payload,
                        async (err: any, result: any) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        },
                        null,
                        header
                    );
                });
            });

            if (response === null || response === undefined) {
                throw new Error(
                    'SubscriptionService.post: response is null or undefined'
                );
            }

            return response.return;
        } catch (error) {
            const subscriptionServiceError: StandardError = {
                error_code: ErrorCode.SUBSCRIPTION_SERVICE_ERROR,
                message: ErrorMessage.SUBSCRIPTION_SERVICE_ERROR
            };
            return subscriptionServiceError;
        }
    };
}
