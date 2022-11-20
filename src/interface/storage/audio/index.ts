import { Shell } from '../../../infrastructure/cli/shell';

const saveAudio = (audioPath: string) => {
    let filePath = null;
    const AUDIO_DIR = 'public/audio/';

    if (!isExtensionValid(audioPath)) {
        return filePath;
    }

    const uniqueAudioName = generateUniqueAudioName(audioPath);
    filePath = AUDIO_DIR + uniqueAudioName;

    // TODO: Save audio to filePath
};

const getAudioDuration = (audioPath: string) => {
    const audioDurationCommand =
        "mediainfo --Output='General;%Duration%' " + audioPath;

    Shell.exec(audioDurationCommand)
        .then((audioDuration) => {
            return audioDuration;
        })
        .catch((e) => {
            return -1;
        });
};

const isExtensionValid = (audioPath: string) => {
    const validAudioExtension = [
        'mp3',
        'wav',
        'ogg',
        'flac',
        'aac',
        'm4a',
        'wma'
    ];
    const audioExtension = audioPath.split('.').pop();

    if (audioExtension && validAudioExtension.includes(audioExtension)) {
        return true;
    }

    return false;
};

const generateUniqueAudioName = (audioPath: string) => {
    const audioExtension = audioPath.split('.').pop();
    const audioName =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

    return audioName + '.' + audioExtension;
};
