import RestClient from 'react-native-rest-client'
import { API_URL } from '../config'
import DeviceInfo  from 'react-native-device-info';

class Party extends RestClient {
    constructor() {
        super(API_URL);
    }

    host = (user) =>
        this.POST('/host', { user });
}

export default new Party();