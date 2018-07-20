import Realm from 'realm';
import CoinSchema from './schema';

function getCurrent() {
  return new Realm([CoinSchema]);
}

module.exports = {
  current: getCurrent
}