import { Text, View } from "react-native";
import { useContext, useState } from "react";
import EventContext from "../context/EventContext";
import EventTypeForm from "../components/EventTypes/EventTypeForm";
import style from "../style";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

function EventTypesScreen() {

    const { eventTypes, addEventType } = useContext(EventContext)

    const [addItem, setAddItem] = useState(false) 

    const content = eventTypes.map((item, index) => {
        if (index === eventTypes.length - 1 && addItem) {
            return <EventTypeForm eventType={item} key={index} index={index} openForm={true}/>
        }
        return <EventTypeForm eventType={item} key={index} index={index} openForm={false}/>
    })

    const handleNewType = async () => {
        await addEventType({type: "", icon: "", color: "#123"})
        setAddItem(true)
    }

    return (
        <View style={style.page}>
            <View style={style.pageTitleBox}>
                <Text style={style.pageTitleText}>
                    Types of Event
                </Text>
            </View>
            <ScrollView>
                {content}
            </ScrollView>
            <TouchableOpacity style={{justifyContent: "flex-end", flex: 1, alignItems: "flex-end"}}>
                <MaterialIcons name="add-box" size={48} color="black" onPress={handleNewType}/>
            </TouchableOpacity>
        </View>
    )
}

export default EventTypesScreen;