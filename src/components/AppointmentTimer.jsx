import "ldrs/jelly";
import Countdown from "../components/Counter";

const AppointmentTimer = ({ time }) => {
  function getMonth(month) {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    return months[month - 1];
  }
  function unixTimestampToDateTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    const formattedDateTime = {
      date: `${day} ${getMonth(month)} ${year}`,
      time: `${hours}:${minutes}`,
    };
    return formattedDateTime;
  }
  return (
    <div className="h-[80vh] flex justify-center items-center flex-col ">
      <l-jelly size="50" speed="1" color="rgb(240,7,59)"></l-jelly>
      <h1 className="text-5xl text-red font-bold mb-4 mt-4">
        We're waiting for your visit, User.
      </h1>
      <p>
        Your appointment is scheduled for{" "}
        <span className="text-red font-bold">
          {unixTimestampToDateTime(time).date}
        </span>
        , Approximately on{" "}
        <span className="text-red font-bold">
          {unixTimestampToDateTime(time).time}
        </span>
        . Make sure to mark your calendar and join us on that date.
      </p>
      <p className="mb-2">see you in :</p>
      <div>
        <Countdown unixTimestamp={time} />
      </div>
      <p className="mt-2">
        Your donation can make a huge difference in saving lives.
      </p>
    </div>
  );
};

export default AppointmentTimer;
