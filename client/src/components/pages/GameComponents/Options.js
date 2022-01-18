import React, { useEffect, useState } from "react";
import Playlist from "./Playlist.js";
import "./Options.css";
import { Link } from "@reach/router";
const Options = (props) => {
    const [isPublic, setVisible] = useState(false);
    const [wantsOwnPlaylist, setPlaylist] = useState(false);
    const [numberQuestions, setQuestions] = useState(0);
    const [time, setTime] = useState(0);
    const [hasNiceFriends, setFriendsSetting] = useState(false);
    let gameSettings = [isPublic, wantsOwnPlaylist, numberQuestions, time, hasNiceFriends];

    const handlePlaylist = (props) => {
        setPlaylist(true);
    }

    const handleNoPlaylist = (props) => {
        setPlaylist(false);
    }

    const handlePublic = (props) => {
        setVisible(true);
    }

    const handlePrivate = (props) => {
        setVisible(false);
    }

    const handleQuestions = (event) => {
        setQuestions(event.target.value);
        console.log(event.target.value);
    }

    const handleTime = (event) => {
        setTime(event.target.value);
        console.log(event.target.value);
    }

    const handleNiceFriends = (props) => {
        hasNiceFriends = !hasNiceFriends;
    }

    const handleYeeting = (props) => {
        <Link></Link>
    }

    let displayPlaylist = wantsOwnPlaylist ?
    (<div className="playlist-display">
         <Playlist />
     </div>) : (<div className="no-playlist-display">
        <Playlist />
     </div>);

    return(
        <div>
            <form>
                <p>Select a game visibility option:</p>

                <div>
                <input type="radio" id="public" name="visibility" onClick={handlePublic}/>
                <label for="public">Public</label>
                </div>

                <div>
                <input type="radio" id="private" name="visibility" onClick={handlePrivate}/>
                <label for="private">Private</label>
                </div>

                <label for="questions">Number of questions (0 is unlimited):</label>
                <input type="number" id="questions" name="questions"
                 min="0" max="10000" onChange={handleQuestions}></input>

                <label for="time">Maximum time for each question in seconds (0 is unlimited):</label>
                <input type="number" id="time" name="time"
                 min="0" max="10000" onChange={handleTime}></input>

                 <p>Would you like to use your own playlist(s) or for identify to generate one for you?</p>

                <div>
                <input type="radio" id="own" name="playlist" onClick={handlePlaylist}/>
                <label for="own">Own</label>
                </div>

                <div>
                <input type="radio" id="ours" name="playlist" onClick={handleNoPlaylist}/>
                <label for="ours">Ours</label>
                </div>
                {displayPlaylist}
                <div>
                <input type="checkbox" id="friends" name="friends" onClick={handleNiceFriends}/>
                <label for="friends">Allow friends to add playlists</label>
                </div>

                <input type="submit" onClick={handleYeeting} className="submitDatIsh"/>
            </form>
        </div> 
    );
}

export default Options;