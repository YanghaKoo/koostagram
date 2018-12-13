import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import penderMiddleware from 'redux-pender'
import * as modules from './modules'

const reducers = combineReducers(modules)
const middleWares = [penderMiddleware()]

const isDev = process.env.NODE_ENV == 'development'
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancer = devtools || compose

const configure = () => createStore(reducers, composeEnhancer(applyMiddleware(...middleWares)))
export default configure