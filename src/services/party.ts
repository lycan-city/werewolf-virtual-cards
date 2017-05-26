import RestClient from 'react-native-rest-client'
import { config } from '../config';
import Pusher from 'pusher-js/react-native';

Pusher.logToConsole = true;

class Party extends RestClient {
    pusher: any;
    POST: (url: string, data: any) => Promise<any>;

    constructor() {
        super(config.API_URL);
        this.pusher = new Pusher(config.PUSHER_KEY, {
            encrypted: true
        });
    }

    host = (user) =>
        this.POST('/host', { user });

    join = ({ id, user }) =>
        this.POST('/join', { user, partyId: id });

    kickPlayer = ({ curentPartyId, kickedId, currentUserId }) =>
        this.POST('/kick', {
            partyId: curentPartyId,
            userId: kickedId,
            hostId: currentUserId
        });

    promotePlayer = ({ curentPartyId, kickedId, currentUserId }) =>
        this.POST('/promote', {
            partyId: curentPartyId,
            userId: kickedId,
            hostId: currentUserId
        }).catch(err => {
            console.log(err);
        });


    subscribe = (partyId, onJoined, onFled, onKicked, onPromoted) => {
        const channel = this.pusher.subscribe(partyId);
        channel.bind('joined', ({ id, name }) => onJoined({ id, name }));
        channel.bind('fled', ({ id }) => onFled({ id }));
        channel.bind('kicked', ({id}) => onKicked({id}));
        channel.bind('promote', ({id}) => onPromoted({id}));
    };
}

export default new Party();
