import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/authSlice"; // Your auth slice
import { combineReducers } from "redux";

const persistConfig = {
    key: "root",
    storage,
};

// Combine reducers (if you have more reducers)
const rootReducer = combineReducers({
    auth: authReducer, // Add more reducers if needed
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Avoid errors from redux-persist
        }),
});

// Persistor
export const persistor = persistStore(store);

// export const persistor = typeof window !== "undefined" ? persistStore(store) : null;


// Types for store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
