import CloseIcon from "@mui/icons-material/Close";
import TimerIcon from "@mui/icons-material/AccessTime";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changePomodoro,
  changeShortBreak,
  changeLongBreak,
  changeAutoStartPomo,
  changeAutoStartBreak,
} from "./timers/timerSlice";

const Dialog = ({ isDialogOn }) => {
  const {
    pomodoro: pomodoroValue,
    shortBreak: shortBreakValue,
    longBreak: longBreakValue,
    autoStartPomo: autoStartPomoValue,
    autoStartBreak: autoStartBreakValue,
  } = useSelector((state) => state.timer);

  const dispatch = useDispatch();

  function closeDialog() {
    isDialogOn(false);
  }

  return (
    <div
      className="absolute h-screen w-screen flex justify-center items-center backdrop-brightness-75 text-slate-800"
      onClick={closeDialog}
    >
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
                value={pomodoroValue}
                onChange={(e) => {
                  dispatch(changePomodoro(e.target.value));
                }}
              />
            </label>
            <label className="label">
              Short Break
              <input
                type="number"
                className="input "
                value={shortBreakValue}
                onChange={(e) => {
                  dispatch(changeShortBreak(e.target.value));
                }}
              />
            </label>
            <label className="label">
              Long Break
              <input
                type="number"
                className="input"
                value={longBreakValue}
                onChange={(e) => {
                  dispatch(changeLongBreak(e.target.value));
                }}
              />
            </label>
          </div>
        </div>

        <div className="text-neutral-700  ">
          <div className="flex justify-between items-center">
            <h2>Auto Start Pomodoro</h2>
            {autoStartPomoValue ? (
              <ToggleOnIcon
                fontSize="large"
                className="float-right mr-4 "
                onClick={() => {
                  dispatch(changeAutoStartPomo(!autoStartPomoValue));
                }}
              />
            ) : (
              <ToggleOffIcon
                fontSize="large"
                className="float-right mr-4 "
                onClick={() =>
                  dispatch(changeAutoStartPomo(!autoStartPomoValue))
                }
              />
            )}
          </div>

          <div className="flex justify-between items-center">
            <h2>Auto Start Breaks</h2>
            {autoStartBreakValue ? (
              <ToggleOnIcon
                fontSize="large"
                className="float-right mr-4  "
                onClick={() => {
                  dispatch(changeAutoStartBreak(!autoStartBreakValue));
                }}
              />
            ) : (
              <ToggleOffIcon
                fontSize="large"
                className="float-right mr-4 "
                onClick={() =>
                  dispatch(changeAutoStartBreak(!autoStartBreakValue))
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
