import delay from '../../../utils/delay';

export default class SecretPostingService {
    postTheSecret = success => {
        switch(success) {
            case true: 
                return delay(2000, success);
            case false:
                return delay(2000, success);
            default:
                return null;
        }
    }
}