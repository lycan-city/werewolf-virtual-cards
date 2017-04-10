import RestClient from 'react-native-rest-client'
import { API_URL } from '../config'
import Pusher from 'pusher-js/react-native';
import { PUSHER_KEY } from '../config';

Pusher.logToConsole = true;

class Party extends RestClient {
    constructor() {
        super(API_URL);
        this.pusher = new Pusher(PUSHER_KEY, {
            encrypted: true
        });
    }

    host = (user) =>
        this.POST('/host', { user });

    join = ({id, user}) =>
        this.POST('/join', {user, partyId: id});


    subscribe = (partyId, onJoined, onFled) => {
        const channel = this.pusher.subscribe(partyId);
        channel.bind('joined', ({id, name}) => onJoined({id,name}));
        channel.bind('fled', ({id}) => onFled({id}));
    };
}

export default new Party();
