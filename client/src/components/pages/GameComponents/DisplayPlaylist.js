import React, { Component, useEffect, useState } from "react";
import "../../../utilities.css";
import {get, post} from "../../../utilities.js";
import "./DisplayPlaylist.css";

const DisplayPlaylist = (props) => {
//  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
    const [name, setName] = useState([]);
    const [selected, setSelected] = useState(false);

  const addOrRemove = () => {
      if (props.selectedPlaylists.indexOf(props.playlistID) === -1) {
          props.selectedPlaylists.push(props.playlistID);
          setSelected(true);
      }
      else {
          let deleteIndex = props.selectedPlaylists.indexOf(props.playlistID);
          props.selectedPlaylists.splice(deleteIndex,1);
          setSelected(false);
      }
      props.setSelected({
        type: "playlists",
        playlists: props.selectedPlaylists,
      });
  }

  useEffect(() => {
    if (props.playlistName.length > 35) {
        let shortName = props.playlistName;
      shortName = shortName.slice(0, 35) + "...";
      setName(shortName);
    }
    else {
        setName(props.playlistName);
    }
  }, []);

  let src = props && props.playlistImage && props.playlistImage.url ? props.playlistImage.url : "logo.png";

  let displayImage = selected ? (
    <div className="imageSelected">
    <img src={src} className="playlist-image"/>
    selected
    </div>
  ) : (
    <div className="imageNotSelected">
    <img src={src} className="playlist-image"/>
    </div>
  );

 /* const shortenName = (name) => {
      name = name.slice(0, 35);
      name = name + "...";
      console.log("this is the name" , name);
      return name;
  }*/

  return (
    <div onClick={() => addOrRemove()} className = "name_image u-pointer">
    <div className="playlistName"> {name} </div> 
    <div>  {displayImage}   </div>
    </div>
  );
};

export default DisplayPlaylist;
