import React, { useContext, useEffect } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import style from "../../style";
import getIcon from "../../function/getIcon";
import { icons } from "../../enum";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { useState } from "react";
import { TriangleColorPicker, fromHsv } from "react-native-color-picker";
import Slider from "@react-native-community/slider";
import { ScrollView } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Button } from "react-native";
import { Modal } from "react-native";
import EventContext from "../../context/EventContext";

function EventTypeForm({ eventType, index, openForm }) {

    const [formData, setFormData] = useState(JSON.parse(JSON.stringify(eventType)));

    const { editEventType, removeEventType } = useContext(EventContext)

    const [showForm, setShowForm] = useState(false);

    const [showColorPicker, setShowColorPicker] = useState(false)

    useEffect(() => {
        if (openForm) {
            setShowForm(true)
        }
    }, [])

    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleColorChange = (color) => {
        setFormData({ ...formData, color: fromHsv(color) })
    }

    const handleSave = async () => {
        await editEventType({ ...formData }, index)
        setShowForm(false)
    }

    const formContent = (
        <View style={{ padding: 5, borderStyle: "solid", borderColor: "#000", backgroundColor: "#DDD", borderRadius: 10 }}>
            <Text style={{ fontSize: 16 }}>
                Type Name:
            </Text>
            <TextInput
                style={{ width: "70%", borderWidth: 1, borderStyle: "solid", borderColor: "#AAA", height: 20, fontSize: 16 }}
                placeholder="Type"
                value={formData.type}
                onChangeText={(value) => handleInputChange('type', value)}
            />
            <Text style={{ fontSize: 16 }}>
                Color: {formData.color} <MaterialIcons name="stop-circle" size={12} color={formData.color} />
            </Text>
            <Button onPress={() => setShowColorPicker(true)} title="Show Picker"></Button>
            <Modal visible={showColorPicker} animationType="slide" style={{ backgroundColor: "#000" }}>
                <TriangleColorPicker onColorChange={handleColorChange} defaultColor={eventType.color} style={{ height: "96%", width: "100%", backgroundColor: "#000" }} />
                <Button onPress={() => setShowColorPicker(false)} title="Close Picker" style={{ position: 'absolute', top: 0 }}></Button>
            </Modal>
            <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
                <AntDesign name="check" size={24} color="black" onPress={handleSave} />
                <AntDesign name="close" size={24} color="black" onPress={() => setShowForm(false)} />
            </View>
        </View>
    )

    return (
        <View style={style.itemBox}>
            <View style={[style.flexRow]}>
                <Text>
                    {getIcon.call(icons, eventType)}
                    {eventType.type}
                </Text>
                {eventType.icon === "" && <View style={style.flexRow}>
                    <MaterialIcons name="edit" size={24} color="black" onPress={() => setShowForm(!showForm)} />
                    <MaterialIcons name="delete" size={24} color="black" onPress={async () => await removeEventType(index)} />
                </View>}
            </View>
            {showForm && formContent}
        </View>
    )
}

export default EventTypeForm;