import { configureStore } from "@reduxjs/toolkit";
import reducer from "./auth";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "main-root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({ reducer: persistedReducer });
const Persistor = persistStore(store);

export default store;
export { Persistor };
