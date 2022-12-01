import xml2json from 'xml2json';

import SubscriptionService from '../../infrastructure/client/subscription-service';

const getUserSingerList = async (binotify_user_id: number) => {
    const funcName = 'getAcceptedSubscriptionBySubcriptionId';
    const payload = {
        subscription_id: binotify_user_id
    };

    const response = await SubscriptionService.post(
        funcName,
        payload
    );

    return response;
};

const getPendingSubscriptionList = async () => {
    const funcName = 'fetchPendingSubscription';
    const payload = null;

    const response = await SubscriptionService.post(
        funcName,
        payload
    );

    return response;
};

const isSubscribed = async (binotify_user_id: number, singer_id: number) => {
    const funcName = 'checkStatus';
    const payload = {
        creator_id: singer_id,
        subscriber_id: binotify_user_id
    };

    const response = await SubscriptionService.post(
        funcName,
        payload
    );

    return response;
};

const acceptSubscription = async (binotify_user_id: number, singer_id: number) => {
    const funcName = 'acceptSubscription';
    const payload = {
        creator_id: singer_id,
        subscriber_id: binotify_user_id
    };

    const response = await SubscriptionService.post(
        funcName,
        payload
    );

    return response;
};

const rejectSubscription = async (binotify_user_id: number, singer_id: number) => {
    const funcName = 'rejectSubscription';
    const payload = {
        creator_id: singer_id,
        subscriber_id: binotify_user_id
    };

    const response = await SubscriptionService.post(
        funcName,
        payload
    );

    return response;
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
