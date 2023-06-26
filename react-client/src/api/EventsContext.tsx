import { createContext } from "react";
import EventApi from "./EventApi";

type EventContextType = {
    apiService: EventApi
}

const EventContext = createContext<EventContextType>({apiService: new EventApi()});

export default EventContext;