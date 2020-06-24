import { combineReducers } from 'redux';
import { UPDATE_LANGUAGE, FREE } from '../actions/test'
const INITIAL_STATE = {
};


const merge = (prev, next) => Object.assign({}, prev, next)

const langReducer = (state = INITIAL_STATE, action) => {
    if (action.type === UPDATE_LANGUAGE) return merge(state, action.payload)
    return state
}
const www = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_LANGUAGE:
            return merge(state, action.payload)
        case FREE:
            return INITIAL_STATE
        default:
            return state
    }


    // if (action.type === UPDATE_LANGUAGE) return merge(state, action.payload)
    // return state
}

const reducer = combineReducers({
    // lang :langReducer,
    www
})

export default reducer