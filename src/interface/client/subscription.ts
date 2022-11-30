import xml2json from 'xml2json';

import SubscriptionService from '../../infrastructure/client/subscription-service';
const SUBSCRIPTION_ENDPOINT = 'api/subscription';

const getUserSingerList = async (binotify_user_id: number) => {
    /*
     * Get user's singer list
     * @param binotify_user_id: number
     * @return singerList: IUser[]
     */

    const funcName = 'getAcceptedSubscriptionBySubcriptionId';
    const payload = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <getAcceptedSubscriptionBySubcriptionId xmlns="http://controller/">
                <subscriber_id xmlns="">${binotify_user_id}</subscriber_id>
            </getAcceptedSubscriptionBySubcriptionId>
        </Body>
    </Envelope>`;

    const response = await SubscriptionService.post(
        SUBSCRIPTION_ENDPOINT,
        payload
    );
    const responseJson = __convertXmlToJson(response, funcName);

    return responseJson;
};

const getPendingSubscriptionList = async () => {
    /*
     * Get pending subscription list
     * @return pendingSubscriptionList: ISubscription[]
     */

    const funcName = 'fetchPendingSubscription';
    const payload = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <fetchPendingSubscription xmlns="http://controller/"/>
        </Body>
    </Envelope>`;

    const response = await SubscriptionService.post(
        SUBSCRIPTION_ENDPOINT,
        payload
    );
    const responseJson = __convertXmlToJson(response, funcName);

    return responseJson;
};

const isSubscribed = async (binotify_user_id: number, singer_id: number) => {
    /*
     * Check if user is subscribed to singer
     * @param binotify_user_id: number
     * @param singer_id: number
     * @return isSubscribed: boolean
     */

    const funcName = 'checkStatus';
    const payload = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <checkStatus xmlns="http://controller/">
                <creator_id xmlns="">0</creator_id
                <subscriber_id xmlns="">0</subscriber_id>
            </checkStatus>
        </Body>
    </Envelope>`;

    const response = await SubscriptionService.post(
        SUBSCRIPTION_ENDPOINT,
        payload
    );
    const responseJson = __convertXmlToJson(response, funcName);

    return responseJson;
};

const acceptSubscription = async (subscription_id: number) => {
    /*
     * Accept subscription
     * @param subscription_id: number
     * @return null
     */

    const funcName = 'acceptSubscription';
    const payload = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <acceptSubscription xmlns="http://controller/">
                <creator_id xmlns="">[int]</creator_id>
                <subscriber_id xmlns="">[int]</subscriber_id>
            </acceptSubscription>
        </Body>
    </Envelope>`;

    const response = await SubscriptionService.post(
        SUBSCRIPTION_ENDPOINT,
        payload
    );
    const responseJson = __convertXmlToJson(response, funcName);

    return responseJson;
};

const rejectSubscription = async (subscription_id: number) => {
    /*
     * Reject subscription
     * @param subscription_id: number
     * @return null
     */

    const funcName = 'subscribe';
    const payload = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
            <subscribe xmlns="http://controller/">
                <creator_id xmlns="">[int]</creator_id>
                <subscriber_id xmlns="">[int]</subscriber_id>
            </subscribe>
        </Body>
    </Envelope>`;

    const response = await SubscriptionService.post(
        SUBSCRIPTION_ENDPOINT,
        payload
    );
    const responseJson = __convertXmlToJson(response, funcName);

    return responseJson;
};

const __convertXmlToJson = (xml: string, funcName: string) => {
    const ns2: string = 'ns2:' + funcName + 'Response';

    let json: any = xml2json.toJson(xml, { object: true });
    json = json['S:Envelope']['S:Body'][ns2];

    if (json['return'] === null) {
        return null;
    }

    return json['return'];
};

export {
    getUserSingerList,
    getPendingSubscriptionList,
    isSubscribed,
    acceptSubscription,
    rejectSubscription
};
