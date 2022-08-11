import { useEffect, useState } from "react";
import styles from './listBody.module.css'


function ListBody({value}) {
    const [limit, setLimit] = useState(null);
    console.log('value', value);
    console.log(value.split('.'))
    let subString = value.substring(0, 400);
    let subStringCopy = subString;
    // console.log('subString', subString);
    // const subStringArr = subString.split(".");
    // const ArrLastItem = subStringArr[(subStringArr.length - 1)];
    // console.log('print', ArrLastItem)
    // const newString = subStringArr.slice(0, subStringArr.length - 1).join('.');
    // console.log('newString', newString)
    // const string = " H5-million lawsuit in April that said in 2018, eight hockey players including members of Canada's World Junior team sexually assaulted,"
    // const pattern = /^(\s[A-Z])/g
    // console.log(pattern.test(string));
    useEffect(() => {
        const limitString = () => {
            const subStringArr = subString.split('.');
            console.log('subStringArr', subStringArr);
            if(subStringArr.length == 1) {
                const newString = subStringArr.join('.');
                console.log('newString', newString);
                if (newString.length < 200) {
                    const result = subStringCopy.substring(0, 201) + ('. . . ');
                    setLimit(result);
                    return;
                }
                const newStringArr = newString.split(' ');
                console.log('newStringArr', newStringArr);
                const slicedArr = newStringArr.slice(0, newStringArr.length - 1);
                console.log(slicedArr.join(' '));
                const result = slicedArr.join(' ');
                setLimit(`${result} . . . `);
                return;
            } else {
                const ArrLastItem = subStringArr[subStringArr.length - 1];
                console.log('ArrLastItem', ArrLastItem);
                const pattern = /^((\s[A-Z])|((\s)?(\r\n)+(\")?[A-Z]))/;
                console.log('pattern Test', pattern.test(ArrLastItem));
                if (!pattern.test(ArrLastItem)) {
                    subStringArr.pop();
                    subString = subStringArr.join('.');
                    console.log('subString', subString);
                    limitString();
                } else {
                    
                    let result = subStringArr.slice(0, subStringArr.length -1).join('.');
                    if (result.length < 200) {
                        result = subStringCopy.substring(0, 201) + ('. . . ');
                        setLimit(result);
                        return;
                    }
                    console.log('result', result);
                    result = result + '.';
                    setLimit(result);
                    return;
    
                }
    
            }
    
        }
        limitString();
    }, []);
    
    
    
    return (
        <p className="card-text">
                {limit && limit}
        </p>
    )

}

export default ListBody