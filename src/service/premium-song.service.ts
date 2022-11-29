import Pg from '../infrastructure/database/postgresql';
import { IPremiumSong } from '../domain/premium-song';
import { IUser } from '../domain/user';
import { selectUserById } from '../interface/repository/user';
import { StandardError, ErrorCode, ErrorMessage } from '../common/error';
import { postAudio } from '../interface/client/audio';
import { IInsertPremiumSong } from '../interface/repository/premium-song/type';
import {
    insertPremiumSong,
    selectPremiumSongBySingerId,
    countPremiumSongBySingerId,
    selectPremiumSongById,
    updatePremiumSong,
    deletePremiumSongById
} from '../interface/repository/premium-song';

const createNewPremiumSong = async (
    user_id: number,
    title: string,
    audio_file: any
) => {
    try {
        await Pg.connect();

        const userDetail: IUser | null = await selectUserById(Pg, user_id);

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

const getSingerAllPremiumSong = async (
    singer_id: number,
    page: number = 1,
    limit: number = 10
) => {
    try {
        await Pg.connect();

        const userDetail: IUser | null = await selectUserById(Pg, singer_id);

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
            await selectPremiumSongBySingerId(Pg, singer_id, offset, limit);
        const overallPremiumSong: number = await countPremiumSongBySingerId(
            Pg,
            singer_id
        );

        return {
            page: page,
            count_all_singer_song: overallPremiumSong,
            premium_song: premiumSongResult
        };
    } catch (error) {
        throw error;
    }
};

const getSingerPremiumSong = async (
    singer_id: number,
    song_id: any
): Promise<any> => {
    try {
        await Pg.connect();

        const userDetail: IUser | null = await selectUserById(Pg, singer_id);

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

        if (song_id === null) {
            const songNotFound: StandardError = {
                error_code: ErrorCode.SONG_NOT_FOUND,
                message: ErrorMessage.SONG_NOT_FOUND
            };
            return songNotFound;
        }

        const premiumSongResult: IPremiumSong | null =
            await selectPremiumSongById(Pg, song_id);

        if (premiumSongResult === null) {
            const premiumSongNotFound: StandardError = {
                error_code: ErrorCode.SONG_NOT_FOUND,
                message: ErrorMessage.SONG_NOT_FOUND
            };
            return premiumSongNotFound;
        }

        if (premiumSongResult.singer_id !== singer_id) {
            const invalidSingerSong: StandardError = {
                error_code: ErrorCode.INVALID_SINGER_SONG,
                message: ErrorMessage.INVALID_SINGER_SONG
            };
            return invalidSingerSong;
        }

        return premiumSongResult;
    } catch (error) {
        throw error;
    }
};

const updateSingerPremiumSong = async (
    singer_id: number,
    song_id: number | null,
    title: string | null,
    audio_file: any
): Promise<any> => {
    try {
        await Pg.connect();

        const userDetail: IUser | null = await selectUserById(Pg, singer_id);

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

        if (song_id === null) {
            const songNotFound: StandardError = {
                error_code: ErrorCode.SONG_NOT_FOUND,
                message: ErrorMessage.SONG_NOT_FOUND
            };
            return songNotFound;
        }

        const premiumSong = await selectPremiumSongById(Pg, song_id);

        if (premiumSong === null) {
            const songNotFound: StandardError = {
                error_code: ErrorCode.SONG_NOT_FOUND,
                message: ErrorMessage.SONG_NOT_FOUND
            };
            return songNotFound;
        }

        if (premiumSong.singer_id !== singer_id) {
            const invalidSingerSong: StandardError = {
                error_code: ErrorCode.INVALID_SINGER_SONG,
                message: ErrorMessage.INVALID_SINGER_SONG
            };
            return invalidSingerSong;
        }

        if (title !== null && title !== '') {
            premiumSong.title = title;
        }

        if (audio_file !== null) {
            // const uploadedFile: string = await postAudio(audio_file);
            const uploadedFile: string = 'enggak';

            premiumSong.audio_path = uploadedFile;
        }

        await updatePremiumSong(Pg, premiumSong);
    } catch (error) {
        throw error;
    }
};

const deleteSingerPremiumSong = async (
    singer_id: number,
    song_id: number | null
): Promise<any> => {
    try {
        await Pg.connect();

        const userDetail: IUser | null = await selectUserById(Pg, singer_id);

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

        if (song_id === null) {
            const songNotFound: StandardError = {
                error_code: ErrorCode.SONG_NOT_FOUND,
                message: ErrorMessage.SONG_NOT_FOUND
            };
            return songNotFound;
        }

        const premiumSong = await selectPremiumSongById(Pg, song_id);

        if (premiumSong === null) {
            const songNotFound: StandardError = {
                error_code: ErrorCode.SONG_NOT_FOUND,
                message: ErrorMessage.SONG_NOT_FOUND
            };
            return songNotFound;
        }

        if (premiumSong.singer_id !== singer_id) {
            const invalidSingerSong: StandardError = {
                error_code: ErrorCode.INVALID_SINGER_SONG,
                message: ErrorMessage.INVALID_SINGER_SONG
            };
            return invalidSingerSong;
        }

        await deletePremiumSongById(Pg, song_id);
    } catch (error) {
        throw error;
    }
};

export {
    createNewPremiumSong,
    getSingerAllPremiumSong,
    getSingerPremiumSong,
    updateSingerPremiumSong,
    deleteSingerPremiumSong
};
