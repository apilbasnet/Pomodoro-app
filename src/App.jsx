import Timer from "./components/Timer";
import TodoList from "./components/TodoList";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import axios from "axios";
import SettingsIcon from "@mui/icons-material/Settings";
import Dialog from "./Dialog";
import { useEffect, useState } from "react";
import { Loading } from "./components/loading";

function App() {
  const [playback, setPlayback] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState({
    content: "",
    author: "",
  });

  function toggleplayback() {
    setPlayback((prevPlayback) => !prevPlayback);
  }

  const isDialogOn = () => {
    setDialog(false);
  };

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setLoading(true);
        const data = await axios.get("https://api.quotable.io/random");
        console.log(data.data);
        setQuote({
          content: data.data.content,
          author: data.data.author,
        });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchQuote();
  }, []);

  if (loading) {
    return <Loading />;
  }
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
          <h1 className="w-3/4 flex flex-col mb-10 font-customFont text-4xl">
            {quote.content}
            <span className=" text-sm  flex flex-row-reverse">
              -{quote.author}
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
