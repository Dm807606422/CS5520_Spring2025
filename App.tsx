import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import Header from "./componant/Header";
import Input from "./componant/Input";
import { useState } from "react";
import GoalItem from "./componant/GoalItem";

export interface Goal {
  id: number;
  text: string;
}
export default function App() {
  const appName = "My Awesome App";
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  function handleDeleteGoal(deletedId: number) {
    //which goal was deleted?
    //I need to update the goals array by removing the goal
    //filter out the goal with the id that was passed

    setGoals((prevGoals) => {
      return prevGoals.filter((goalObj) => {
        return goalObj.id !== deletedId;
      });
    });
  }
  function handleInputData(data: string) {
    // this function will receive data from Input
    console.log("data received from Input ", data);
    //store the data in the state variable
    // setReceivedData(data);
    //close the modal
    // define a variable of type Goal object
    let newGoal: Goal = { text: data, id: Math.random() };
    //update it with the data received from Input and a random number
    // add the object to the goals array
    // use updater function in setState whenever you are
    // updating the state based on the previous state
    setGoals((currGoals) => {
      return [...currGoals, newGoal];
    });
    setIsModalVisible(false);
  }
  function dismissModal() {
    setIsModalVisible(false);
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topContainer}>
        <Header name={appName} />
        <Input
          textInputFocus={true}
          inputHandler={handleInputData}
          modalVisible={isModalVisible}
          dismissModal={dismissModal}
        />
        <Button title="Add a Goal" onPress={() => setIsModalVisible(true)} />
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          contentContainerStyle={styles.centeredHorizontal}
          data={goals}
          renderItem={({ item }) => {
            //pass the received item to GoalItem component as a prop
            return <GoalItem goalObj={item} deleteHandler={handleDeleteGoal} />;
          }}
        />
        {/* <ScrollView contentContainerStyle={styles.centeredHorizontal}>
          {goals.map((goalObj) => {
            return (
              <View key={goalObj.id}>
                <Text style={styles.text}>{goalObj.text} </Text>
              </View>
            );
          })}
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: "#dcd",
    // alignItems: "center",
  },

  centeredHorizontal: {
    alignItems: "center",
  },
});