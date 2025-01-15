import { StyleSheet,TextInput, Text, View } from 'react-native'
import { useState } from 'react';
import React, { useRef, useEffect} from 'react';

interface InputProps {
  shouldFocus: boolean;
}

export default function Input({ shouldFocus }: InputProps) {
    const [text,setText] = useState("");
    const [isFocused, setIsFocused] = useState(shouldFocus);


    return (
    <View>
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
    </View>
  )
}

const styles = StyleSheet.create({
})