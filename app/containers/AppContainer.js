import React, { PropTypes, Component } from 'react';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { addNavigationHelpers } from 'react-navigation';
import shallowEqual from '../lib/shallowEqual';
import AppNavigator from '../navigators/AppNavigator';

class AppContainer extends Component {
    componentDidMount() {
        this.props.getUserInfo();
    }

    render = () => <AppNavigator
        navigation={
            addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.navigation
            })
        } />;
}

AppContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    navigation: state.navigation
});

const selectorFactory = dispatch => {
    let state = {};
    let ownProps = {};
    let result = {};
    const actions = bindActionCreators(ActionCreators, dispatch);

    return (nextState, nextOwnProps) => {
        const nextMappedState  = mapStateToProps(nextState);
        const nextResult = { ...nextOwnProps, ...nextMappedState, ...actions, dispatch };
        state = nextState;
        ownProps = nextOwnProps;
        if(!shallowEqual(result, nextResult))
            result = nextResult;
        return result;
    };
};

export default connectAdvanced(selectorFactory)(AppContainer);
