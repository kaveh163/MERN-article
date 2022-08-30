import { useState, useEffect } from "react";

function TimeStamp({ createdDate, updatedDate }) {
  const [update, setUpdate] = useState(null);

  const currentDate = new Date();
  const updatedAt = new Date(updatedDate);
  const diffDate = currentDate - updatedAt;
  const dayInMs = 86400000;
  const hourInMs = 3600000;
  const minuteInMs = 60000;
  const DaysDiff = Math.floor(diffDate / dayInMs);
  const HoursDiff = Math.floor((diffDate % dayInMs) / hourInMs);
  const MinutesDiff = Math.floor(
    ((diffDate % dayInMs) % hourInMs) / minuteInMs
  );
  let result;
  const createdAt = new Date(createdDate);
  const yearCreated = createdAt.getFullYear();
  const monthCreated = createdAt.toLocaleString("default", { month: "short" });
  const dayCreated = createdAt.getDate();
  const timeCreated = createdAt.toLocaleTimeString();

  useEffect(() => {
    if (DaysDiff < 1) {
      if (HoursDiff < 24 && HoursDiff > 1) {
        result = `${HoursDiff} Hours Ago`;
        setUpdate(result);
      } else if (HoursDiff === 1) {
        result = `${HoursDiff} Hour Ago`;
        setUpdate(result);
      } else if (HoursDiff < 1 && MinutesDiff > 0) {
        result = `${MinutesDiff} Minutes Ago`;
        setUpdate(result);
      } else if (MinutesDiff === 0) {
        result = "1 Minute Ago";
        setUpdate(result);
      }
    } else {
      result = `${updatedAt.toLocaleString("default", {
        month: "long",
      })} ${updatedAt.getDate()}`;
      setUpdate(result);
    }
  }, []);
  return (
    <>
      {`Posted: ${monthCreated} ${dayCreated}, ${yearCreated} ${timeCreated} EST`}{" "}
      | {`Last Updated: ${update && update}`}
    </>
  );
}
export default TimeStamp;
