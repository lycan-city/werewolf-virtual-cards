import { ActionTypes } from './types';
import DeviceInfo from 'react-native-device-info';

export const getUserInfo = (userName) => {
    return (dispatch, getState) => {
        const id = getState().user.id || DeviceInfo.getUniqueID();
        return dispatch({
            type: ActionTypes.USER_INFO_UPDATED,
            user: {
                id,
                name: userName
            }
        });
    }
};