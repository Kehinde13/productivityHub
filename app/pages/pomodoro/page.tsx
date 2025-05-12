'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

type Mode = 'work' | 'shortBreak' | 'longBreak';

const DURATIONS = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export default function Pomodoro() {
  const [mode, setMode] = useState<Mode>('work');
  const [timeLeft, setTimeLeft] = useState(DURATIONS.work);
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0); 
  const router = useRouter(); 

  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const progress = ((DURATIONS[mode] - timeLeft) / DURATIONS[mode]) * circumference;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);

      if (mode === 'work') {
        const newCycles = cycles + 1;
        setCycles(newCycles);

        if (newCycles % 4 === 0) {
          setMode('longBreak');
          setTimeLeft(DURATIONS.longBreak);
        } else {
          setMode('shortBreak');
          setTimeLeft(DURATIONS.shortBreak);
        }
      } else {
        setMode('work');
        setTimeLeft(DURATIONS.work);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, mode, cycles]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode('work');
    setTimeLeft(DURATIONS.work);
    setCycles(0);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const labelMap = {
    work: 'Focus Time',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  };

  return (
    <div className="relative p-8">
    {/* Back Arrow Button */}
    <button
      onClick={() => router.push('/')}
      className="absolute top-4 left-4"
      title="Back to Home"
    >
      <i className="fa fa-long-arrow-left text-xl" aria-hidden="true"></i>
    </button>
      <div className='text-center'>
      <h1 className="text-3xl font-bold mb-4">Pomodoro Timer</h1>
      <h2 className="text-xl mb-6 text-blue-600">{labelMap[mode]}</h2>

      <div className="relative w-[220px] h-[220px] mx-auto mb-8">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="#3b82f6"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-mono text-blue-700">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={toggleTimer}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        Completed Pomodoros: {cycles % 4} / 4
      </p>
    </div>
    </div>
  );
}
