import Pg from '../infrastructure/database/postgresql';
import { IPremiumSong } from '../domain/premium-song';
import { IUser } from '../domain/user';
import { getUserById } from '../interface/repository/user';
import { StandardError, ErrorCode, ErrorMessage } from '../common/error';
import { postAudio } from '../interface/client/audio';
import { IInsertPremiumSong } from '../interface/repository/premium-song/type';
import {
    insertPremiumSong,
    getPremiumSongBySingerId,
    getCountPremiumSongBySingerId
} from '../interface/repository/premium-song';

const createNewPremiumSong = async (
    user_id: number,
    title: string,
    audio_file: any
) => {
    try {
        await Pg.connect();

        const userDetail: IUser | null = await getUserById(Pg, user_id);

        if (userDetail === null) {
            const userNotFound: StandardError = {
                error_code: ErrorCode.USER_NOT_FOUND,
                message: ErrorMessage.USER_NOT_FOUND
            };
            return userNotFound;
        }

        // const uploadedFile: string = await postAudio(audio_file);
        const uploadedFile: string = 'ya';

        const premiumSong: IInsertPremiumSong = {
            title: title,
            audio_path: uploadedFile,
            user_id: user_id
        };

        await insertPremiumSong(Pg, premiumSong);
        return null;
    } catch (error) {
        throw error;
    }
};

const getAllPremiumSong = async (
    singer_id: number,
    page: number = 1,
    limit: number = 10
) => {
    try {
        await Pg.connect();

        const userDetail: IUser | null = await getUserById(Pg, singer_id);

        if (
            userDetail === null ||
            userDetail.isAdmin === null ||
            userDetail.isAdmin === undefined
        ) {
            const userNotFound: StandardError = {
                error_code: ErrorCode.USER_NOT_FOUND,
                message: ErrorMessage.USER_NOT_FOUND
            };
            return userNotFound;
        }

        if (userDetail.isAdmin === true) {
            const userInvalid: StandardError = {
                error_code: ErrorCode.INVALID_USER_TYPE,
                message: ErrorMessage.INVALID_USER_TYPE
            };
            return userInvalid;
        }

        const offset = (page - 1) * limit;
        const premiumSongResult: IPremiumSong[] =
            await getPremiumSongBySingerId(Pg, singer_id, offset, limit);
        const overallPremiumSong: number = await getCountPremiumSongBySingerId(
            Pg,
            singer_id
        );

        return {
            count_all_singer_song: overallPremiumSong,
            premium_song: premiumSongResult
        };
    } catch (error) {
        throw error;
    }
};

export { createNewPremiumSong, getAllPremiumSong };
