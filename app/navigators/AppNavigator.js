import { StackNavigator } from 'react-navigation';
import Party from '../containers/Party';
import Home from '../containers/Home';

export default AppNavigator = StackNavigator({
    Party: { screen: Party },
    Home: { screen: Home },
});