import _ from 'lodash';
import {
    GET_FAVORITES,
    COINS_FAVORITES_SUCCESS,
    COINS_FAVORITES_ERROR,
    SEARCH_FAVORITE_COINS,
} from '../actions/types';

const INITIAL_STATE = {
    favoriteCoins: [],
    filteredCoins: [],
    isFetching: false,
    error: ''
}

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_FAVORITES:
            return {...state, isFetching: true, error: '', filteredCoins: []};
        case COINS_FAVORITES_SUCCESS:
            return {...state, isFetching: false, favoriteCoins: action.payload};
        case COINS_FAVORITES_ERROR:
            return {...state, isFetching: false, error: action.payload};
        case SEARCH_FAVORITE_COINS:
            const searchText = action.payload;
                const searchCoins = _.filter(state.favoriteCoins, function(coin) {
                    return coin.name.indexOf(searchText) > -1;
            });

            if (searchCoins.length == 0) {
                return {...state, isFetching: false, error: 'No coins found'};
            } else {
                return {...state, filteredCoins: searchCoins};
            };
        default:
            return state;
    }
}