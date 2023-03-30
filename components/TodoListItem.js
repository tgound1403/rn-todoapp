import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";
import { Icon } from "react-native-elements";

const TodoListItem = ({ item, onToggle, onDelete }) => {
  const colorFollowPrioritize = (priority) => {
    if (priority == 1) {
      return "red";
    } else if (priority == 2) {
      return "gold";
    } else return "";
  };

  return (
    <View style={styles.todoItem}>
      <CheckBox
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={item.completed}
        onPress={() => onToggle(item.id)}
        containerStyle={styles.checkbox}
        checkedColor={colorFollowPrioritize(item.prioritize)}
        uncheckedColor={colorFollowPrioritize(item.priority)}
      />
      <Text style={[styles.todoTitle, item.completed && styles.completed]}>
        {item.title}
      </Text>
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Icon type="ionicon" color="skyblue" name="trash-outline" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#fff",
    shadowColor: "grey",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
  },
  checkbox: {
    padding: 0,
    marginRight: 8,
    marginLeft: 0,
  },
  todoTitle: {
    flex: 1,
    fontSize: 16,
    textDecorationLine: "none",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "lightgrey",
  },
});

export default TodoListItem;
