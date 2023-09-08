import { Text } from "react-native";
import { View } from "react-native";
import { useContext, useState, useEffect } from "react";
import EventContext from "../../context/EventContext";
import { icons } from "../../enum";
import getIcon from "../../function/getIcon";
import getType from "../../function/getType";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import TimeForm from "./TimeForm";
import style from "../../style";

function EventListItem({ item, index, currentDate }) {
    const startTime = new Date(item.startTime)
    const endTime = new Date(item.endTime)

    const { addEvent, removeEvent, editEvent } = useContext(EventContext)

    const [openEdit, setOpenEdit] = useState(false);

    const [editStart, setEditStart] = useState({
        hour: startTime.getUTCHours(),
        min: startTime.getUTCMinutes(),
        sec: startTime.getUTCSeconds()
    })

    const [editEnd, setEditEnd] = useState({
        hour: endTime.getUTCHours(),
        min: endTime.getUTCMinutes(),
        sec: endTime.getUTCSeconds()
    })

    let handleEdit = async (ind) => {
        const copyStartTime = new Date(startTime)
        const copyEndTime = new Date(endTime)
        copyStartTime.setUTCHours(editStart.hour)
        copyStartTime.setUTCMinutes(editStart.min)
        copyStartTime.setUTCSeconds(editStart.sec)
        copyEndTime.setUTCHours(editEnd.hour)
        copyEndTime.setUTCMinutes(editEnd.min)
        copyEndTime.setUTCSeconds(editEnd.sec)

        for (let i = 0; i < events.length; i++) {
            if (events[i].date === copyStartTime.toISOString().substring(0, 10)) {
                if (events[i].event.length) {
                    for (let j = 0; j < events[i].event.length; j++) {
                        const item = events[i].event[j]
                        if (((new Date(item.startTime) < copyStartTime && copyStartTime < new Date(item.endTime)) || (new Date(item.startTime) < copyEndTime && copyEndTime < new Date(item.endTime)) && j !== ind)) {
                            return
                        }
                    }
                } else {
                    break;
                }
            }
        }

        if (copyEndTime > copyStartTime) {
            console.log(copyStartTime, copyEndTime)
            await editEvent({ type: item.type, startTime: copyStartTime.toISOString(), endTime: copyEndTime.toISOString() }, currentDate, ind)
            setOpenEdit(false)
        }
    }


    const editFormContent = (
        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 5, borderStyle: "solid", borderColor: "#000", backgroundColor: "#DDD", borderRadius: 10 }}>
            <View style={{ flexDirection: "row" }}>
                <View>
                    <Text>
                        Start Time
                    </Text>
                    <TimeForm time={editStart} setTime={setEditStart} />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text>
                        End Time
                    </Text>
                    <TimeForm time={editEnd} setTime={setEditEnd} />
                </View>
            </View>
            <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
                <AntDesign name="check" size={24} color="black" onPress={() => handleEdit(index)} />
                <AntDesign name="close" size={24} color="black" onPress={() => setOpenEdit(false)} />
            </View>
        </View>
    )



    const { eventTypes, events, duringEvent, saveEvent, saveEventTypes, saveDuringEvent } = useContext(EventContext)

    return (
        <View style={style.itemBox}>
            <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
                <View>
                    <Text>
                        {getIcon.call(icons, getType(eventTypes, item.type))}
                        {item.type}
                    </Text>
                    <View>
                        <Text>
                            {startTime.toUTCString().substring(17, 25)}
                        </Text>
                        <Text>
                            {endTime.toUTCString().substring(17, 25)}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
                    <View>
                        <Text>
                            <MaterialIcons name="edit" size={24} color="black" onPress={() => setOpenEdit(!openEdit)} />
                        </Text>
                    </View>
                    <View>
                        <Text>
                            <MaterialIcons name="delete" size={24} color="black" onPress={() => removeEvent(item, index)} />
                        </Text>
                    </View>
                </View>
            </View>
            <View>
                {openEdit && editFormContent}
            </View>
        </View>
    )
}

export default EventListItem