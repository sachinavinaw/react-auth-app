import React from "react";

type CountDownProps = {
  timer: number;
  text?: string;
};

const convertSecondsToHHMMSS = (
  seconds: number,
): {
  hours: string;
  minutes: string;
  seconds: string;
} => {
  const hours = Math.floor(seconds / 3600); // Calculate hours
  const minutes = Math.floor((seconds % 3600) / 60); // Calculate minutes
  const remainingSeconds = seconds % 60; // Calculate remaining seconds

  // Pad minutes and seconds with leading zeros if necessary
  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(remainingSeconds).padStart(2, "0"),
  };
};

const CountDown: React.FC<CountDownProps> = ({ timer }) => {
  const { hours, minutes, seconds } = convertSecondsToHHMMSS(timer);
  return (
    <div className="count-down-main flex w-full items-start justify-center gap-4">
      <div className="timer w-16">
        <div className="overflow-hidden rounded-lg bg-indigo-600 px-2 py-4">
          <h3 className="countdown-element hours font-Cormorant text-center text-2xl font-semibold text-white">
            {hours}
          </h3>
        </div>
        <p className="font-Cormorant mt-1 w-full text-center text-lg font-normal text-gray-900">
          hours
        </p>
      </div>
      <h3 className="font-manrope text-2xl font-semibold text-gray-900">:</h3>
      <div className="timer w-16">
        <div className="overflow-hidden rounded-lg bg-indigo-600 px-2 py-4">
          <h3 className="countdown-element minutes font-Cormorant text-center text-2xl font-semibold text-white">
            {minutes}
          </h3>
        </div>
        <p className="font-Cormorant mt-1 w-full text-center text-lg font-normal text-gray-900">
          minutes
        </p>
      </div>
      <h3 className="font-manrope text-2xl font-semibold text-gray-900">:</h3>
      <div className="timer w-16">
        <div className="overflow-hidden rounded-lg bg-indigo-600 px-2 py-4">
          <h3 className="countdown-element seconds font-Cormorant animate-countinsecond text-center text-2xl font-semibold text-white">
            {seconds}
          </h3>
        </div>
        <p className="font-Cormorant mt-1 w-full text-center text-lg font-normal text-gray-900">
          seconds
        </p>
      </div>
    </div>
  );
};

export default CountDown;
