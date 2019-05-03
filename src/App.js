import React, { useState, useEffect } from "react";

const App = () => {
  // [stateParameter, parameterModifyerFunction] = initial value
  const [count, setCount] = useState(0);
  const [isOn, toggle] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  useEffect(() => {
    // executes at every render
    document.title = `You have clicked ${count} times`;
    window.addEventListener("mousemove", handleMouseMove);

    // executes on unmount - to cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseMove = ({ pageX, pageY }) => {
    setMousePosition({ x: pageX, y: pageY });
  };

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const toggleLight = () => {
    toggle(prevState => !prevState);
  };

  return (
    <>
      <h2>Counter</h2>
      <button onClick={incrementCount}>I was clicked {count} times</button>
      <h2>Toggle Light</h2>
      <img
        src={
          isOn
            ? "https://icon.now.sh/highlight/fd0"
            : "https://icon.now.sh/highlight/aaa"
        }
        style={{
          height: "50px",
          width: "50px"
          // background: isOn ? "yellow" : "gray"
        }}
        alt="Flashlight"
        onClick={toggleLight}
      />
      <h2>Mouse position</h2>
      {JSON.stringify(mousePosition, null, 2)}
      <br />
    </>
  );
};

export default App;
