import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import AddTaskScreen from "./AddTaskScreen";

const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          options={{ name: "Duong", newTask: "" }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="AddTask"
          options={{ name: "", function: Function() }}
          component={AddTaskScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
