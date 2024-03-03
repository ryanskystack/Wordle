import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = (state = {}, action) => {
  // your reducer code here
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Use `persistor` to control the persistence process

const store = configureStore(persistedReducer);

const persistGate = persistStore(store);

export { store, persistGate };
