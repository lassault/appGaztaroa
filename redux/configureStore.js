import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { excursiones } from './excursiones';
import { comentarios } from './comentarios';
import { cabeceras } from './cabeceras';
import { actividades } from './actividades';
import { favoritos } from './favoritos';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['favoritos']
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    actividades,
    cabeceras,
    comentarios,
    excursiones,
    favoritos
}))

const store = createStore(
    persistedReducer, applyMiddleware(thunk)
)

const persistor = persistStore(store);
export { persistor, store };