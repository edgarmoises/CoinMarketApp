import {
    IS_LANDSCAPE
} from '../actions/types';

const INITIAL_STATE = {
    isLandscape: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case IS_LANDSCAPE:
            return {...state, isLandscape: action.payload};
        default:
            return state;
    }
}