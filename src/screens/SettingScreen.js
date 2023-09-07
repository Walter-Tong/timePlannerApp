import { Text, View } from "react-native";
import style from "../style";
import { TouchableOpacity } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SettingScreen() {

    const clearAll = async () => {
        console.log("clear start")
        try {
            await AsyncStorage.clear()
        } catch (e) {
            console.log(e)
        }
        console.log("clear end")
    }

    const getMultiple = async () => {
        console.log("get start")
        let value
        try {
            const keys = await AsyncStorage.getAllKeys()
            for (let i = 0; i < keys.length; i++) {
                value = await AsyncStorage.getItem(keys[i])
                console.log(keys[i], value)
            }
        } catch (e) {
            // read error
        }
        console.log("get end")
    }

    return (
        <View style={style.page}>
            <View style={style.pageTitleBox}>
                <Text style={style.pageTitleText}>
                    Setting
                </Text>
            </View>
            <View>
                <View style={[style.flexRow, style.itemBox]}>
                    <Text>
                        Console All Data (for Dev)
                    </Text>
                    <MaterialCommunityIcons name="target" size={24} color="black" onPress={getMultiple} />
                </View>
                <View style={[style.flexRow, style.itemBox]}>
                    <Text>
                        Clear All Data
                    </Text>
                    <MaterialIcons name="delete-forever" size={24} color="black" onPress={clearAll} />
                </View>
            </View>
        </View>
    )
}

export default SettingScreen