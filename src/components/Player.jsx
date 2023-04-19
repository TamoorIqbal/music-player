import React, { useState, useRef, useEffect } from "react";
import "./Player.css";
import { useSelector, useDispatch } from "react-redux";
import {
  backwardSong,
  forwardSong,
  setCurrentSong,
  randomSong,
} from "../store/audioSlice";
import data from "../audios/110.mp3";

const Player = () => {
  const audioList = useSelector((state) => state.audio.audioList);
  const currentSong = useSelector((state) => state.audio.currentSong);
  const dispatch = useDispatch();
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  // const [isRandom, setIsRandom] = useState(false);
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    // Logic for what to do when the song ends
    console.log(isRepeat);
    if (isRepeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };
  const handleBackwardClick = () => {
    dispatch(backwardSong(currentSong));
  };
  const handleForwardClick = () => {
    dispatch(forwardSong(currentSong));
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };
  const toggleRandom = () => {
    // setIsRepeat(!isRandom);
    dispatch(randomSong());
  };

  const handleProgressChange = (event) => {
    console.log("event.target.value", event.target.value);
    const newTime = (event.target.value / 100) * audioRef.current.duration;
    // console.log("audioRef.current.duration", audioRef.current.duration);
    // console.log("newTime", newTime);
    audioRef.current.currentTime = newTime;
  };
  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", () => {
      const newProgress = (audio.currentTime / audio.duration) * 100;
      setProgress(newProgress);
    });

    return () => {
      audio.removeEventListener("timeupdate", () => {});
    };
  }, []);
  function formatDuration(duration) {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return (
    <>
      <div className="player">
        <div className="dashboard">
          <header>
            <h4>Now playing:</h4>
            <h2>{currentSong ? currentSong.name : "No song selected"}</h2>
          </header>

          <div className="cd">
            <div
              className="cd-thumb"
              style={{ backgroundImage: `url(${currentSong?.image})` }}
            ></div>
          </div>

          <div className="control">
            <div
              className={`btn btn-repeat ${isRepeat ? "active" : ""}`}
              onClick={toggleRepeat}
            >
              <i className="fas fa-redo"></i>
            </div>
            <div className="btn btn-prev" onClick={handleBackwardClick}>
              <i className="fas fa-step-backward"></i>
            </div>
            <div className="btn btn-toggle-play" onClick={togglePlay}>
              {isPlaying ? (
                <i className="fa-solid fa-pause"></i>
              ) : (
                <i className="fas fa-play icon-play"></i>
              )}
            </div>
            <div className="btn btn-new" onClick={handleForwardClick}>
              <i className="fas fa-step-forward"></i>
            </div>
            <div
              className={`btn btn-random ${isRepeat ? "active" : ""}`}
              onClick={toggleRandom}
            >
              <i className="fas fa-random"></i>
            </div>
          </div>
          {isNaN(audioRef.current?.currentTime)
            ? "00:00"
            : formatDuration(audioRef.current?.currentTime)}
          <input
            className="progress"
            type="range"
            value={progress}
            step="0.1"
            min="0"
            max="100"
            onChange={(e) => handleProgressChange(e)}
          />

          <audio
            id="audio"
            src={currentSong?.audioFile}
            ref={audioRef}
            onEnded={handleEnded}
          ></audio>
        </div>

        <div className="playlist">
          {audioList &&
            audioList.map((audio, index) => (
              <div
                key={index}
                className={`song ${
                  audio.name === currentSong?.name ? "active" : ""
                }`}
                onClick={() => {
                  dispatch(setCurrentSong(audio));
                  if (isPlaying) {
                    audioRef.current.pause();
                  } else {
                    audioRef.current.play();
                  }
                  setIsPlaying(!isPlaying);
                }}
              >
                <div className="thumb">
                  <img src={audio.image} alt="Quran Pak" />
                </div>
                <div className="body">
                  <h3 className="title">{audio.name}</h3>
                  <p className="author">{audio.description}</p>
                  <p className="author">{audio.createdAt}</p>
                </div>
                <div className="option">
                  <i className="fas fa-ellipsis-h"></i>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Player;
