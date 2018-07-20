import Realm from 'realm';
import Schemas from './schema';

function configureRealm() {
    var realm = new Realm(Schemas);
    realm.close();
}

module.exports = configureRealm;