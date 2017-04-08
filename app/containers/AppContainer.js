import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Home from './Home';
import Party from './Party';

const AppNavigator = StackNavigator({
    Home: { screen: Home },
    Party: { screen: Party }
});

const AppContainer = ({ dispatch, navigation }) => (
    <AppNavigator
        navigation={addNavigationHelpers({ dispatch, state: navigation })} />
);

AppContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    navigation: state.navigation
});

export default connect(mapStateToProps)(AppContainer);
