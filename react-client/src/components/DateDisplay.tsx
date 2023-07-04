import React from "react";
import { get_full_day_hour } from "../utils/Utils";

const DateDisplay = (props: { dateVal: Date }) => {
    return <>{`${get_full_day_hour(props.dateVal)} ${props.dateVal.toLocaleDateString()}`}</>;
};

export default DateDisplay;