import Timer from "./components/Timer";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
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
