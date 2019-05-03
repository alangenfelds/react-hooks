import React, { useState, useEffect } from "react";

const initialLocationState = {
  latitude: null,
  longitude: null,
  speed: null
};

const App = () => {
  // [stateParameter, parameterModifyerFunction] = initial value
  const [count, setCount] = useState(0);
  const [isOn, toggle] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);
  const [{ latitude, longitude, speed }, setLocation] = useState(
    initialLocationState
  );

  let mounted = true;

  useEffect(() => {
    // executes at every render
    document.title = `You have clicked ${count} times`;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    navigator.geolocation.getCurrentPosition(handleGeolocation);
    const watchId = navigator.geolocation.watchPosition(handleGeolocation);

    // executes on unmount - to cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      mounted = false;
      navigator.geolocation.clearWatch(watchId); // cleanup listener
    };
  }, [count, status]); // when this second parameter is added to useEffect - eventlisteners will only run on mount and unmount

  const handleGeolocation = event => {
    if (mounted) {
      setLocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed
      });
    }
  };

  const handleOnline = () => {
    setStatus(true);
  };

  const handleOffline = () => {
    setStatus(false);
  };

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
      <h2>Network Status:</h2>
      <p>
        You are <strong>{status ? "ONLINE" : "OFFLINE"}</strong>
      </p>
      <h2>Geolocation:</h2>
      <p>Latitude is {latitude}</p>
      <p>Lomngitude is {longitude}</p>
      <p>Your speed is {speed ? speed : 0}</p>
    </>
  );
};

export default App;
