import { useState, useContext } from "react";
import { Text, View } from "react-native";
import EventContext from "../context/EventContext";
import DateBar from "../components/PerviousEvent/DateBar";
import EventList from "../components/PerviousEvent/EventList";
import style from "../style";

function PerviousEventsScreen() {

    const { eventTypes, events, duringEvent, saveEvent, saveEventTypes, saveDuringEvent, addEvent } = useContext(EventContext)

    const [currentDate, setCurrentDate] = useState(0);



    return (
        <View style={style.page}>
            <View style={style.pageTitleBox}>
                <Text style={style.pageTitleText}>
                    Pervious Events
                </Text>
            </View>
            { events.length > 0 && <DateBar currentDate={currentDate} setCurrentDate={setCurrentDate} events={events}/>}
            { events.length > 0 && <EventList currentDate={currentDate} events={events}/>}
        </View>
    )
}

export default PerviousEventsScreen;