import BinotifyPhpService from '../../infrastructure/client/binotify-php-service';

const postAudio = async (audio_file: any) => {
    const url = '/song/new_premium';

    const formData = new FormData();
    formData.append('song', audio_file);

    const response = await BinotifyPhpService.post(url, formData);

    return response;
};

export { postAudio };
