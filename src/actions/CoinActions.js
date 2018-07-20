import axios from 'axios';
import {
    ALL_COINS,
    GET_COINS,
    COINS_SUCCESS,
    COINS_ERROR,
    GET_COIN_DETAIL,
    GET_COIN_CHART,
    GET_FAVORITES,
    COINS_FAVORITES_SUCCESS,
    COINS_FAVORITES_ERROR,
    IS_FAVORITE,
    SEARCH_COINS,
    SEARCH_FAVORITE_COINS,
    CLEAR_COIN_DETAILS
} from './types';
import {
    getAllCoinsList,
    getMainCoins, 
    getCoinDetails,
    saveFavoriteCoin,
    getFavoriteCoins,
    deleteFavoriteCoin
} from '../services'

export const getCoinsList = (actualCoins) => {
    return(dispatch) => {
        dispatch({
            type:GET_COINS
        });

        if (actualCoins.length > 0) {
            dispatch({
                type: COINS_SUCCESS,
                payload: actualCoins
            });
        } else {
            getMainCoins().then(coins => {
                dispatch({
                    type: COINS_SUCCESS,
                    payload: coins
                });
            })
            .catch(() => {
                dispatch({
                    type: COINS_ERROR,
                    payload: 'Error retreiving coins, try again'
                });
            });
        }
    };
}

export const getAllCoins = () => {
    return(dispatch) => {
        getAllCoinsList().then(coins => {
            dispatch({
                type: ALL_COINS,
                payload: coins
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
}

export const getCoinDetail = ({coinId}) => {
    return(dispatch) => {
        getCoinDetails(coinId)
            .then(coin => {
                dispatch({
                    type: GET_COIN_DETAIL,
                    payload: coin
                });
            })
    };
}

export const clearCoinDetails = () => {
    return({
        type: CLEAR_COIN_DETAILS
    });
}

export const getCoinChart = ({coinSymbol}) => {
    return(dispatch) => {
        axios.get(`https://widgets.cryptocompare.com/serve/v2/coin/chart?fsym=${coinSymbol}&tsym=USD&period=1M&app=www.geekwrapped.com`)
                .then(response => {
                    const data = response["data"];
                    dispatch({
                        type: GET_COIN_CHART,
                        payload: data
                    });
                })
                .catch(error => {

                });
    }
}

export const saveCoinToFavorites = (coin) => {
    console.log(coin);
    return(dispatch) => {
        saveFavoriteCoin(coin)
            .then(coins => {
                dispatch({
                    type: COINS_FAVORITES_SUCCESS,
                    payload: coins
                });
            });
    }
}

export const getFavorites = () => {
    return(dispatch) => {
        dispatch({
            type: GET_FAVORITES
        });

        getFavoriteCoins()
            .then(coins => {
                dispatch({
                    type: COINS_FAVORITES_SUCCESS,
                    payload: coins
                });
            })
            .catch(() => {
                dispatch({
                    type: COINS_FAVORITES_ERROR,
                    payload: 'Error retreiving coins, try again'
                });
            });
    }
}

export const isFavorite = (isFavorite) => {
    return {
        type: IS_FAVORITE,
        payload: isFavorite
    };
}

export const deleteFavorite = (coin) => {
    return(dispatch) => {
        deleteFavoriteCoin(coin)
            .then(coins => {
                dispatch({
                    type: COINS_FAVORITES_SUCCESS,
                    payload: coins
                })
            });
    }
}

export const searchCoins = (searchText) => {
    return {
        type: SEARCH_COINS,
        payload: searchText
    };
}

export const searchFavoriteCoins = (searchText) => {
    return({
        type: SEARCH_FAVORITE_COINS,
        payload: searchText
    });
}