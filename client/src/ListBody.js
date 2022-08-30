import { useEffect, useState } from "react";
import styles from "./listBody.module.css";

function ListBody({ value }) {
  const [limit, setLimit] = useState(null);
  let subString = value.substring(0, 400);
  let subStringCopy = subString;

  useEffect(() => {
    const limitString = () => {
      const subStringArr = subString.split(".");
      if (subStringArr.length == 1) {
        const newString = subStringArr.join(".");
        if (newString.length < 200) {
          const result = subStringCopy.substring(0, 201) + ". . . ";
          setLimit(result);
          return;
        }
        const newStringArr = newString.split(" ");
        const slicedArr = newStringArr.slice(0, newStringArr.length - 1);
        const result = slicedArr.join(" ");
        setLimit(`${result} . . . `);
        return;
      } else {
        const ArrLastItem = subStringArr[subStringArr.length - 1];
        const pattern = /^((\s[A-Z])|((\s)?(\r\n)+(\")?[A-Z]))/;
        if (!pattern.test(ArrLastItem)) {
          subStringArr.pop();
          subString = subStringArr.join(".");
          limitString();
        } else {
          let result = subStringArr.slice(0, subStringArr.length - 1).join(".");
          if (result.length < 200) {
            result = subStringCopy.substring(0, 201) + ". . . ";
            setLimit(result);
            return;
          }
          result = result + ".";
          setLimit(result);
          return;
        }
      }
    };
    limitString();
  }, []);

  return <p className="card-text">{limit && limit}</p>;
}

export default ListBody;
