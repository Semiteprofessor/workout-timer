import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ToggleSounds from "./ToggleSounds";
import Calculator from "./Calculator";

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
};

function App() {
  const [allowSound, setAllowSound] = useState<boolean>(true);
  const [time, setTime] = useState(formatTime(new Date()));

  const partOfDay = time.slice(-2);

  const workouts: { name: string; numExercises: number }[] = useMemo(() => {
    return [
      {
        name: "Full-body workout",
        numExercises: partOfDay === "AM" ? 9 : 8,
      },
      {
        name: "Arms + Legs",
        numExercises: 6,
      },
      {
        name: "Arms only",
        numExercises: 3,
      },
      {
        name: "Legs only",
        numExercises: 4,
      },
      {
        name: "Core only",
        numExercises: partOfDay === "AM" ? 5 : 4,
      },
    ];
  }, [partOfDay]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      <h1>Workout timer</h1>
      <time>for you workout on {time}</time>
      <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
      <Calculator workouts={workouts} allowSound={allowSound} />
    </main>
  );
}

export default App;
