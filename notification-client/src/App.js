
import "./App.css"
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import logo from "./logo.png"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  const [notifications, setNotifications] = useState([]);

  const runEvent = () => {
    const socket = io("https://notification-rjy5.onrender.com", { transports: ["websocket"] });
    socket.emit("new_user_login", { message: "user have logged" });
  };

  const requestNotificationPermission = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
          showBrowserNotification();
        } else {
          console.log("Notification permission denied.");
        }
      });
    }
  };

  const showBrowserNotification = (message) => {
    if (Notification.permission === "granted") {
        toast.info("this is a event notification from oderJ");
        alert("thie an alert from orderG")
      new Notification("New User Login", {
        body: "this is the notifications from orderJ",
        icon:logo
      });
      
    }
  
  };

  const addNotification = (message) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { message, timestamp: new Date().toLocaleTimeString() }
    ]);
    showBrowserNotification(message);
  };

  useEffect(() => {
    requestNotificationPermission();

    const socket = io("https://notification-rjy5.onrender.com", { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log("connected to socket io");
    });

    socket.on("new_user_login", (data) => {
      console.log("new user login", data.message);
      addNotification(data.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="top"><div className="container">
    
    <h2>Notifications</h2>
      <button onClick={runEvent}>
       send notification
      </button>
      <ToastContainer />
   
     
    </div></div>
    
  );
};

export default App;
