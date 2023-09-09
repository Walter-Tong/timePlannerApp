import 'react-native-gesture-handler';
import { View } from 'react-native';
import { EventProvider } from './src/context/EventContext';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import SideBar from './src/components/SideBar';
import EventTypesScreen from './src/screens/EventTypesScreen';
import PerviousEventsScreen from './src/screens/PerviousEventsScreen';
import SettingScreen from './src/screens/SettingScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';

export default function App() {
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <EventProvider>
        <View style={{ flexDirection: "row", height: "100%" }}>
          <View style={{ flex: 1 }}>
            <SideBar />
          </View>
          <View style={{ flex: 5 }}>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />
              <Stack.Screen name="EventTypes" component={EventTypesScreen} options={{ headerShown: false }} />
              <Stack.Screen name="PerviousEvents" component={PerviousEventsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Analytics" component={AnalyticsScreen} options={{headerShown: false}} />
            </Stack.Navigator>
          </View>
        </View>
      </EventProvider>
    </NavigationContainer>
  );
}