import { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const dialogValues = {
    open: false,
    Pomodoro: 25,
    ShortBreak: 5,
    LongBreak: 15,
    AutoStartPomo: false,
    AutoStartBreak: false,
    AutoStartLongBreak: false,
  };

  return (
    <DialogContext.Provider value={dialogValues}>
      {children}
    </DialogContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMyContext = () => {
  return useContext(DialogContext);
};
