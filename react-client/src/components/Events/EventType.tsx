export interface EventType {
    _id: string,
    title: string,
    friends: string[],
    location: string,
    notes: string | undefined,
    start: Date,
    end: Date
}

export interface PartialEventType {
    title: string,
    friends: string[],
    location: string,
    notes: string | undefined,
    start: Date,
    end: Date
}