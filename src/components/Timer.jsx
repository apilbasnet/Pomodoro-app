import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Timer() {
  const [timer, setTimer] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [isWorktime, setIsWorktime] = useState(true);
  // const [playWorksound, setPlayWorksound] = useState(false);
  // const [playBreaksound, setPlayBreaksound] = useState(false);

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
    console.log("Re-rendering");
  });

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
  }, [isActive, isWorktime]);

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

  const timeFormat = (timer) => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
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
    </>
  );
}

export {};

export default Timer;
