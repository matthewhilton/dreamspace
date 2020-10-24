
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import ExpoFileSystemStorage from "redux-persist-expo-filesystem"

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './rootreducer'; // the value from combineReducers

const persistConfig = {
 key: 'root',
 storage: ExpoFileSystemStorage,
 stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);