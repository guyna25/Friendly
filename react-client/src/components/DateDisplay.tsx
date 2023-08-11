import React from "react";
import { get_full_day_hour } from "../utils/Utils";

const DateDisplay = (props: { startVal: Date, endVal: Date, wholeDay: boolean }) => {
    if (props.wholeDay) {
        return <>
        {`${get_full_day_hour(props.startVal)} ${props.startVal.toLocaleDateString()}`}
    </>;
    }
    return <>
        {`${get_full_day_hour(props.startVal)} ${props.startVal.toLocaleDateString()}`} -
        {`${get_full_day_hour(props.endVal)} ${props.endVal.toLocaleDateString()}`}
    </>;
};

export default DateDisplay;