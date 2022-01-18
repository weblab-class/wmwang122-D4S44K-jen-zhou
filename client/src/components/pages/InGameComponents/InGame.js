import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import "./InGame.css";
import GamePlayer from "./GamePlayer.js";
import Countdown from "./Countdown.js";
import { get, post } from "../../../utilities.js";
import { socket } from "../../../client-socket.js";
import SongPlayer from "./SongPlayer.js";
import InputAnswer from "./InputAnswer.js";

const InGame = (props) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [userData, setUserData] = useState([
    {
      _id: "61df83b4d87ebc594c8a6bc6",
      score: 0,
    },
  ]);
  const [userBuzz, setUserBuzz] = useState(null);
  const [userWhoBuzzed, setUserWhoBuzzed] = useState(null); //unnecesssary, just returns name instead of id
  const [trackList, setTrackList] = useState(null);
  const [trackNum, setTrackNum] = useState(1);
  const [myAudio, setMyAudio] = useState(null);
  const [playingNum, setPlayingNum] = useState(null);

  var temp = false;
  const handleBuzz = (event) => {
    temp = !temp;
    post("/api/buzz", { userId: props.userId });
    console.log("person buzzed");
  };

  useEffect(() => {
    get("/api/testPlaylists").then((body) => {
      setTrackList(body.tracks.items);
      setTrackNum(1);
      console.log(JSON.stringify(body.tracks.items[0].preview_url));
    });
    socket.on("buzz", newBuzz);
    return () => {
      socket.off("buzz", newBuzz);
    };
  }, []);

  const newBuzz = (userId) => {
    get("/api/userLookup", { _id: userId }).then((user) => {
      setUserWhoBuzzed(user.name);
    });
    setUserBuzz(userId);
  };

  const handleTimerEnd = () => {
    setUserWhoBuzzed(null);
    setUserBuzz(null);
    setTrackNum(trackNum + 1);
    console.log(trackNum);
  };

  useEffect(() => {
    if (trackNum && trackList && (!playingNum || playingNum != trackNum)) {
      setPlayingNum(trackNum);
      if (myAudio) {
        myAudio.pause();
      }
      setMyAudio(new Audio(trackList[trackNum].preview_url));
    }
  }, [trackNum, trackList, playingNum]);
  useEffect(() => {
    if (myAudio) {
      console.log("hi!" + playingNum);
      myAudio.play();
    }
  }, [myAudio]);

<<<<<<< HEAD
  var textBox = (userBuzz === props.userId) ? <div><InputAnswer/> </div> : <div> </div>;
=======
  var whoBuzzed = userBuzz ? <div>{userWhoBuzzed} has buzzed!</div> : <div>No one has buzzed!</div>;
  var textBox =
    userBuzz === props.userId ? (
      <div>
        <InputAnswer />
      </div>
    ) : (
      <div> hi </div>
    );
>>>>>>> 4dc47f891d98cbeb2ae76da96f75944b41d6892b

  return (
    <div className="inGame-container">
      <div className="inGame-container-left">
        <div>
          {userData.map((user) => (
            <GamePlayer _id={user._id} score={user.score} />
          ))}
        </div>
        <div>Add music</div>
      </div>
      <div className="inGame-container-right">
        <div>Room name</div>
        <div
          className="game-buzzer u-background-brightgreen u-pointer u-noSelect"
          onClick={handleBuzz}
        >
          buzz
        </div>
        {whoBuzzed}
        {textBox}
      </div>
      <Countdown time={5} userExists={userBuzz ? true : false} end={handleTimerEnd} />
    </div>
  );
};
//TODOOOOO
export default InGame;
