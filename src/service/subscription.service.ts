import Pg from '../infrastructure/database/postgresql';
import { IUser } from '../domain/user';
import { selectUserById } from '../interface/repository/user';
import { StandardError, ErrorCode, ErrorMessage } from '../common/error';
import {
    getPendingSubscriptionList,
    acceptSubscription,
    rejectSubscription
} from '../interface/client/subscription';

const getPendingSubscription = async (user_id: any) => {
    try {
        await Pg.connect();

        const isValidAdmin = await __validateAdminRole(user_id);
        if (!isValidAdmin) {
            const userNotFound: StandardError = {
                error_code: ErrorCode.INVALID_USER_TYPE,
                message: ErrorMessage.INVALID_USER_TYPE
            };
            return userNotFound;
        }

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
    user_id: any,
    singer_id: number | null,
    subscription_id: number | null,
    status: string
) => {
    try {
        await Pg.connect();

        const isValidAdmin = await __validateAdminRole(user_id);
        if (!isValidAdmin) {
            const userNotFound: StandardError = {
                error_code: ErrorCode.INVALID_USER_TYPE,
                message: ErrorMessage.INVALID_USER_TYPE
            };
            return userNotFound;
        }

        const ACCEPTED = 'ACCEPTED';
        const REJECTED = 'REJECTED';

        if (singer_id === null) {
            const singerNotFound: StandardError = {
                error_code: ErrorCode.SINGER_NOT_FOUND,
                message: ErrorMessage.SINGER_NOT_FOUND
            };
            return singerNotFound;
        }

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
            updateStatusResponse = await acceptSubscription(subscription_id, singer_id);
        } else {
            updateStatusResponse = await rejectSubscription(subscription_id, singer_id);
        }

        if (
            updateStatusResponse !== 'ACCEPT_SUBSCRIPTION' &&
            updateStatusResponse !== 'REJECT_SUBSCRIPTION'
        ) {
            const invalidStatus: StandardError = {
                error_code: ErrorCode.INVALID_STATUS,
                message: ErrorMessage.INVALID_STATUS
            };
            return invalidStatus;
        }

        return {
            update_status: updateStatusResponse
        }
    } catch (error) {
        throw error;
    }
};

const __validateAdminRole = async (user_id: number) => {
    const userDetail: IUser | null = await selectUserById(Pg, user_id);

    if (
        userDetail === null ||
        userDetail.isAdmin === null ||
        userDetail.isAdmin === undefined ||
        userDetail.isAdmin === false
    ) {
        return false;
    }

    return true;
}

export { getPendingSubscription, updateSubscriptionStatus };
