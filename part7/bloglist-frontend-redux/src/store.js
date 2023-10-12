import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { blogsApi } from "./features/blogs/blogs";
import { authApi } from "./services/auth";
import notificationReducer from "./features/notification/notificationSlice";
import authReducer from "./features/auth/authSlice";
import blogsReducer from "./features/blogs/blogs";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [blogsApi.reducerPath]: blogsApi.reducer,
    notification: notificationReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    blogs: blogsReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(blogsApi.middleware, authApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
