import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { DURINGEVENT, EVENTS, EVENTTYPES } from "../enum";

const EventContext = createContext();

function EventProvider({ children }) {

    const [events, setEvents] = useState([]); // = [{date: xxxx-xx-xx, event:[]}, {date: xxxx-xx-xx, event:[]},] +8 before turn to string, -8 when turn back to date
    const [eventTypes, setEventTypes] = useState([
        { type: "Game", icon: "game", color: "#049" },
        { type: "Study", icon: "study", color: "#5D7" },
        { type: "Lecture", icon: "lecture", color: "#004b00" },
        { type: "Social", icon: "social", color: "#5784DD" },
        { type: "YouTube", icon: "youtube", color: "#FF0000" },
        { type: "Gym", icon: "gym", color: "#592321" },
        { type: "Coding", icon: "coding", color: "#F44611" },
        { type: "Meal", icon: "meal", color: "#3B83BD" },
        { type: "Bath", icon: "bath", color: "#E55137" },
        { type: "Sleep", icon: "sleep", color: "#924E7D" },
        { type: "Transport", icon: "transport", color: "#67E" }
    ]); // = [{type: xxx, icon, color}]
    const [duringEvent, setDuringEvent] = useState(null);

    const loadData = async () => {
        try {
            const storageEvents = await AsyncStorage.getItem(EVENTS);
            const storageEventTypes = await AsyncStorage.getItem(EVENTTYPES)
            const storageDuringEvent = await AsyncStorage.getItem(DURINGEVENT)
            if (storageEvents) {
                const temp = JSON.parse(storageEvents)

                const now = new Date();

                now.setUTCHours(0);
                now.setUTCMinutes(0);
                now.setUTCSeconds(0);
                now.setUTCMilliseconds(0);

                setEvents(temp.filter((item) => (new Date(now) - new Date(item.date)) / (1000 * 60 * 60 * 24) <= 180 && item.event.length))
            }
            if (storageEventTypes) {
                setEventTypes(JSON.parse(storageEventTypes))
            }
            if (storageDuringEvent) {
                setDuringEvent(JSON.parse(storageDuringEvent))
            }
        } catch (error) {
            console.log("Error loading data", error)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const saveEvent = async (value) => {
        try {
            await AsyncStorage.setItem(EVENTS, JSON.stringify(value))
            setEvents(value)
        } catch (error) {
            console.log("Error saving data", error)
        }
    }

    const saveEventTypes = async (value) => {
        try {
            await AsyncStorage.setItem(EVENTTYPES, JSON.stringify(value))
            setEventTypes(value)
        } catch (error) {
            console.log("Error saving data", error)
        }
    }

    const saveDuringEvent = async (value) => {
        try {
            await AsyncStorage.setItem(DURINGEVENT, JSON.stringify(value))
            setDuringEvent(value)
        } catch (error) {
            console.log("Error saving data", error)
        }
    }

    const addEvent = async (value) => {
        const copyEvents = JSON.parse(JSON.stringify(events))

        console.log(copyEvents, events, "addEvent")

        const toProcess = []

        if (value.startTime.substring(0, 10) !== value.endTime.substring(0, 10)) {
            let today = new Date(value.startTime.substring(0, 10))
            while (today.toISOString().substring(0, 10) !== value.endTime.substring(0, 10)) {
                if (today.toISOString().substring(0, 10) === value.startTime.substring(0, 10)) {
                    const tempTime = new Date(today);
                    tempTime.setUTCHours(23);
                    tempTime.setUTCMinutes(59);
                    tempTime.setUTCSeconds(59);
                    tempTime.setUTCMilliseconds(999);
                    toProcess.push({ type: value.type, startTime: value.startTime, endTime: tempTime.toISOString() })
                } else if (today.toISOString().substring(0, 10) === value.endTime.substring(0, 10)) {
                    const tempTime = new Date(today);
                    tempTime.setUTCHours(0);
                    tempTime.setUTCMinutes(0);
                    tempTime.setUTCSeconds(0);
                    tempTime.setUTCMilliseconds(0);
                    toProcess.push({ type: value.type, startTime: tempTime.toISOString(), endTime: value.endTime })
                } else {
                    const tempTime = new Date(today);
                    tempTime.setUTCHours(23);
                    tempTime.setUTCMinutes(59);
                    tempTime.setUTCSeconds(59);
                    tempTime.setUTCMilliseconds(999);
                    const tempTime2 = new Date(today);
                    tempTime2.setUTCHours(0);
                    tempTime2.setUTCMinutes(0);
                    tempTime2.setUTCSeconds(0);
                    tempTime2.setUTCMilliseconds(0);
                    toProcess.push({ type: value.type, startTime: tempTime2.toISOString(), endTime: tempTime.toISOString() })
                }
                today.setUTCDate(today.getUTCDate() + 1)
            }
            const tempTime = new Date(today);
            tempTime.setUTCHours(0);
            tempTime.setUTCMinutes(0);
            tempTime.setUTCSeconds(0);
            tempTime.setUTCMilliseconds(0);
            toProcess.push({ type: value.type, startTime: tempTime.toISOString(), endTime: value.endTime })
        } else {
            toProcess.push(value)
        }

        toProcess.forEach((item) => {
            let checker = true;

            for (let i = 0; i < events.length; i++) {
                if (events[i].date === item.startTime.substring(0, 10)) {
                    copyEvents[i].event.push({ ...item })
                    copyEvents[i].event.sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
                    checker = false;
                    break;
                }
            }

            if (checker) {
                copyEvents.unshift({ date: item.startTime.substring(0, 10), event: [{ ...item }] })
            }
        })

        copyEvents.sort((a, b) => new Date(b.date) - new Date(a.date))

        await saveEvent(copyEvents)
    }

    const editEvent = async (value, index, subIndex) => {
        console.log(value, "edit")

        const copyEvents = JSON.parse(JSON.stringify(events))

        copyEvents[index].event = [...events[index].event.slice(0, subIndex), value, ...events[index].event.slice(subIndex + 1)].sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

        await saveEvent(copyEvents)
    }

    const removeEvent = async (value, subIndex) => {
        const copyEvents = JSON.parse(JSON.stringify(events))

        for (let i = 0; i < events.length; i++) {
            if (events[i].date === value.startTime.substring(0, 10)) {
                console.log(i)
                const updated = copyEvents[i].event.filter((item, index) => {
                    return index !== subIndex
                })
                copyEvents[i].event = updated;
                break;
            }
        }

        await saveEvent(copyEvents)
    }

    const addEventType = async (value) => {
        const copyEventTypes = JSON.parse(JSON.stringify(eventTypes))

        if (!copyEventTypes.some((item) => item.type === value.type)) {
            copyEventTypes.push({ ...value })
        }

        await saveEventTypes(copyEventTypes)
    }

    const editEventType = async (value, index) => {
        let copyEventTypes = JSON.parse(JSON.stringify(eventTypes))

        copyEventTypes = [...copyEventTypes.slice(0, index), value, ...copyEventTypes.slice(index + 1)]

        await saveEventTypes(copyEventTypes)
    }

    const removeEventType = async (index) => {
        const copyEventTypes = JSON.parse(JSON.stringify(eventTypes))

        await saveEventTypes(copyEventTypes.filter((item, ind) => ind !== index))
    }

    const contextValue = {
        events, eventTypes, duringEvent, saveEvent, saveEventTypes, saveDuringEvent, addEvent, editEvent, removeEvent, addEventType, editEventType, removeEventType
    }

    return (
        <EventContext.Provider value={contextValue}>
            {children}
        </EventContext.Provider>
    )
}

export { EventProvider }
export default EventContext;