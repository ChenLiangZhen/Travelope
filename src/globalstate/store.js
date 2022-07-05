import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from "redux-thunk";

import accountReducer from "./accountSlice";
import dataReducer from "./dataSlice";

const persistAccount = {
    key: 'account',
    storage: AsyncStorage,
};

const persistData = {
    key: 'data',
    storage: AsyncStorage,
};

export const store = configureStore({

    reducer: {
        account: persistReducer(persistAccount, accountReducer),
        data: persistReducer(persistData, dataReducer)
    },

    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]

});

export const dataControl = persistStore(store);
// dataControl.purge()
