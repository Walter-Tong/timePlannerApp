import { Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function getIcon(obj) {
    if (this[obj.icon]) {
        return <Text style={{ color: obj.color }}>
            {this[obj.icon]}
        </Text>
    } else {
        return <MaterialIcons name="stop-circle" size={24} color={obj.color} />
    }
}

export default getIcon