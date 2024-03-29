import { useEffect, useState } from "react";
import styles from "./listDate.module.css";

function ListDate({ date }) {
  const [time, setTime] = useState(null);
  const currentDate = new Date();
  const updatedAt = new Date(date);
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
  useEffect(() => {
    if (DaysDiff < 1) {
      if (HoursDiff < 24 && HoursDiff > 1) {
        result = `${HoursDiff} Hours Ago`;
        setTime(result);
      } else if (HoursDiff == 1) {
        result = `${HoursDiff} Hour Ago`;
        setTime(result);
      } else if (HoursDiff < 1 && MinutesDiff > 1) {
        result = `${MinutesDiff} Minutes Ago`;
        setTime(result);
      } else if (MinutesDiff <= 1) {
        result = "1 Minute Ago";
        setTime(result);
      }
    } else {
      result = `${updatedAt.toLocaleDateString()} ${updatedAt.toLocaleTimeString()}`;
      setTime(result);
    }
  }, []);

  return (
    <div className={`card-footer`}>
      <small className={`text-muted`}>{time && time}</small>
    </div>
  );
}
export default ListDate;
