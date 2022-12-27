import React, { useState, useRef, useEffect } from "react";
import { data } from "./dataStore";
import defaultCover from "../Home/musicIcon.jpeg";
import styles from "./MusicPlayer.module.css";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import test from "./Rihanna-Umbrella-(Ft-Jay-Z)-320.mp3";
function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();
  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value - 30);
    changeRange();
  };
  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value) + 30;
    changeRange();
  };
  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };
  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };
  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      `--seek-before-width`,
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };
  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };
  const calcTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    let returnedTime;
    if (minutes < 10) {
      if (secs < 10) {
        returnedTime = `0${minutes}:0${secs}`;
      } else {
        returnedTime = `0${minutes}:${secs}`;
      }
    } else if (secs < 10) {
      returnedTime = `${minutes}:0${secs}`;
    } else {
      returnedTime = `${minutes}:${secs}`;
    }
    return returnedTime;
  };
  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);
  return (
    <div className={styles.biggerContainer}>
      <img src={defaultCover} className={styles.defaultCover} />
      <h3 className={styles.musicTitle}>test music</h3>
      <div className={styles.container}>
        <audio ref={audioPlayer} src={test} preload="metadata"></audio>
        <div className={styles.currentTime}>{calcTime(currentTime)}</div>
        <div className={styles.progressBarContainer}>
          <input
            type={"range"}
            className={styles.progressBar}
            defaultValue={0}
            ref={progressBar}
            onChange={changeRange}
          />
        </div>
        <div className={styles.duration}>
          {duration && !isNaN(duration) && calcTime(duration)}
        </div>
      </div>
      <div className={styles.container}>
        <button className={styles.forwardBackward} onClick={backThirty}>
          <BsArrowLeftShort /> 30
        </button>
        <button onClick={togglePlayPause} className={styles.playPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className={styles.forwardBackward} onClick={forwardThirty}>
          30 <BsArrowRightShort />
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;
