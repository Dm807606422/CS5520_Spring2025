import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './componant/Header';
import Input from './componant/Input';

export default function App() {
  const appName = "Dm App";
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name = {appName}/>
      <Input />
      
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
