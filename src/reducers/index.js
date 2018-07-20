import { combineReducers } from 'redux';
import CoinReducer from './CoinReducer';
import CoinDetailReducer from './CoinDetailReducer';
import FavoritesReducer from './FavoriteCoinsReducer';
import DeviceActionReducer from './DeviceActionsReducer';
import DeviceActionsReducer from './DeviceActionsReducer';

export default combineReducers({
    marketCoins: CoinReducer,
    coinDetail: CoinDetailReducer,
    favorites: FavoritesReducer,
    deviceActions: DeviceActionsReducer
});