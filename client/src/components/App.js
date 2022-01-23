import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Game from "./pages/CreateGame/Game.js";
import NavBar from "./modules/NavBar.js";
import Home from "./pages/Home/Home.js";
import Profile from "./pages/Profile.js";
import HowToPlay from "./pages/howtoplay.js";
import InGame from "./pages/InGameComponents/InGame.js";


import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = (props) => {
  const [userId, setUserId] = useState(undefined);
  const [name, setName] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
      if(user.name){
        setName(user.name);
      }
    });
  }, []);

  const componentDidMount = () => {
    get("/api/whoami").then((user)=> {
      if(user._id){
        setUserId(user._id);
      }
    });
  }

  const handleLogin = () => {
    get("/api/spotifyLogin").then((data) => {
      console.log((data))
      window.location.href = data.url
    })
  };

  const handleCreate = () => {
    console.log("clicked!")
  };

  const handleLogout = () => {
    setUserId(undefined);
    console.log("logging out")
    post("/api/logout");
  };

  const handleBioUpdate = (value) => {
    post("/api/bioUpdate",{content: value.v, id: userId});
  };

 




  return (
    <>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      <Router>
        <Home path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
        <Game path="/lobby" userId={userId} name={name}/>
        <Profile path="/profile/" userId={userId} onSubmit={handleBioUpdate} />
        <NotFound default />
        <HowToPlay path="/howtoplay" userId={userId} handleLogin={handleLogin}/>
        <InGame path="/game/:gameCode" userId={userId} name={name}/>
      </Router>
    </>
  );
};

export default App;// jchanged in game component 
