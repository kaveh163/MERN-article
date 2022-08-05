import { useEffect, useState } from "react";

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
  console.log(
    `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`
  );
  console.log(
    `${updatedAt.toLocaleDateString()} ${updatedAt.toLocaleTimeString()}`
  );
  console.log(HoursDiff);
  console.log(DaysDiff);
  console.log(MinutesDiff);
  let result;
  useEffect(() => {
    if (DaysDiff < 1) {
      if (HoursDiff < 24 && HoursDiff > 1) {
        result = `${HoursDiff} Hours Ago`;
        setTime(result);
      } else if (HoursDiff == 1) {
        result = `${HoursDiff} Hour Ago`;
        setTime(result);
      } else if (HoursDiff < 1 && MinutesDiff > 0) {
        result = `${MinutesDiff} Minutes Ago`;
        setTime(result);
      } else if (MinutesDiff == 0) {
        result = `${updatedAt.toLocaleDateString()} ${updatedAt.toLocaleTimeString()}`;
        setTime(result);
      }
    } else {
      result = `${updatedAt.toLocaleDateString()} ${updatedAt.toLocaleTimeString()}`;
      setTime(result);
    }
  }, []);

  return (
    <div className="card-footer">
      <small className="text-muted">{time && time}</small>
    </div>
  );
}
export default ListDate;
