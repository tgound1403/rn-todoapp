import { useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Button,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import "./HomeScreen.js";
import { Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Notifications } from "expo";

const AddTaskScreen = ({ navigation, route }) => {
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [priorityValue, setPriorityValue] = useState(null);
  const [priority, setPriority] = useState([
    { label: "Urgent 🔥", value: "1" },
    { label: "Normal 😄", value: "2" },
    { label: "Slowly 🧘🏻‍♂️", value: "0" },
  ]);

  const [newTodo, setNewTodo] = useState("");

  const [dateTime, setDateTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handlePickerChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateTime;
    setShowPicker(Platform.OS === "ios");
    setDateTime(currentDate);
  };

  const handleReminder = async () => {
    if (Platform.OS === "android") {
      setShowPicker(true);
    }
    try {
      const result = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Task Reminder",
          body: "Do not forget to complete your task!",
          data: { task: "example task" },
        },
        trigger: { date: dateTime },
      });
      console.log("Scheduled notification ID:", result);
    } catch (e) {
      console.log("Error scheduling notification:", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.welcome}>{route.params.name}'s new task</Text>
      <View style={styles.addTodo}>
        <TextInput
          style={styles.input}
          placeholder="Add a todo item"
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}
        />
        <View style={styles.dropdownPriority}>
          <DropDownPicker
            style={styles.dropdown}
            open={priorityOpen}
            value={priorityValue} //priorityValue
            items={priority}
            setOpen={setPriorityOpen}
            setValue={setPriorityValue}
            setItems={setPriority}
            placeholder="Select priority"
            placeholderStyle={styles.placeholderStyles}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>
        <View>
          <Button title="Select Date and Time" onPress={handleReminder} />
          {showPicker && (
            <DateTimePicker
              value={dateTime}
              mode="datetime"
              display="default"
              onChange={handlePickerChange}
            />
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Icon
          reverse
          name="chevron-back-outline"
          type="ionicon"
          onPress={() => navigation.navigate("Home")}
          color="skyblue"
        />
        <Icon
          reverse
          name="add"
          type="ionicon"
          onPress={() => {
            route.params.function(newTodo, priorityValue);
            navigation.navigate("Home");
          }}
          color="skyblue"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aliceblue",
    paddingHorizontal: 20,
    paddingVertical: 48,
    justifyContent: "space-between",
  },
  welcome: {
    fontSize: 44,
    fontWeight: "700",
    marginBottom: 64,
    marginTop: 32,
  },

  addTodo: {},

  input: {
    borderWidth: 2,
    borderColor: "skyblue",
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  dropdownPriority: {
    marginVertical: 10,
    width: "50%",
  },
  dropdown: {
    borderColor: "skyblue",
    borderWidth: 2,
    height: 60,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  placeholderStyles: {
    color: "grey",
  },
  button: {
    borderRadius: 50,
  },
});

export default AddTaskScreen;
