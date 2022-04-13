// Inbuilt components
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";

// Third-party icons
import Icon from "react-native-vector-icons/MaterialIcons"

// Custom colors object
const COLORS = { primary: "#2ecc71", white: "#ffffff", red: "#e74c3c", dark: "#2c3e50" }

export default function App() {
  // Single todo data
  const [textInput, setTextInput] = useState("")

  // List of todos
  const [todos, setTodos] = useState([
    { id: 1, task: "First Todo", completed: true },
    { id: 2, task: "Second Todo", completed: false },
    { id: 3, task: "Third Todo", completed: true }
  ])

  // Custom ListItem component
  const ListItem = ({ todo }) => {
    return (
      <View style={styles.listItem}>
        <View style={{ flex: 1 }}>
          <Text style={
            {
              fontSize: 15,
              color: COLORS.dark,
              textDecorationLine: todo?.completed ? "line-through" : "none"
            }
          }>{todo?.task}</Text>
        </View>
        <TouchableOpacity style={[styles.actionIcon]} onPress={() => toggleTodoComplete(todo?.id)}>
          {
            todo?.completed && (
              <Icon name="done" size={20} color={COLORS.white} />
            )
          }
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionIcon, { backgroundColor: COLORS.red }]}>
          <Icon name="delete" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View >
    )
  }

  // Function for adding todos
  const addTodo = () => {
    if (textInput) {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false
      }
      setTodos([...todos, newTodo])
      setTextInput("")
    }
    else {
      Alert.alert("Error", "Please enter a todo!")
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <Text style={
          {
            fontWeight: "bold",
            fontSize: 20,
            color: COLORS.primary
          }}>Todo App</Text>
        <Icon name="delete" size={25} color={COLORS.red} />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={todos}
        renderItem={({ item }) => <ListItem todo={item} />}
      />
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Add a todo!"
            value={textInput}
            onChangeText={(text) => setTextInput(text)}
            style={{ height: 50 }}
          />
        </View>
        <TouchableOpacity onPress={addTodo}>
          <View style={styles.iconContainer}>
            <Icon name="add" size={30} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  );
}

// Custom styling
const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  footer: {
    position: "absolute",
    bottom: 0,
    color: COLORS.white,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    elevation: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  listItem: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    borderRadius: 3
  }
});
