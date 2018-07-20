import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
import configureRealm from './services/realm/configure';

class App extends Component {

    constructor() {
        super();

        configureRealm();
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return(
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;