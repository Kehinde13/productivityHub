'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function Meditation() {
  const [duration, setDuration] = useState(5); // minutes
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // seconds
  const [sessionDone, setSessionDone] = useState(false);
  const [sound, setSound] = useState('guide.mp3');

  const router = useRouter();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startMeditation = () => {
    setIsActive(true);
    setSessionDone(false);
    setTimeLeft(duration * 60);

    if (audioRef.current) {
      audioRef.current.src = `/sounds/${sound}`;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const cancelMeditation = () => {
    setIsActive(false);
    setSessionDone(false);
    setTimeLeft(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      setSessionDone(true);
      if (audioRef.current) audioRef.current.pause();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const backgroundStyle = {
    backgroundImage: 'url("/images/zenWallpaper.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative"
      style={backgroundStyle}
    >
      <button onClick={() => router.push("/")} className="absolute top-4 left-4">
        <i className="fa fa-long-arrow-left text-2xl text-left" aria-hidden="true"></i>
      </button>
      <div className="text-black text-center bg-opacity-60 p-6 rounded-lg max-w-xl w-full">
        <h1 className="md:text-8xl text-5xl font-bold mb-4 text-green-600">
          Meditation
        </h1>

        {!isActive && !sessionDone && (
          <>
            <p className="text-xl font-bold mb-6 text-green-300">
              When we meditate, we inject far-reaching and long-lasting benefits
              into our lives: We lower our stress levels, we get to know our
              pain, we connect better, we improve our focus, and we are kinder
              to ourselves.
            </p>

            <div className="flex flex-col gap-4 mb-6 font-bold">
              <label className="flex justify-center items-center text-left">
                Duration:
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="ml-4 px-4 py-2 text-black rounded"
                >
                  <option value="5">5 minutes</option>
                  <option value="10">10 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="20">20 minutes</option>
                </select>
              </label>

              <label className="flex justify-center items-center text-left">
                Sound:
                <select
                  value={sound}
                  onChange={(e) => setSound(e.target.value)}
                  className="ml-4 px-4 py-2 text-black rounded"
                >
                  <option value="guide.mp3">Meditation Guide</option>
                  <option value="Deep-Relaxation.mp3">Deep Relaxation</option>
                  <option value="Ease-Anxiety.mp3">Ease Anxiety</option>
                  <option value="Affirmation.mp3">words of Affirmation</option>
                  <option value="nature.mp3">Forest Ambience</option>
                  <option value="ocean-waves.mp3">Ocean Waves</option>
                  <option value="night-ambience.mp3">Night Ambience</option>
                  <option value="night-rain.mp3">rainfall</option>
                </select>
              </label>
            </div>

            <button
              onClick={startMeditation}
              className="px-6 py-3 bg-green-500 rounded hover:bg-green-600"
            >
              Start Meditation
            </button>
          </>
        )}

        {isActive && (
          <>
            <div className="text-5xl font-mono mb-4">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </div>
            <p className="mb-6 text-lg font-bold text-green-300">
              What we’re doing here is aiming for mindfulness, not some process
              that magically wipes your mind clear from the countless and
              endless thoughts that erupt and ping constantly in our brains.
            </p>
            <button
              onClick={cancelMeditation}
              className="px-5 py-2 bg-red-500 hover:bg-red-600 rounded"
            >
              Cancel Session
            </button>
          </>
        )}

        {sessionDone && (
          <>
            <h2 className="text-2xl font-semibold text-green-300 mb-4">
              Session Complete
            </h2>
            <p className="mb-6 text-lg font-bold text-green-300">
              Well done. Take a moment to observe how you feel — grounded,
              clear, and calm.
            </p>
            <button
              onClick={() => setSessionDone(false)}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded"
            >
              New Session
            </button>
          </>
        )}
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} preload="auto" loop />
    </div>
  );
}
