import axios from "axios";

const getRealTimeWeekWithTimeSlots = async () => {
  try {
    const response = await axios.get("http://worldtimeapi.org/api/ip");
    const currentTime = new Date(response.data.utc_datetime);
    const startDate = new Date(currentTime);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const formattedWeekData = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dayDate = date.toISOString().split("T")[0];
      const eightAM = new Date(date);
      eightAM.setUTCHours(8, 0, 0, 0);
      const eightAMUnixTimestamp = eightAM.getTime() / 1000;
      const twoPM = new Date(date);
      twoPM.setUTCHours(14, 0, 0, 0);
      const twoPMUnixTimestamp = twoPM.getTime() / 1000;
      const dayObject = {
        day: i + 1,
        dayDate: dayDate,
        eightAMUnixTimeStamp: eightAMUnixTimestamp,
        twoPMUnixTimeStamp: twoPMUnixTimestamp,
      };
      formattedWeekData.push(dayObject);
    }

    return formattedWeekData;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
};

// Example usage:
getRealTimeWeekWithTimeSlots()
  .then((formattedWeekData) => {
    if (formattedWeekData) {
      console.log("Formatted week data:", formattedWeekData);
    } else {
      console.log("Failed to format real-time week data.");
    }
  })
  .catch((error) => console.error("Error:", error.message));
