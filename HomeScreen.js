import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { Icon } from "react-native-elements";
import TodoListItem from "./components/TodoListItem";

const HomeScreen = ({ navigation, route }) => {
  const [todoItems, setTodoItems] = useState([
    {
      id: 1,
      title: "Create Basic RN Todolist Layout",
      priority: "0",
      completed: true,
    },
    {
      id: 2,
      title: "Add function to set reminder",
      priority: "2",
      completed: false,
    },
    {
      id: 3,
      title: "Add function to prioritize task",
      priority: "1",
      completed: false,
    },
  ]);

  const handleToggle = (id) => {
    setTodoItems((prevTodoItems) =>
      prevTodoItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDelete = (id) => {
    setTodoItems((prevTodoItems) =>
      prevTodoItems.filter((item) => item.id !== id)
    );
  };

  const handleAddTodo = (newTodo, priority) => {
    setTodoItems((prevTodoItems) => [
      ...prevTodoItems,
      { id: Date.now(), title: newTodo, completed: false, priority: priority },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.iconButtonGroup}>
        <Icon name="menu" type="ionicon" color="steelblue" />

        <Icon name="search" type="ionicon" color="steelblue" />
      </View>
      <Text style={styles.welcome}>What's up Duong!</Text>
      <Text style={styles.today}>TODAY'S TASKS</Text>
      <FlatList
        data={todoItems}
        renderItem={({ item }) => (
          <TodoListItem
            item={item}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Icon
        reverse
        name="add"
        type="ionicon"
        color="skyblue"
        onPress={() =>
          navigation.navigate("AddTask", {
            name: "Duong",
            function: handleAddTodo,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aliceblue",
    paddingHorizontal: 20,
    paddingVertical: 44,
  },

  welcome: {
    fontSize: 44,
    fontWeight: "700",
    marginBottom: 64,
    marginTop: 32,
  },
  today: {
    color: "lightgrey",
    marginBottom: 8,
  },
  iconButtonGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default HomeScreen;
