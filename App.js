import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/home_screen";
import EventScreen from './screens/event_screen';
import CreateEventScreen from './screens/create_event_screen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Event" component={EventScreen} />
        <Stack.Screen name="CreateEvent" component={CreateEventScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
