import { NavigationActions } from 'react-navigation';

let navigator;
const queue = [];

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
  queue.forEach((a) => {
    navigator.dispatch(a);
  });
}

function navigate(routeName, params) {
  const nav = NavigationActions.navigate({
    routeName,
    params,
  });
  if (navigator) {
    navigator.dispatch(nav);
  } else {
    queue.push(nav);
  }
}

export default {
  navigate,
  setTopLevelNavigator,
};
