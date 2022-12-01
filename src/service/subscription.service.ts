import { StandardError, ErrorCode, ErrorMessage } from '../common/error';
import {
    getPendingSubscriptionList,
    acceptSubscription,
    rejectSubscription
} from '../interface/client/subscription';

const getPendingSubscription = async () => {
    try {
        const pendingSubscriptionList = await getPendingSubscriptionList();

        if (
            pendingSubscriptionList !== null &&
            !Array.isArray(pendingSubscriptionList) &&
            pendingSubscriptionList === 'NOT_AUTHENTICATED'
        ) {
            const invalidStatus: StandardError = {
                error_code: ErrorCode.NOT_AUTHENTICATED,
                message: ErrorMessage.NOT_AUTHENTICATED
            };
            return invalidStatus;
        }

        return pendingSubscriptionList;
    } catch (error) {
        throw error;
    }
};

const updateSubscriptionStatus = async (
    subscription_id: number | null,
    status: string
) => {
    try {
        const ACCEPTED = 'ACCEPTED';
        const REJECTED = 'REJECTED';

        if (subscription_id === null) {
            const invalidSubscriptionId: StandardError = {
                error_code: ErrorCode.INVALID_SUBSCRIPTION_ID,
                message: ErrorMessage.INVALID_SUBSCRIPTION_ID
            };
            return invalidSubscriptionId;
        }

        if (status !== ACCEPTED && status !== REJECTED) {
            const invalidStatus: StandardError = {
                error_code: ErrorCode.INVALID_STATUS,
                message: ErrorMessage.INVALID_STATUS
            };
            return invalidStatus;
        }

        let updateStatusResponse;
        if (status === ACCEPTED) {
            updateStatusResponse = await acceptSubscription(subscription_id);
        } else {
            updateStatusResponse = await rejectSubscription(subscription_id);
        }

        if (
            updateStatusResponse !== 'ACCEPT_SUBSCRIPTION' ||
            updateStatusResponse !== 'REJECT_SUBSCRIPTION'
        ) {
            const invalidStatus: StandardError = {
                error_code: ErrorCode.INVALID_STATUS,
                message: ErrorMessage.INVALID_STATUS
            };
            return invalidStatus;
        }

        return updateStatusResponse;
    } catch (error) {
        throw error;
    }
};

export { getPendingSubscription, updateSubscriptionStatus };
