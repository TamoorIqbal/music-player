import "./MusicPlayer.css";
import React, { useState, useRef, useEffect } from "react";
import "./Player.css";
import { useSelector, useDispatch } from "react-redux";
import {
  backwardSong,
  forwardSong,
  setCurrentSong,
  randomSong,
} from "../store/audioSlice";
function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const currentSong = useSelector((state) => state.audio.currentSong);
  const dispatch = useDispatch();
  const audioRef = useRef();
  const togglePlay = () => {
    if (currentSong) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    } else {
      alert("Please select a song");
    }
  };

  const handleEnded = () => {
    // Logic for what to do when the song ends
    if (isRepeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      handleForwardClick();
      // audioRef.current.play();
    }
  };
  const handleBackwardClick = () => {
    if (currentSong) {
      dispatch(backwardSong(currentSong));
    } else {
      alert("Please select a song");
    }
  };

  const handleForwardClick = () => {
    if (currentSong) {
      dispatch(forwardSong(currentSong));
    } else {
      alert("Please select a song");
    }
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };
  const toggleRandom = () => {
    // setIsRepeat(!isRandom);
    dispatch(randomSong());
  };
  const handleProgressChange = (event) => {
    // console.log("event.target.value", event.target.value);
    const newTime = (event.target.value / 100) * audioRef.current.duration;
    // console.log("audioRef.current.duration", audioRef.current.duration);
    // console.log("newTime", newTime);
    audioRef.current.currentTime = newTime;
  };
  useEffect(() => {
    if (currentSong) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

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
    <div className="plyr__controls">
      <div className="plyr-control-left">
        <div className="plyr__poster ">
          <div className="thumb">
            <img
              // src={audio.image}
              src={
                currentSong?.name === currentSong?.name && isPlaying
                  ? ""
                  : currentSong?.image
              }
            />
            <div className="toggle-play">
              {currentSong?.name === currentSong?.name &&
                (isPlaying ? (
                  <i className="fa-solid fa-pause"></i>
                ) : (
                  <i className="fas fa-play icon-play"></i>
                ))}
            </div>
          </div>
        </div>
        <div className="plyr__info">
          <a className="plyr__title ajax" href="#" data-pjax-state="">
            {currentSong?.name}
          </a>
          <div className="plyr__author">{currentSong?.description}</div>
        </div>
        <button
          type="button"
          className="plyr__control btn-like"
          data-action="like"
          data-type="post"
          data-plyr="like"
          data-id="2388"
        >
          <svg role="presentation">
            <use xlinkHref="#plyr-like"></use>
          </svg>
        </button>
        <a
          target="_blank"
          className="plyr__control no-ajax"
          data-plyr="download"
          href="http://music.flatfull.com/musicon/download/?id=2388&amp;nonce=052efeaa04"
        >
          <svg role="presentation">
            <use xlinkHref="#plyr-download"></use>
          </svg>
        </a>
        <a
          target="_blank"
          className="plyr__control"
          data-plyr="purchase"
          href=""
        ></a>
      </div>
      <div className="plyr-control-center">
        <div className="plyr-control-center-top">
          <div className="control control1">
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
        </div>

        <div className="plyr-control-center-bottom"></div>
      </div>
    </div>
  );
}

export default MusicPlayer;
