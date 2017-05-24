export default function createReducer(initialState, handlers, catchAll) {
    return function reducer(state = initialState, action) {
        if(handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else if(catchAll) {
            return catchAll(state, action);
        } else {
            return state;
        }
    }
}