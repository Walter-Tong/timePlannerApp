import { ScrollView } from "react-native";
import EventListItem from "./EventListItem";

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