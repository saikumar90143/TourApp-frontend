import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./Features/AuthSlice";
import TourReducer from "./Features/TourSlice";
const store = configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourReducer,
  },
});

export default store;
