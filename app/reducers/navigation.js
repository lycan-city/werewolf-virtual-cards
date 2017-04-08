import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import { NavigationActions } from 'react-navigation';
import AppContainer from '../containers/AppContainer';

const initialNavigationState = {
    index: 0,
    routes: [
        { key: 'InitA', routeName: 'Home' }
    ]
};

export const navigation = createReducer(initialNavigationState, {
    [types.NAVIGATE_TO_PARTY](state, action) {
        return AppContainer.router.getStateForAction(NavigationActions.navigate({ routeName: 'Party' }), state)
    }
}, function (state, action) {
    console.log(AppContainer.router)
    const newState = AppContainer.router && AppContainer.router.getStateForAction(action, state);
    return (newState ? newState : state);
});
