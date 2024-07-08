import { store } from "./store";
import { Provider } from "react-redux";

import {
    persistStore,
} from 'redux-persist';

import { PersistGate } from 'redux-persist/integration/react'

let persistor = persistStore(store);

export default function Providers({ children }) {
    return(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}