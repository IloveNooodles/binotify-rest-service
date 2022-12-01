import BinotifyPhpService from '../../infrastructure/client/binotify-php-service';
import FormData from 'form-data';

const postAudio = async (audio_file: any) => {
    try {
        const url = '/song/new_premium';

        const formData = new FormData();
        audio_file = JSON.stringify(audio_file);
        formData.append('song', audio_file);

        const response = await BinotifyPhpService.post(url, formData);

        return response;
    } catch (error) {
        throw error;
    }
};

export { postAudio };
