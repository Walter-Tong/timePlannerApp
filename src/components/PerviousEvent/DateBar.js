import { Text } from "react-native";
import { View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

function DateBar({currentDate, setCurrentDate, events}) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: "1%", marginTop: 10, borderStyle: "solid", borderColor: "#000", backgroundColor: "#CCC", borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>
            {(currentDate > 0) ? <MaterialIcons name="keyboard-arrow-left" size={24} color="black" onPress={() => setCurrentDate(currentDate - 1)} /> : <MaterialIcons name="keyboard-arrow-left" size={24} color="#CCC" />}
            <Text style={{alignSelf: "center"}}>
                {events[currentDate].date}
            </Text>
            {(currentDate < events.length - 1) ? <MaterialIcons name="keyboard-arrow-right" size={24} color="black" onPress={() => setCurrentDate(currentDate + 1)}/> : <MaterialIcons name="keyboard-arrow-right" size={24} color="#CCC" />}
        </View>
    )
}

export default DateBar