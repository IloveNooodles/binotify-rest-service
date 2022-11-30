import SubscriptionService from '../../infrastructure/client/subscription-service';

const getUserSingerList = async (binotify_user_id: number) => {
    /*
     * Get user's singer list
     * @param binotify_user_id: number
     * @return singerList: IUser[]
     */

    return;
};

const getPendingSubscriptionList = async () => {
    /*
     * Get pending subscription list
     * @return pendingSubscriptionList: ISubscription[]
     */

    return true;
};

const isSubscribed = async (binotify_user_id: number, singer_id: number) => {
    /*
     * Check if user is subscribed to singer
     * @param binotify_user_id: number
     * @param singer_id: number
     * @return isSubscribed: boolean
     */

    return;
};

const acceptSubscription = async (subscription_id: number) => {
    /*
     * Accept subscription
     * @param subscription_id: number
     * @return null
     */

    return;
};

const rejectSubscription = async (subscription_id: number) => {
    /*
     * Reject subscription
     * @param subscription_id: number
     * @return null
     */

    return;
};

export {
    getUserSingerList,
    getPendingSubscriptionList,
    isSubscribed,
    acceptSubscription,
    rejectSubscription
};
