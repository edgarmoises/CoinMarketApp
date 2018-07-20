import _ from 'lodash';
import axios from 'axios';
import realm from './realm';

export const getMainCoins = () => {
    return new Promise(resolve => {
        axios.get('https://api.coinmarketcap.com/v2/ticker/')
            .then((response) => {
                var coins = _.map(response.data["data"], (coin) => {
                    return _.extend({}, coin, { 
                        urlImage: `https://s2.coinmarketcap.com/static/img/coins/128x128/${coin.id}.png`,
                        chartImage: `https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/${coin.id}.png`
                    })
                });
                coins = _.orderBy(coins,['rank'],['asc']);
                resolve(coins);
            })
            .catch(((error) => {
                console.log(error);
                resolve(error);
            }));
    });
}

export const getAllCoinsList = () => {
    return new Promise(resolve => {
        axios.get('https://api.coinmarketcap.com/v2/listings/')
            .then((response) => {
                var coins = _.map(response.data["data"], (coin) => {
                    return _.extend({}, coin, { 
                        urlImage: `https://s2.coinmarketcap.com/static/img/coins/128x128/${coin.id}.png`,
                        chartImage: `https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/${coin.id}.png`
                    })
                });
                resolve(coins);
            })
            .catch(((error) => {
                console.log(error);
                resolve(error);
            }));
    });
}

export const getCoinDetails = (coinId) => {
    return new Promise(resolve => {
        axios.get(`https://api.coinmarketcap.com/v2/ticker/${coinId}/`)
            .then((response) => {
                const data = response.data["data"];
                const coin = _.extend({}, data, { 
                    urlImage: `https://s2.coinmarketcap.com/static/img/coins/128x128/${data.id}.png`,
                    chartImage: `https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/${data.id}.png`
                })
                resolve(coin);
            })
            .catch(((error) => {
                console.log(error);
                resolve(error);
            }));
    });
}

export const getFavoriteCoins = () => {
    return new Promise(resolve => {
        var db = realm.current();

        try {
            resolve(getFavorites());
        }catch(e) {
            console.log(e);

            resolve([]);
        } finally {
            db.close();
        }
    });
}

export const saveFavoriteCoin = (coin) => {
    return new Promise(resolve => {
        var db = realm.current();
    
        try {
            db.write(() => {
                db.create('Coin', {
                    id: coin.id,
                    name: coin.name,
                    urlImage: coin.urlImage,
                    chartImage: coin.chartImage,
                    symbol: coin.symbol,
                    website_slug: coin.website_slug,
                    rank: coin.rank,
                    circulating_supply: coin.circulating_supply || 0.0,
                    total_supply: coin.total_supply || 0.0,
                    max_supply: coin.max_supply || 0.0
                });
            });

            resolve(getFavorites());
        } catch(e) {
            console.log(e);
        } finally {
            db.close();
        }
    });
}

export const deleteFavoriteCoin = (favorite) => {
    return new Promise(resolve => {
        var db = realm.current();

        try {
            db.write(() => {
                var coin = db.objectForPrimaryKey('Coin', favorite.id);
                db.delete(coin);
            });

            resolve(getFavorites());
        } catch(e) {
            console.log(e);
        } finally {
            db.close();
        }
    });
}

function getFavorites() {
    var db = realm.current();

    try {
        const coins = Array.from(db.objects('Coin').sorted('name', false));

        const favorites = _.map(coins, (val) => {
            return {...val}
        });

        return favorites;
    } catch(e) {
        console.log(e);

        return [];
    } finally {
        db.close();
    }
}