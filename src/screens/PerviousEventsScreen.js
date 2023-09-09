import { useState, useContext } from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import EventContext from "../context/EventContext";
import DateBar from "../components/PerviousEvent/DateBar";
import EventList from "../components/PerviousEvent/EventList";
import style from "../style";
import { Modal } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from "react-native-dropdown-select-list";
import getIcon from "../function/getIcon";
import { icons } from "../enum";
import TimeForm from "../components/PerviousEvent/TimeForm";

function PerviousEventsScreen() {

    const { eventTypes, events, addEvent } = useContext(EventContext)

    const [currentDate, setCurrentDate] = useState(0);

    const [showEventForm, setShowEventForm] = useState(false);

    const [showDatePicker, setShowDatePicker] = useState(false);

    const [formType, setFormType] = useState("");

    const [formDate, setFormDate] = useState(new Date())

    const [editStart, setEditStart] = useState({
        hour: 0,
        min: 0,
        sec: 0
    })

    const [editEnd, setEditEnd] = useState({
        hour: 0,
        min: 0,
        sec: 0
    })

    const handleSubmit = async () => {
        if (formType !== "") {
            const startTime = new Date(formDate.toISOString().substring(0, 10));
            startTime.setUTCHours(editStart.hour);
            startTime.setUTCMinutes(editStart.min);
            startTime.setUTCSeconds(editStart.sec);
            const endTime = new Date(formDate.toISOString().substring(0, 10));
            endTime.setUTCHours(editEnd.hour);
            endTime.setUTCMinutes(editEnd.min);
            endTime.setUTCSeconds(editEnd.sec);
            for (let i = 0; i < events.length; i++) {
                if (events[i].date === formDate.toISOString().substring(0, 10)) {
                    if (events[i].event.length) {
                        for (let j = 0; j < events[i].event.length; j++) {
                            const item = events[i].event[j]
                            if ((new Date(item.startTime) < startTime && startTime < new Date(item.endTime)) || (new Date(item.startTime) < endTime && endTime < new Date(item.endTime))) {
                                return
                            }
                        }
                    } else {
                        break;
                    }
                }
            }
            console.log("Running")
            if (endTime > startTime) {
                await addEvent({ type: formType, startTime: startTime.toISOString(), endTime: endTime.toISOString() })
                setShowEventForm(false)
            }
        }
    }

    const handleDateChange = (event, value) => {
        setFormDate(value)
        setShowDatePicker(false)
    }

    const handleDateOpen = () => {
        if (showDatePicker) {
            setShowDatePicker(false)
        }
        setTimeout(() => setShowDatePicker(true), 0)
    }

    const dropDownData = eventTypes.map((item, index) => {
        return { key: index, value: <Text>{getIcon.call(icons, item)}{item.type}</Text> }
    })

    console.log(formType)

    return (
        <View style={style.page}>
            <View style={style.pageTitleBox}>
                <Text style={style.pageTitleText}>
                    Pervious Events
                </Text>
            </View>
            {events.length > 0 && <DateBar currentDate={currentDate} setCurrentDate={setCurrentDate} events={events} />}
            {events.length > 0 && <EventList currentDate={currentDate} events={events} />}
            <Modal visible={showEventForm} animationType="slide" style={{ backgroundColor: "#CCC" }}>
                <View>
                    <SelectList data={dropDownData} save="key" setSelected={(key) => setFormType(eventTypes[key].type)}/>
                    <Text>
                        Date:
                        {formDate.toISOString().substring(0, 10)}
                        <Ionicons name="calendar" size={24} color="black" onPress={handleDateOpen} />
                    </Text>
                    <Text>
                        Start Time:
                        <TimeForm time={editStart} setTime={setEditStart} />
                    </Text>
                    <Text>
                        End Time: 
                        <TimeForm time={editEnd} setTime={setEditEnd} />
                    </Text>
                    {showDatePicker && <DateTimePicker value={formDate} mode="date" is24Hour={true} onChange={handleDateChange} />}

                </View>
                <Button onPress={handleSubmit} title="Save Time" style={{ position: 'absolute', top: 0 }}></Button>
                <Button onPress={() => setShowEventForm(false)} title="Close Form" style={{ position: 'absolute', top: 0 }}></Button>
            </Modal>
            <TouchableOpacity style={{ justifyContent: "flex-end", flex: 1, alignItems: "flex-end" }}>
                <MaterialIcons name="add-box" size={48} color="black" onPress={() => setShowEventForm(!showEventForm)} />
            </TouchableOpacity>
        </View>
    )
}

export default PerviousEventsScreen;