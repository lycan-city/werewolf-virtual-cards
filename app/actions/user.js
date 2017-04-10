import * as types from './types';
import DeviceInfo  from 'react-native-device-info';

export function getUserInfo(userName) {
    return (dispatch, getState) => {
        var id = getState().user.id || DeviceInfo.getUniqueID();
        return {
            type: types.USER_INFO_UPDATED,
            user: {
                id,
                name: userName
            }
        };
    };
}