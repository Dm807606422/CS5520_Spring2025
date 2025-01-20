import { StyleSheet,TextInput, Text, View, Button, Modal } from 'react-native'
import { useState } from 'react';
import React, { useRef, useEffect} from 'react';

interface InputProps {
  shouldFocus: boolean;
  inputHandler: (data:string) => void;
  modalVisible: boolean;
}

export default function Input({ shouldFocus, inputHandler, modalVisible}: InputProps) {
    const [text,setText] = useState("");
    const [isFocused, setIsFocused] = useState(shouldFocus);

    function handleConfirm() {
      console.log("user has typed", text); 
      inputHandler(text);
    }


    return (
    <Modal transparent= {true} visible= {modalVisible} animationType='slide'>
      <View style ={styles.container}>
        <View style = {styles.modalContainer}>
        <TextInput 
          value = {text}
          onChangeText ={setText}
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
        <Button title = "Confirm" onPress = {handleConfirm} />
      </View>
      </View>
    </Modal>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "#eee",
    borderRadius: 10,
  },
});