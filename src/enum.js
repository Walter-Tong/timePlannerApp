import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const EVENTTYPES = "eventTypes";
const EVENTS = "events";
const DURINGEVENT = "duringEvent";
const icons = {
    game: <Ionicons name="game-controller" size={24}/>,
    study: <Entypo name="book" size={24} />,
    lecture: <FontAwesome5 name="chalkboard-teacher" size={24} />,
    social: <Ionicons name="people-circle-sharp" size={24} />,
    youtube: <AntDesign name="youtube" size={24} />,
    gym: <FontAwesome5 name="running" size={24} />,
    coding: <AntDesign name="codesquare" size={24} />,
    meal: <Ionicons name="fast-food" size={24} />,
    bath: <FontAwesome5 name="bath" size={24} />,
    sleep: <MaterialCommunityIcons name="power-sleep" size={24} />,
    transport: <FontAwesome name="car" size={24} />
    
}

export {EVENTS, EVENTTYPES, DURINGEVENT, icons}