import { IPremiumSong } from '../../../domain/premium-song';
import { IInsertPremiumSong } from './type';
import { StandardError, ErrorCode, ErrorMessage } from '../../../common/error';

const insertPremiumSong = async (db: any, premiumSong: IInsertPremiumSong) => {
    try {
        const prismaClient = await db.prisma();

        await prismaClient.song.create({
            data: {
                judul: premiumSong.title,
                audio_path: premiumSong.audio_path,
                penyanyi_id: premiumSong.user_id
            }
        });
    } catch (error) {
        const dbError: StandardError = {
            error_code: ErrorCode.DATABASE_ERROR,
            message: ErrorMessage.DATABASE_ERROR
        };
        throw dbError;
    }
};

const selectPremiumSongBySingerId = async (
    db: any,
    singer_id: number,
    offset: number,
    limit: number
): Promise<IPremiumSong[]> => {
    try {
        const prismaClient = await db.prisma();

        const premiumSongResult = await prismaClient.song.findMany({
            where: {
                penyanyi_id: singer_id
            },
            skip: offset,
            take: limit
        });

        const premiumSong: IPremiumSong[] = [];

        for (let i = 0; i < premiumSongResult.length; i++) {
            const premiumSongDetail: IPremiumSong = {
                id: premiumSongResult[i].song_id,
                title: premiumSongResult[i].judul,
                audio_path: premiumSongResult[i].audio_path,
                singer_id: premiumSongResult[i].penyanyi_id
            };

            premiumSong.push(premiumSongDetail);
        }

        return premiumSong;
    } catch (error) {
        const dbError: StandardError = {
            error_code: ErrorCode.DATABASE_ERROR,
            message: ErrorMessage.DATABASE_ERROR
        };
        throw dbError;
    }
};

const selectPremiumSongById = async (db: any, song_id: number) => {
    try {
        const prismaClient = await db.prisma();

        let premiumSongResult = await prismaClient.song.findMany({
            where: {
                song_id: song_id
            }
        });

        if (premiumSongResult.length === 0) {
            return null;
        }

        premiumSongResult = premiumSongResult[0];

        const premiumSong: IPremiumSong = {
            id: premiumSongResult.song_id,
            title: premiumSongResult.judul,
            audio_path: premiumSongResult.audio_path,
            singer_id: premiumSongResult.penyanyi_id
        };

        return premiumSong;
    } catch (error) {
        const dbError: StandardError = {
            error_code: ErrorCode.DATABASE_ERROR,
            message: ErrorMessage.DATABASE_ERROR
        };
        throw dbError;
    }
};

const countPremiumSongBySingerId = async (db: any, singer_id: number) => {
    try {
        const prismaClient = await db.prisma();

        const premiumSongResult = await prismaClient.song.count({
            where: {
                penyanyi_id: singer_id
            }
        });

        return premiumSongResult;
    } catch (error) {
        const dbError: StandardError = {
            error_code: ErrorCode.DATABASE_ERROR,
            message: ErrorMessage.DATABASE_ERROR
        };
        throw dbError;
    }
};

const updatePremiumSong = async (db: any, song: IPremiumSong) => {
    try {
        const prismaClient = await db.prisma();

        await prismaClient.song.update({
            where: {
                song_id: song.id
            },
            data: {
                judul: song.title,
                audio_path: song.audio_path,
                penyanyi_id: song.singer_id
            }
        });
    } catch (error) {
        const dbError: StandardError = {
            error_code: ErrorCode.DATABASE_ERROR,
            message: ErrorMessage.DATABASE_ERROR
        };
        throw dbError;
    }
};

export {
    insertPremiumSong,
    selectPremiumSongBySingerId,
    selectPremiumSongById,
    updatePremiumSong,
    countPremiumSongBySingerId
};
