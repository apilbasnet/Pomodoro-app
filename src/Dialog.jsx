import { React, useEffect, useState, memo, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import TimerIcon from "@mui/icons-material/AccessTime";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import "./index.css";
import { useMyContext } from "./context/DialogContext";

const Dialog = ({ isDialogOn }) => {
  const dialogValues = useMyContext();
  const [autoPomoToggle, setAutoPomoToggle] = useState(false);
  const [autoBreakToggle, setAutoBreakToggle] = useState(false);

  function closeDialog() {
    isDialogOn(false);
  }

  useEffect(() => {
    setAutoPomoToggle(dialogValues.AutoStartPomo);
      setAutoBreakToggle(dialogValues.AutoStartBreak);
  }, [autoPomoToggle, dialogValues.AutoStartPomo, autoBreakToggle , dialogValues.AutoStartBreak]);



  function handlePomo(e) {
    dialogValues.Pomodoro = e.target.value;
  }

  function handleBreak(e) {
    dialogValues.ShortBreak = e.target.value;
  }

  function handleLongBreak(e) {
    dialogValues.LongBreak = e.target.value;
  }

  function Autopomodoro() {
    setAutoPomoToggle(!autoPomoToggle);
    dialogValues.AutoStartPomo = !dialogValues.AutoStartPomo;
  }
  console.log(autoPomoToggle);

  function AutoBreak() {
    setAutoBreakToggle(!autoBreakToggle);
    dialogValues.AutoStartBreak = !dialogValues.AutoStartBreak;
  }

  return (
    <div className="absolute h-screen w-screen flex justify-center items-center backdrop-brightness-75 text-slate-800">
      <div className="h-2/3  w-1/4 bg-neutral-100 dialog ">
        <div className="w-full  text-center  border-b-2 pb-2 ">
          <span className="ml-4">Setting</span>

          <CloseIcon
            onClick={closeDialog}
            className=" float-right mr-1 hover:cursor-pointer"
          />
        </div>
        <div className="flex gap-2 py-2">
          <TimerIcon />
          <h2>Timer</h2>
        </div>
        <div className="mb-2">
          <h2 className="text-neutral-700 mb-2">Time {"(minutes)"}</h2>
          <div className="flex ">
            <label className="label ">
              Pomodoro
              <input
                type="number"
                className="input "
                onChange={handlePomo}
                defaultValue={dialogValues.Pomodoro}
              />
            </label>
            <label className="label">
              Short Break
              <input
                type="number"
                className="input "
                onChange={handleBreak}
                defaultValue={dialogValues.ShortBreak}
              />
            </label>
            <label className="label">
              Long Break
              <input
                type="number"
                className="input"
                onChange={handleLongBreak}
                defaultValue={dialogValues.LongBreak}
              />
            </label>
          </div>
        </div>

        <div className="text-neutral-700  ">
          <div className="flex justify-between items-center">
            <h2>Auto Start Pomodoro</h2>
            {autoPomoToggle ? (
              <ToggleOnIcon
                fontSize="large"
                className="float-right mr-4 "
                onClick={Autopomodoro}
              />
            ) : (
              <ToggleOffIcon
                fontSize="large"
                className="float-right mr-4 "
                onClick={Autopomodoro}
              />
            )}
          </div>

          <div className="flex justify-between items-center">
            <h2>Auto Start Breaks</h2>
            {autoBreakToggle ? (
              <ToggleOnIcon
                fontSize="large"
                className="float-right mr-4  "
                onClick={AutoBreak}
              />
            ) : (
              <ToggleOffIcon
                fontSize="large"
                className="float-right mr-4 "
                onClick={AutoBreak}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
