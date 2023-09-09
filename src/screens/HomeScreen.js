import { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import EventContext from "../context/EventContext";
import { icons } from "../enum";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CurrentEvent from "../components/Home/CurrentEvent";
import style from "../style";

function HomeScreen() {

    function getIcon(obj) {
        if (this[obj.icon]) {
            return <Text style={{ color: obj.color }}>
                {this[obj.icon]}
            </Text>
        } else {
            return <MaterialIcons name="stop-circle" size={24} color={obj.color} />
        }
    }

    const { eventTypes, events, duringEvent, saveDuringEvent } = useContext(EventContext)

    console.log(events)

    const handleNewEvent = async (type) => {
        if (duringEvent?.endTime !== null) {
            const now = new Date();
            await saveDuringEvent({ startTime: now, type, endTime: null })
        }
    }

    const eventTypesRender = eventTypes.map((item, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => handleNewEvent(item.type)}>
                <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginTop: 15, borderStyle: "solid", borderColor: "#000", backgroundColor: "#CCC", borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {getIcon.call(icons, item)}<Text>{item.type}</Text>
                    </View>
                    <View style={{ alignSelf: "flex-end" }}>
                        <Ionicons name="stopwatch-outline" size={24} color="black" />
                    </View>
                </View>
            </TouchableOpacity>
        )
    })

    let currentEventContent;

    if (duringEvent === null) {
        currentEventContent = <View></View>
    } else {
        currentEventContent = <CurrentEvent />
    }

    return (
        <View style={style.page}>
            <View style={{ width: "100%", height: "40%", margin: "1%", padding: "1%", borderStyle: "solid", borderColor: "#000", borderRadius: 10, backgroundColor: "#BBB", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>
                <Text style={{ fontSize: 24, fontWeight: 600 }}>
                    {(duringEvent === null) ? "Current Event" : (duringEvent.endTime === null) ? "Current Event" : "Last Event"}
                </Text>
                {currentEventContent}
            </View>
            <View>
                {eventTypesRender}
            </View>
        </View>
    )
}

export default HomeScreen