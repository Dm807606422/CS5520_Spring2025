import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './componant/Header';
import Input from './componant/Input';
import React, { useCallback, useState } from 'react';

export default function App() {
  const appName = "Dm App";

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name = {appName}/>
      <Input  shouldFocus={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
