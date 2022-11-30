import Pg from '../infrastructure/database/postgresql';
import { IPremiumSong } from '../domain/premium-song';
import { IUser } from '../domain/user';
import {
    selectSingerById,
    selectAllSinger
} from '../interface/repository/user';
import { StandardError, ErrorCode, ErrorMessage } from '../common/error';
import {
    getUserSingerList,
    isSubscribed
} from '../interface/client/subscription';
import { selectPremiumSongBySingerId } from '../interface/repository/premium-song';

const MIN_OFFSET = 0;
const MAX_LIMIT = 9999;

const getAllSinger = async (binotify_user_id: number | null) => {
    try {
        await Pg.connect();

        if (binotify_user_id === null) {
            const userNotFound: StandardError = {
                error_code: ErrorCode.USER_NOT_FOUND,
                message: ErrorMessage.USER_NOT_FOUND
            };
            return userNotFound;
        }

        const singerList = await selectAllSinger(Pg);
        const userSubsctipionList = await getUserSingerList(binotify_user_id);

        const SUBSCRIPTION_NOT_FOUND = 'SUBSCRIPTION_NOT_FOUND';
        const filteredSingerList = singerList.map((singer: IUser) => {
            let subscriptionStatus = SUBSCRIPTION_NOT_FOUND;

            for (let i = 0; i < userSubsctipionList.length; i++) {
                if (userSubsctipionList[i].creator_id === singer.id) {
                    subscriptionStatus = userSubsctipionList[i].status;
                    break;
                }
            }

            const filteredSinger = {
                id: singer.id,
                name: singer.name,
                username: singer.username,
                email: singer.email,
                subscription_status: subscriptionStatus
            };
            return filteredSinger;
        });

        return filteredSingerList;
    } catch (error) {
        throw error;
    }
};

const getSingerPremiumSong = async (
    singer_id: number | null,
    binotify_user_id: number | null
) => {
    try {
        await Pg.connect();

        if (singer_id === null) {
            const singerNotFound: StandardError = {
                error_code: ErrorCode.SINGER_NOT_FOUND,
                message: ErrorMessage.SINGER_NOT_FOUND
            };
            return singerNotFound;
        }

        const singerDetail = await selectSingerById(Pg, singer_id);
        if (singerDetail === null) {
            const singerNotFound: StandardError = {
                error_code: ErrorCode.SINGER_NOT_FOUND,
                message: ErrorMessage.SINGER_NOT_FOUND
            };
            return singerNotFound;
        }

        if (binotify_user_id === null) {
            const userNotFound: StandardError = {
                error_code: ErrorCode.USER_NOT_FOUND,
                message: ErrorMessage.USER_NOT_FOUND
            };
            return userNotFound;
        }

        binotify_user_id = Number(binotify_user_id);
        if (!isSubscribed(binotify_user_id, singer_id)) {
            const userNotSubscribed: StandardError = {
                error_code: ErrorCode.NOT_SUBSCRIBED,
                message: ErrorMessage.NOT_SUBSCRIBED
            };
            return userNotSubscribed;
        }

        const offset = MIN_OFFSET;
        const limit = MAX_LIMIT;
        const premiumSongList = await selectPremiumSongBySingerId(
            Pg,
            singer_id,
            offset,
            limit
        );

        const filteredPremiumSongList = premiumSongList.map(
            (premiumSong: IPremiumSong) => {
                const filteredPremiumSong = {
                    id: premiumSong.id,
                    title: premiumSong.title,
                    audio_path: premiumSong.audio_path
                };
                return filteredPremiumSong;
            }
        );

        return {
            singer: {
                id: singerDetail.id,
                name: singerDetail.name,
                username: singerDetail.username,
                email: singerDetail.email
            },
            premium_song: filteredPremiumSongList
        };
    } catch (error) {
        throw error;
    }
};

export { getAllSinger, getSingerPremiumSong };
