import Timer from "./components/Timer";
import TodoList from "./components/TodoList";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

import SettingsIcon from "@mui/icons-material/Settings";
import Dialog from "./Dialog";
import { useState } from "react";

function App() {
  const [playback, setPlayback] = useState(false);

  const [dialog, setDialog] = useState(false);

  function toggleplayback() {
    setPlayback((prevPlayback) => !prevPlayback);
  }

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
      <div className="w-screen min-h-screen bg-neutral-900 pt-32">
        <div className="w-auto flex flex-row justify-center items-center font-serif mb-8">
          <h1 className="mb-10 font-customFont text-7xl">
            They don{`'`}t know me son.
            <span className=" text-sm  flex flex-row-reverse">
              -David Goggins
            </span>
          </h1>
        </div>
        <div className="w-screen flex justify-center gap-5">
          <TodoList />
          <Timer />
        </div>
      </div>
    </>
  );
}

export {};

export default App;
