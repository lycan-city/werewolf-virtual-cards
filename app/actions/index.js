import * as CounterActions from './counter';
import * as PartyActions from './party';

export const ActionCreators = Object.assign({},
    CounterActions,
    PartyActions
);