export function padNumToString(num: number) : string {
    if (num > 9) {
        return String(num);
    }
    return '0' + String(num);
}

export function get_date_with_month(date: Date) : string {
    if (date === undefined) {
        throw RangeError();
    }

    const date_num = String(date.getDate());
    const month_num = String(1 + date.getMonth());

    return `${date_num}/${month_num}`;
}

export function get_full_day_hour(date: Date) : string {
    if (date === undefined) {
        throw RangeError();
    }

    const hours_num = padNumToString(date.getUTCHours());
    const minutes_num = padNumToString(date.getMinutes());

    return `${hours_num}:${minutes_num}`;
}