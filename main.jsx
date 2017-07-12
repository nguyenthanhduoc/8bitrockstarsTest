import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {reducer as formReducer} from 'redux-form';
import {createStore, combineReducers} from 'redux';
import Homepage from './src/HomeContainer.jsx'
import HomepageReducer from './src/HomeReducer.jsx';
import './src/assets/scss/main.scss';

const reducers = {
    homepage: HomepageReducer,
    form: formReducer
};

const reducer = combineReducers(reducers);
const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <Homepage/>
    </Provider>,
    document.getElementById('app')
);
