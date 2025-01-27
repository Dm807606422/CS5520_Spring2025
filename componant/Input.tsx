import { StyleSheet,TextInput, Text, View, Button, Modal, Alert, Image} from 'react-native'
import { useState } from 'react';
import React, { useRef, useEffect} from 'react';

interface InputProps {
  shouldFocus: boolean;
  inputHandler: (data:string) => void;
  modalVisible: boolean;
  onCancel: () => void;
}

export default function Input({ shouldFocus, inputHandler, modalVisible, onCancel}: InputProps) {
    const [text,setText] = useState("");
    const [isFocused, setIsFocused] = useState(shouldFocus);
    const [isConfirmEnabled, setIsConfirmEnabled] = useState(false);

    function handleConfirm() {
      console.log("user has typed", text); 
      inputHandler(text);
      setText(""); 
      setIsConfirmEnabled(false);
    }

    function handleCancel() {
      Alert.alert(
        "Cancel Action",
        "Are you sure you want to cancel?",
        [
          { text: "No", style: "cancel" },
          {
            text: "Yes",
            onPress: () => {
              onCancel();
              setText(""); // Clear the TextInput
              setIsConfirmEnabled(false); // Disable Confirm button
            },
          },
        ]
      );
    }

    function handleTextChange(input: string) {
      setText(input);
      setIsConfirmEnabled(input.length >= 3); // Enable Confirm if input length >= 3
    }


    return (
    <Modal transparent= {true} visible= {modalVisible} animationType='slide'>
      <View style ={styles.container}>
        <View style = {styles.modalContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png" }}
            style={styles.image}
            alt="Network image example"
          />
          <Image
            source={require("C:/Users/dmmao/Desktop/5220/project/spring2025/2617812.png")}
            style={styles.image}
            alt="Local image example"
          />
        </View>
        <TextInput 
          value = {text}
          style={styles.textInput}
          onChangeText ={handleTextChange}
          placeholder='type something'
          autoFocus={shouldFocus}
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)}
        />
        {isFocused && text.length > 0 && (
            <Text>Character count: {text.length}</Text>
          )}
      
      {!isFocused && (
          <Text>
            {text.length >= 3
              ? 'Thank you'
              : 'Please type more than 3 characters'}
          </Text>
        )}
        
        <View style={styles.buttonContainerRow}>
          <View style={styles.buttonContainer}>
              <Button title="Confirm" onPress={handleConfirm } disabled={!isConfirmEnabled}/>
          </View>
          <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={handleCancel} />
          </View>
        </View>
      </View>
      </View>
    </Modal>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 200,
    fontSize: 16,
  },
  text: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  buttonContainerRow: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 10,
  },
  buttonContainer: {
    width: "40%",
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
});