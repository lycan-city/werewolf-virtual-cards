import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import { NavigationActions } from 'react-navigation';
import AppNavigator from '../navigators/AppNavigator';

const initialNavigationState = {
    index: 0,
    routes: [
        { key: 'InitA', routeName: 'Home' }
    ]
};

export const navigation = createReducer(initialNavigationState, {}, function (state, action) {
    console.log(AppNavigator.router)
    const newState = AppNavigator.router && AppNavigator.router.getStateForAction(action, state);
    return (newState ? newState : state);
});
