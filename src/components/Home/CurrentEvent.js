import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { useContext, useEffect, useState } from "react";
import EventContext from "../../context/EventContext";
import getIcon from "../../function/getIcon";
import { icons } from "../../enum";
import getType from "../../function/getType";
import style from "../../style";
import { Octicons } from '@expo/vector-icons';

function CurrentEvent() {

    const { eventTypes, events, duringEvent, saveEvent, saveEventTypes, saveDuringEvent, addEvent } = useContext(EventContext)

    //console.log(duringEvent)

    const defaultContent = <View></View>

    const [content, setContent] = useState(defaultContent)



    const [now, setNow] = useState((() => {
        const temp = new Date();
        temp.setHours(temp.getHours + 8)
        return temp
    })())

    const startTime = new Date(duringEvent.startTime)

    const CopyStartTime = new Date(startTime);

    CopyStartTime.setHours(startTime.getHours() + 8);

    useEffect(() => {
        if (!duringEvent.endTime) {
            const current = new Date()
            current.setHours(current.getHours() + 8)
            current.setSeconds(current.getSeconds() + 1)
            setTimeout(() => {
                setNow(current)
            }, 1000)
        }
    }, [now, duringEvent])

    useEffect(() => {
        if (duringEvent.endTime === null) {
            setContent(defaultContent)
        }
    }, [duringEvent])

    const handleStop = async () => {
        const endTime = new Date()
        const CopyEndTime = new Date(endTime);
        CopyEndTime.setHours(endTime.getHours() + 8);
        setContent(
            <View>
                <View style={{justifyContent: "space-between", flexDirection: "row"}}>
                    <Text>
                        To:
                    </Text>
                    <Text style={style.currentEventTime}>
                        {CopyEndTime.toUTCString().substring(17, 25)}
                    </Text>
                </View>
            </View>
        )
        addEvent({ startTime: CopyStartTime.toISOString(), endTime: CopyEndTime.toISOString(), type: duringEvent.type })
        saveDuringEvent({ ...duringEvent, endTime })
    }

    let timeDifferent = Math.floor((now.getTime() - CopyStartTime.getTime()))

    return (
        <View style={[style.itemBox, {height: "85%"}]}>
            <View>
                <Text style={{ fontSize: 24 }}>
                    {getIcon.call(icons, getType(eventTypes, duringEvent.type))}{duringEvent.type}
                </Text>
            </View>
            <View style={{justifyContent: "space-between", flexDirection: "row"}}>
                <Text>
                    From:
                </Text>
                <Text style={style.currentEventTime}>
                    {CopyStartTime.toUTCString().substring(17, 25)}
                </Text>
            </View>
            {content}
            <View style={{justifyContent: "space-between", flexDirection: "row"}}>
                <Text>
                    Passed:
                </Text>
                <Text style={style.currentEventTime}>
                    {(~~(timeDifferent / (1000 * 60 * 24)) % 24).toString().padStart(2, '0')}:
                    {(~~(timeDifferent / (1000 * 60)) % 60).toString().padStart(2, '0')}:
                    {(~~(timeDifferent / (1000)) % 60).toString().padStart(2, '0')}
                </Text>
            </View>
            {duringEvent.endTime === null && <TouchableOpacity onPress={handleStop} style={[style.itemBox, {flex: 1, alignItems: "center" ,backgroundColor: "#BBB", justifyContent: "center", marginBottom: 10}]}><Text style={{fontSize: 64}}>Stop<Octicons name="stopwatch" size={64} color="black" /></Text></TouchableOpacity>}
        </View>
    )
}

export default CurrentEvent;