import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import {combineReducers} from 'redux';

import app from '../../modules/app';
import auth from '../../modules/auth';
import user from '../../modules/user';
import property from '../../modules/property';
import appointment from '../../modules/appointment';
import landlord from '../../modules/landlord';


const persistConfig = {
    key: 'rex',
    version: 1,
    storage: AsyncStorage,
    blacklist: ['propertyAPI', 'landlordAPI', 'landlord', 'appointmentAPI', 'appointment']
}


export const rootReducer = combineReducers({
    userAPI: user.apiReducer,
    user: user.userReducer,

    authAPI: auth.apiReducer,
    auth: auth.authReducer,

    appAPI: app.apiReducer,
    app: app.appReducer,

    propertyAPI: property.apiReducer,
    property: property.propertyReducer,

    appointmentAPI: appointment.apiReducer,
    appointment: appointment.appointmentReducer,

    landlordAPI: landlord.apiReducer,
    landlord: landlord.landlordReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            //serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]},
            immutableCheck: false,
            serializableCheck: false,
        }).concat([
            user.apiMiddleware,
            auth.apiMiddleware,
            app.apiMiddleware,
            property.apiMiddleware,
            appointment.apiMiddleware,
            landlord.apiMiddleware,
        ]),
});

setupListeners(store.dispatch);



