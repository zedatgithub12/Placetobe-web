import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import customizationReducer from './customizationReducer';
import storage from 'redux-persist/lib/storage';
import bookmarkSlice from './newstore/bookmarkSlice';

const persistConfig = {
    key: 'root',
    storage
};

const rootReducer = combineReducers({
    bookmark: bookmarkSlice,
    customization: customizationReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
});

const persistor = persistStore(store);

export { store, persistor };
