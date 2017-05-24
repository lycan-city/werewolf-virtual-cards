import createReducer from '../lib/createReducer';
import { AppNavigator } from '../navigators/AppNavigator';

const initialNavigationState = {
    index: 0,
    routes: [
        { key: 'InitA', routeName: 'Home' }
    ]
};

export const navigation = createReducer(initialNavigationState, {}, function (state, action) {
    const newState = AppNavigator.router && AppNavigator.router.getStateForAction(action, state);
    return (newState ? newState : state);
});
