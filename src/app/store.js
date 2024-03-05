import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "../timers/timerSlice";

const store = configureStore({
  reducer: {
    timer: timerReducer,
  },
});

export default store;
