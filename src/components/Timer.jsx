import { useState, useEffect } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "../Dialog";
import { useSelector } from "react-redux";

function Timer() {
  const [timer, setTimer] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [isWorktime, setIsWorktime] = useState(true);
  // const [playWorksound, setPlayWorksound] = useState(false);
  // const [playBreaksound, setPlayBreaksound] = useState(false);
  const [playback, setPlayback] = useState(false);
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dialog, setDialog] = useState(false);

  const {
    pomodoro: pomodoroValue,
    shortBreak: shortBreakValue,
    longBreak: longBreakValue,
    autoStartPomo: autoStartPomoValue,
    autoStartBreak: autoStartBreakValue,
  } = useSelector((state) => state.timer);

  // let workSound = new Audio("./work.mp3");
  // let breakSound = new Audio("./break.mp3");
  let stopSound = new Audio("./stop.mp3");

  useEffect(() => {
    setTimer(pomodoroValue * 60);
  }, [dialog]);

  function toggleplayback() {
    setPlayback((prevPlayback) => !prevPlayback);
  }

  // useEffect(()=>{
  //   if(playback){
  //     workSound.play();
  //     breakSound.play();
  //   }else {
  //     workSound.pause();
  //     breakSound.pause();
  //   }
  // },[playback])

  useEffect(() => {
    let interval;

    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      autoStartPomoValue ? setIsActive(true) : setIsActive(false);
      autoStartBreakValue ? setIsActive(true) : setIsActive(false);

      setIsWorktime((prev) => !prev);
      setTimer(isWorktime ? shortBreakValue * 60 : pomodoroValue * 60);
      stopSound.play();
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, timer, isWorktime]);

  const startTimer = () => {
    setIsActive(true);
    setIsWorktime(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const workTimer = () => {
    autoStartPomoValue ? setIsActive(true) : setIsActive(false);

    setIsWorktime(true);
    setTimer(pomodoroValue * 60);
  };

  const breakTime = () => {
    autoStartBreakValue ? setIsActive(true) : setIsActive(false);
    setTimer(shortBreakValue * 60);
    setIsWorktime(false);
  };

  const longBreakTime = () => {
    autoStartBreakValue ? setIsActive(true) : setIsActive(false);
    setTimer(longBreakValue * 60);
    setIsWorktime(false);
  };

  function hanldeOnChange(e) {
    setNewTask(e.target.value);
  }

  function handleAdd() {
    if (newTask === "") {
      null;
    } else {
      setTask([...task, newTask]);
      setNewTask("");
    }
  }

  function handleDelete(index) {
    setTask(task.filter((task, i) => i !== index));
  }

  function handleUp(index) {
    if (index > 0) {
      const updatedData = [...task];
      [updatedData[index], updatedData[index - 1]] = [
        updatedData[index - 1],
        updatedData[index],
      ];
      setTask(updatedData);
    }
  }

  function handleDown(index) {
    if (index < task.length - 1) {
      const updatedData = [...task];
      [updatedData[index], updatedData[index + 1]] = [
        updatedData[index + 1],
        updatedData[index],
      ];
      setTask(updatedData);
    }
  }

  const timeFormat = (timer) => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const isDialogOn = () => {
    setDialog(false);
  };

  return (
    <>
      {dialog ? (
        <Dialog
          isDialogOn={isDialogOn}
          onClose={() => setDialog(false)}
        ></Dialog>
      ) : null}

      <div className="w-screen h-screen bg-neutral-900 flex flex-col justify-center items-center">
        <div className="w-auto flex flex-row justify-center items-center  font-serif mb-8">
          <h1 className="mb-10 font-customFont text-7xl">
            They don{`'`}t know me son.
            <span className=" text-sm  flex flex-row-reverse">
              -David Goggins
            </span>
          </h1>
        </div>

        <div className="absolute top-1 right-1 m-1 flex flex-col gap-2">
          <SettingsIcon
            className="hover:cursor-pointer"
            onClick={() => setDialog(!dialog)}
          ></SettingsIcon>

          {playback ? (
            <VolumeUpIcon
              className="hover:cursor-pointer"
              onClick={toggleplayback}
            />
          ) : (
            <VolumeOffIcon
              className="hover:cursor-pointer"
              onClick={toggleplayback}
            />
          )}
        </div>
        <div className=" flex justify-center items-center">
          <div className=" flex gap-5   ">
            <div className=" bg-neutral-800 p-6 pt-[10px] shadow-md ">
              <h1 className="text-xl font-semibold text-center mb-1">
                To do List
              </h1>

              <div className="flex h-8 mb-2   ">
                <input
                  type="text"
                  placeholder="Enter a task."
                  value={newTask}
                  onChange={hanldeOnChange}
                  className="flex-1 mr-1 pl-2"
                />

                <button onClick={handleAdd} className="py-1 rounded-none">
                  Add
                </button>
              </div>
              <ol className="">
                {task.map((task, index) => {
                  return (
                    <li
                      className="px-[5px] py-[2.5px] flex items-center gap-x-1 "
                      key={index}
                    >
                      <span className="flex-1">{task}</span>
                      <DeleteIcon
                        className="w-20 hover:cursor-pointer"
                        onClick={() => handleDelete(index)}
                      />
                      <ArrowUpwardIcon
                        className="  hover:cursor-pointer"
                        onClick={() => handleUp(index)}
                      >
                        UP
                      </ArrowUpwardIcon>
                      <ArrowDownwardIcon
                        className="  hover:cursor-pointer"
                        onClick={() => handleDown(index)}
                      >
                        Down
                      </ArrowDownwardIcon>
                    </li>
                  );
                })}
              </ol>
            </div>
            <div className=" h-80  bg-neutral-800  shadow-md p-6  flex flex-col justify-between items-center ">
              <div className=" gap-2 flex justify-center items-center ">
                <button onClick={workTimer}>Pomodoro</button>
                <button className=" " onClick={breakTime}>
                  Break
                </button>
                <button className="" onClick={longBreakTime}>
                  Long Break
                </button>
              </div>

              <div className="  text-8xl font-semibold flex justify-center items-center font-customFont ">
                {timeFormat(timer)}
              </div>

              <div className="gap-2 flex justify-center items-center">
                <button className="" onClick={startTimer}>
                  Start
                </button>
                <button onClick={stopTimer}>Stop</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export {};

export default Timer;
