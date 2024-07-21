import React, { memo, useEffect, useState } from "react";
import clickSound from "./assets/click.wav";

const Calculator = ({ allowSound, workouts }) => {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);

  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
  }, [number, sets, speed, durationBreak]);

  //   const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  const playSound = () => {
    if (!allowSound) return;
    const audio = new Audio(clickSound);
    audio.play();
  };

  const handleInc = () => {
    setDuration((duration) => Math.floor(duration) + 1);
  };

  const handleDec = () => {
    setDuration((duration) => (duration > 1 ? Math.ceil(duration) - 1 : 0));
  };

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value="">
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(+e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How far are you ?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(+e.target.value)}
          />
          <span>{speed}</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(+e.target.value)}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDec}>-</button>
        <p>
          {mins < 10 && "0"} {mins}: {seconds < 10 && "0"} {seconds}
        </p>
        <button onClick={handleInc}>+</button>
      </section>
      <button onClick={() => playSound()}>Play</button>
    </>
  );
};

export default memo(Calculator);
