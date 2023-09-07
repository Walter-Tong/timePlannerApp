import { ScrollView, Text } from "react-native";
import { View } from "react-native";
import EventListItem from "./EventListItem";
import { useEffect } from "react";

function EventList({currentDate, events}) {

    let content = events[currentDate].event.map((item, index) => {
        return <EventListItem item={item} key={index} index={index} currentDate={currentDate} />
    })


    return (
        <ScrollView>
            {content}
        </ScrollView>
    )
}

export default EventList;