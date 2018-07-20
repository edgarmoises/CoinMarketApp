import _ from 'lodash';
import {
    ALL_COINS,
    GET_COINS,
    COINS_SUCCESS,
    COINS_ERROR,
    SEARCH_COINS,
} from '../actions/types';

const INITIAL_STATE = {
    allCoins: [],
    coins: [],
    filteredCoins: [],
    isFetching: false,
    error: '',
    loading: false
};

export default (state= INITIAL_STATE, action) => {
    switch (action.type) {
        case ALL_COINS:
            return {...state, allCoins: action.payload}
        case GET_COINS:
            return {...state, isFetching: true, error: '', filteredCoins: []};
        case COINS_SUCCESS:
            return {...state, isFetching: false, coins: action.payload};
        case COINS_ERROR:
            return {...state, isFetching: false, error: action.payload};
        case SEARCH_COINS:
            const searchText = action.payload;
            const searchCoins = _.filter(state.allCoins, function(coin) {
                return coin.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
            });

            if (searchCoins.length == 0) {
                return {...state, isFetching: false, error: 'No coins found'};
            } else {
                return {...state, filteredCoins: searchCoins};
            }
        default:
            return state;
    }
}