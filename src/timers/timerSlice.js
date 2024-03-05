import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  autoStartPomo: false,
  autoStartBreak: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    changePomodoro: (state, action) => {
      state.pomodoro = action.payload;
    },
    changeShortBreak: (state, action) => {
      state.shortBreak = action.payload;
    },
    changeLongBreak: (state, action) => {
      state.longBreak = action.payload;
    },
    changeAutoStartPomo: (state) => {
      state.autoStartPomo = !state.autoStartPomo;
    },
    changeAutoStartBreak: (state) => {
      state.autoStartBreak = !state.autoStartBreak;
    },
  },
});

export default timerSlice.reducer;
export const {
  changePomodoro,
  changeShortBreak,
  changeLongBreak,
  changeAutoStartPomo,
  changeAutoStartBreak,
} = timerSlice.actions;
