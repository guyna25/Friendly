export interface EventType {
    "_id": string,
    "eventTitle": string,
    "friends": string[],
    "location": string,
    "notes": string | undefined,
    "date": Date   
};

export interface PartialEventType {
    "eventTitle": string,
    "friends": string[],
    "location": string,
    "notes": string | undefined,
    "date": Date
};