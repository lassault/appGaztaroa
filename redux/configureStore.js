import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { excursiones } from './excursiones';
import { comentarios } from './comentarios';
import { cabeceras } from './cabeceras';
import { actividades } from './actividades';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            excursiones,
            comentarios,
            cabeceras,
            actividades
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}