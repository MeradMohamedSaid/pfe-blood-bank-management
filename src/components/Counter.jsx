import React, { useState, useEffect } from "react";

function Countdown({ unixTimestamp }) {
  const calculateTimeLeft = () => {
    const difference = unixTimestamp - Math.floor(Date.now() / 1000);

    var timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (3600 * 24)),
        hours: Math.floor((difference % (3600 * 24)) / 3600),
        minutes: Math.floor((difference % 3600) / 60),
        seconds: Math.floor(difference % 60),
        done: false,
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        done: true,
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="font-bold text-4xl text-red flex gap-x-3 text-center justify-centent-center align-items-center">
      {timeLeft.days !== 0 && (
        <>
          <p>
            {timeLeft.days < 10 && "0"}
            {timeLeft.days}
          </p>{" "}
          Day
          {timeLeft.days > 1 && "s"},
        </>
      )}
      <>
        <p className="min-w-[3.1rem] flex justify-centent-center text-center">
          {timeLeft.hours < 10 && "0"}
          {timeLeft.hours}
        </p>{" "}
        Hour
        {timeLeft.hours > 1 && "s"},
      </>
      <>
        <p className="min-w-[3.1rem] flex justify-centent-center text-center">
          {timeLeft.minutes < 10 && "0"}
          {timeLeft.minutes}
        </p>{" "}
        Minute
        {timeLeft.minutes > 1 && "s"},
      </>
      <>
        <p className="min-w-[3.1rem] flex justify-centent-center text-center">
          {timeLeft.seconds < 10 && "0"}
          {timeLeft.seconds}
        </p>
        Second{timeLeft.seconds > 1 && "s"}
      </>
    </div>
  );
}

export default Countdown;
