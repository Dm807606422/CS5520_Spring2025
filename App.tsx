import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button, SafeAreaView } from "react-native";
import Header from "./componant/Header";
import Input from "./componant/Input";
import { useState } from "react";

export default function App() {
  const appName = "My Awesome App";
  //define a state variable to store the data from Input
  const [receivedData, setReceivedData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  function handleInputData(data: string) {
    // this function will receive data from Input
    console.log("data received from Input ", data);
    //store the data in the state variable
    setReceivedData(data);
    //close the modal
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
        />
        <Button title="Add a Goal" onPress={() => setIsModalVisible(true)} />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={{ backgroundColor: "pink" }}>{receivedData}</Text>
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
  bottomContainer: { flex: 4, backgroundColor: "#dcd", alignItems: "center" },
});