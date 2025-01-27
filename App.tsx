import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './componant/Header';
import Input from './componant/Input';
import React, { useCallback, useState } from 'react';

export default function App() {
  const appName = "Dm App";
  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function handleInputData(data:string) {
    console.log("receive:", data);
    setReceivedData(data);
    setModalVisible(false);
    
  }

  const handleCancel = () => {
    console.log("Modal dismissed.");
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.topContainer}>
      <Header name = {appName}/>
      <Input  shouldFocus={true} inputHandler = {handleInputData} modalVisible = {modalVisible}/>

      <Button  title = "Add Goal" onPress = {() => setModalVisible(true)} />
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