import {
    GET_COIN_DETAIL,
    GET_COIN_CHART,
    IS_FAVORITE,
    CLEAR_COIN_DETAILS
} from '../actions/types'

const INITIAL_STATE = {
    coin: {},
    isFavorite: false,
    chart: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_COIN_DETAIL:
            return {...state, coin: action.payload };
        case GET_COIN_CHART:
            return {...state, chart: action.payload};
        case IS_FAVORITE:
            return {...state, isFavorite: action.payload}
        case CLEAR_COIN_DETAILS:
            return {...state, ...INITIAL_STATE};
        default:
            return state;
    }
};