import React from 'react';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { addNavigationHelpers } from 'react-navigation';
import shallowEqual from '../lib/shallowEqual';
import { AppNavigator } from '../navigators/AppNavigator';

class AppContainer extends React.Component<any, void> {
    render() {
        return <AppNavigator
            navigation={
                addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.navigation
                })
            } />;
    }
}

const mapStateToProps = state => ({
    navigation: state.navigation
});

const selectorFactory = dispatch => {
    let state = {};
    let ownProps = {};
    let result = {};
    const actions = bindActionCreators(ActionCreators as any, dispatch);

    return (nextState, nextOwnProps) => {
        const nextMappedState = mapStateToProps(nextState);
        const nextResult = { ...nextOwnProps, ...nextMappedState, ...actions, dispatch };
        state = nextState;
        ownProps = nextOwnProps;
        if (!shallowEqual(result, nextResult))
            result = nextResult;
        return result;
    };
};

export default connectAdvanced(selectorFactory)(AppContainer);
