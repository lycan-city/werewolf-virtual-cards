import * as types from './types';

export function incrementCounter() {
    return {
        type: types.INCREMENT_COUNTER
    };
}