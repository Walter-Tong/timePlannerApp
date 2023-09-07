import { Text } from "react-native";
import { View, TextInput } from "react-native";

function TimeForm({ time, setTime }) {
    const handleInputChange = (key, value) => {
        setTime((prevEditEnd) => ({
            ...prevEditEnd,
            [key]: value || 0,
        }));
    };

    return (
        <View style={{ flexDirection: "row" }}>
            <TextInput
                style={{ borderWidth: 1, borderColor: '#AAA', width: 30, height: 30, textAlign: "center", fontSize: 24}}
                value={time.hour.toString().padStart(2, '0') || ""}
                onChangeText={(value) => handleInputChange('hour', parseInt(value)%24)}
                placeholder="00"
                keyboardType="numeric"
            />
            <Text>
                :
            </Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: '#AAA', width: 30, textAlign: "center", height: 30, fontSize: 24}}
                value={time.min.toString().padStart(2, '0') || ""}
                onChangeText={(value) => handleInputChange('min', parseInt(value)%60)}
                placeholder="00"
                keyboardType="numeric"
            />
            <Text>
                :
            </Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: '#AAA', width: 30, textAlign: "center", height: 30, fontSize: 24}}
                value={time.sec.toString().padStart(2, '0') || ""}
                onChangeText={(value) => handleInputChange('sec', parseInt(value)%60)}
                placeholder="00"
                keyboardType="numeric"
            />
        </View>
    )
}

export default TimeForm;