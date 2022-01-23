import React, { useEffect, useState } from "react";
import "./Options.css";
import { navigate } from "@reach/router";
import { Link } from "@reach/router";
import { get, post } from "../../../utilities.js";
import Playlists from "./Playlists.js";

const Options = (props) => {
  const [displayPop, setDisplayPop] = useState(false);
  const [isPublic, setVisible] = useState(false);
  const [wantsOwnPlaylist, setPlaylist] = useState(false);
  const [numberQuestions, setQuestions] = useState(0);
  const [time, setTime] = useState(0);

  let gameSettings = {isPublic:isPublic, wantsOwnPlaylist:wantsOwnPlaylist, numberQuestions:numberQuestions, time:time};

  var PopUpBox =
    displayPop === true ? (
      <>
        <div className="firstdiv"></div>
        <div className="popup">
          <div className="title column">advanced options</div>
          <div className="row space_between">
            <div className="text"> make game public </div>
            <input type="checkbox" name="switch" id="switch" onClick={() => handlePublic(event)} />
            <label for="switch"></label>
            <div className="text"> use my own playlists </div>
            <input type="checkbox" name="switch" id="switch2" />
            <label for="switch2"></label>
          </div>
          <div className="row space_between">
            <div className="text">
              num of questions:
              <div>
                <input
                  type="number"
                  id="questions"
                  name="questions"
                  min="0"
                  max="10000"
                  onChange={() => handleQuestions(event)}
                ></input>
              </div>
            </div>
            <div className="row space_between">
              <div className="text">
                time to answer:
                <input
                  type="number"
                  id="time"
                  name="time"
                  min="0"
                  max="10000"
                  onChange={() => handleTime(event)}
                ></input>
              </div>
            </div>
          </div>
          <div className="row space_evenly">
            <div className="title" onClick={() => setDisplayPop(event)}>
              cancel
            </div>
            <div onClick={() => submitGameOptions(event)} className="title">
              submit
            </div>
          </div>
          <Playlists/>
        </div>
      </>
    ) : (
      <> </>
    );

  const PopUp = () => {
    setDisplayPop(!displayPop);
  };

  const handlePlaylist = () => {
    setPlaylist(true);
  };

  const handleNoPlaylist = () => {
    setPlaylist(false);
  };

  const handlePublic = () => {
    setVisible(!isPublic);
  };

  const handleQuestions = (event) => {
    setQuestions(event.target.value);
    console.log(event.target.value);
  };

  const handleTime = (event) => {
    setTime(event.target.value);
    console.log(event.target.value);
  };

  const handleNiceFriends = (props) => {
    hasNiceFriends = !hasNiceFriends;
  };

  const submitGameOptions = () => {
    console.log(JSON.stringify(gameSettings));
    post("/api/newGame", { settings: gameSettings, userId: props.userId, name: props.name}).then((gameInfo) => {
      navigate(`/game/${gameInfo.gameCode}`, { state: gameInfo });
    });
  };

  let displayPlaylist = wantsOwnPlaylist ? (
    <div className="playlist-display">
    <Playlists/>
    </div>
  ) : (
    <div className="no-playlist-display">
    </div>
  );

  return (
    <div className="options-button u-pointer">
      <div className="options-text" onClick={PopUp}>
        Advanced Options
      </div>
      {PopUpBox}
    </div>
  );

  return (
    <div className="popup">
      <div className="title column">advanced options</div>
      <div className="row space_between">
        <div className="text"> make game public </div>
        <input type="checkbox" name="switch" id="switch" onClick={handlePublic} />
        <label for="switch"></label>
        <div className="text"> use my own playlists </div>
        <input type="checkbox" name="switch" id="switch2" />
        <label for="switch2"></label>
      </div>
      <div className="row space_between">
        <div className="text">
          num of questions:
          <div>
            <input
              type="number"
              id="questions"
              name="questions"
              min="0"
              max="10000"
              onChange={handleQuestions}
            ></input>
          </div>
        </div>
        <div className="row space_between">
            time to answer:
            <input
              type="number"
              id="time"
              name="time"
              min="0"
              max="10000"
              onChange={handleTime}
            ></input>
        </div>
      </div>
      <div className="row space_evenly">
        <div className="title"> cancel </div>
        <div onClick={() => submitGameOptions()} className="title">
          submit
        </div>
      </div>
    </div>
  );

  /* return (

    <div>
      <form>
        <p>Select a game visibility option:</p>

        <div>
          <input type="radio" id="public" name="visibility" onClick={handlePublic} />
          <label for="public">Public</label>
        </div>

        <div>
          <input type="radio" id="private" name="visibility" onClick={handlePrivate} />
          <label for="private">Private</label>
        </div>

        <label for="questions">Number of questions (0 is unlimited):</label>
        <input
          type="number"
          id="questions"
          name="questions"
          min="0"
          max="10000"
          onChange={handleQuestions}
        ></input>

        <label for="time">Maximum time for each question in seconds (0 is unlimited):</label>
        <input
          type="number"
          id="time"
          name="time"
          min="0"
          max="10000"
          onChange={handleTime}
        ></input>

        <p>Would you like to use your own playlist(s) or for identify to generate one for you?</p>

        <div>
          <input type="radio" id="own" name="playlist" onClick={handlePlaylist} />
          <label for="own">Own</label>
        </div>

        <div>
          <input type="radio" id="ours" name="playlist" onClick={handleNoPlaylist} />
          <label for="ours">Ours</label>
        </div>
        {displayPlaylist}
        <div>
          <input type="checkbox" id="friends" name="friends" onClick={handleNiceFriends} />
          <label for="friends">Allow friends to add playlists</label>
        </div>

        <div onClick={() => submitGameOptions()} className="submitDatIsh">
          submit
        </div>
      </form>
    </div>

    
  );*/
};

export default Options;
