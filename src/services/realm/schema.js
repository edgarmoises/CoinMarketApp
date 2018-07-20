import Realm from 'realm';

class CoinSchema extends Realm.Object {}
CoinSchema.schema = {
    name: 'Coin',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        urlImage: 'string',
        chartImage: 'string',
        symbol: 'string',
        website_slug: 'string',
        rank: 'int',
        circulating_supply: 'float',
        total_supply: 'float',
        max_supply: 'float'
    }
}

export default new Realm({schema: [CoinSchema]});