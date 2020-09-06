import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, Text, View, TextInput, Button, Alert, Keyboard } from 'react-native';



export default function App() {
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [result, setResult] = useState('');

  const add = () => {
    let result = Number(text) + Number(text2);
    setResult("Result: " +result);
  }

  const substract = () => {
    let result = Number(text) - Number(text2);
    setResult("Result: " +result);
  }

  return (
    <View style={styles.container}>

      <Text>Calculator</Text>
      <Text>{result}</Text>
      <TextInput
        style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setText(text)}
        text={text}
        keyboardType={'number-pad'}
      />
      <TextInput
        style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text2 => setText2(text2)}
        text2={text2}
        keyboardType={'number-pad'}
      />
      
      <View style={styles.buttons}>

        <View style={{padding:10}}>
          <Button onPress={add} title="+" />
        </View>

        <View style={{padding:10}}>
        <Button onPress={substract} title="-" />
        </View>
      </View> 
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    padding:20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    
  },

});
