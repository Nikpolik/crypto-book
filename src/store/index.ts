import { configureStore } from "@reduxjs/toolkit";

import feedReducer from "./feed";
import connectionReducer from "./connection";

const store = configureStore({
  reducer: {
    feed: feedReducer,
    connection: connectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
