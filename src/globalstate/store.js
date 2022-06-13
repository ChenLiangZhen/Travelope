import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from "redux-thunk";

import accountReducer from "./accountSlice";
import dataReducer from "./dataSlice";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

export const store = configureStore({

    reducer: {
        account: persistReducer(persistConfig, accountReducer),
        data: persistReducer(persistConfig, dataReducer)
    },

    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]

});

export const dataControl = persistStore(store);
// dataControl.purge()
