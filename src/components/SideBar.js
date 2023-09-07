import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function SideBar() {
    const navigation = useNavigation()

    return (
        <View style={{ backgroundColor: '#CCC', paddingTop: 40, alignContent: "center", height: "100%" }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ alignSelf: "center" }}>
                <Entypo name="home" size={24} color="black" style={{ paddingTop: 15 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EventTypes')} style={{ alignSelf: "center" }}>
                <MaterialIcons name="playlist-add" size={24} color="black" style={{ paddingTop: 15 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PerviousEvents')} style={{ alignSelf: "center" }}>
                <MaterialCommunityIcons name="progress-clock" size={24} color="black" style={{ paddingTop: 15 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Analytics')} style={{ alignSelf: "center" }}>
                <Ionicons name="analytics" size={24} color="black" style={{ paddingTop: 15 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Setting')} style={{ alignSelf: "center" }}>
                <Ionicons name="settings" size={24} color="black" style={{ paddingTop: 15 }} />
            </TouchableOpacity>
        </View>
    )
}

export default SideBar;
