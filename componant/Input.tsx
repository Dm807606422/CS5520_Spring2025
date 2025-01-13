import { StyleSheet,TextInput, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react';

export default function Input() {
    const [text,setText] = useState("");
    function updateText(changedText:string) {

    setText(changedText);
    }
    return (
    <View>
    <TextInput 
       value ={text} 
       onChangeText ={updateText}
       placeholder='type something'
     />
    </View>
  )
}

const styles = StyleSheet.create({})