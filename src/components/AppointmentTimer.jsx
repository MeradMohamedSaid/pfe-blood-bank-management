import "ldrs/jelly";
import Countdown from "../components/Counter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
const AppointmentTimer = ({
  name,
  address,
  timeObject,
  day,
  period,
  rank,
  verify,
  userRole,
}) => {
  const [time, setTime] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const setUp = () => {
      const isolated = timeObject.find((dayis) => dayis.day === day);
      const starting =
        period === 0
          ? isolated.eight + (rank - 1) * 600 - 3600
          : isolated.two + (rank - 1) * 600 - 3600;
      setTime((od) => starting);
    };
    if (timeObject && day && rank) {
      console.log("AppointmentTimer : ");
      console.log(timeObject);
      console.log(day);
      console.log(period);
      console.log(rank);
      console.log("UserRole :", userRole);
      console.log("AppointmentTimer : ");
      setUp();
    }
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      name &&
      address &&
      timeObject &&
      day &&
      period &&
      rank &&
      verify &&
      userRole
    ) {
      setIsLoading((old) => false);
    }
  }, []);
  function unixTimestampToDateTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const day = date.getDate();
    const suffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = date
      .toLocaleDateString("en-US", options)
      .replace(/\d{1,2}/, `$&${suffix}`);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const formattedTime = `${hours}:${minutes}`;
    return { date: formattedDate, time: formattedTime };
  }

  return (
    <>
      {time ? (
        <>
          <div className="h-[80vh] w-full flex justify-center items-center flex-col text-center gap-2 ">
            <l-jelly size="50" speed="1" color="rgb(240,7,59)"></l-jelly>
            <h1 className="text-5xl text-red font-bold mb-4 mt-4">
              We're waiting for your visit, User.
            </h1>
            <p className="text-xl mb-2 w-[100%]">
              Your appointment is scheduled for{" "}
              <span className="text-red font-bold">
                {unixTimestampToDateTime(time).date}
              </span>
              , at approximately{" "}
              <span className="text-red font-bold">
                {unixTimestampToDateTime(time).time}
              </span>
              .
              <p>
                We look forward to see you at{" "}
                <span className="text-red font-bold">
                  {name.replace(/\b\w/g, (char) => char.toUpperCase())} Center,{" "}
                  {address.replace(/\b\w/g, (char) => char.toUpperCase())}
                </span>{" "}
                in :
              </p>
            </p>
            <div>
              <Countdown unixTimestamp={time} />
            </div>
            {verify ? (
              <p className="mt-2">
                Don't Forget to bring your{" "}
                <span
                  className="text-red font-bold cursor-pointer text-bold underline"
                  onClick={() => {
                    navigate(
                      userRole === 2
                        ? "/donor/application"
                        : "/clinic/application"
                    );
                  }}
                >
                  paper work
                </span>{" "}
                with you.
              </p>
            ) : (
              <p className="mt-2">
                Your donation can make a huge difference in saving lives.
              </p>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AppointmentTimer;
