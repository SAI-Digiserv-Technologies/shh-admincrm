import React, { useEffect, useState } from "react";
import ReactRoute from "./routes";
import NetworkScreen from "./Screens/NetworkScreen";

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  console.log(isOnline,"online");
  

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Clean up the listeners on unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return isOnline ?  <ReactRoute /> : <NetworkScreen/>;
};



export default App;
