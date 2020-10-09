import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {

const [text, setText] = useState("Write some text here");

const speak = () => {
Speech.speak(text);
}

  return (
    <View style={styles.container}>
      <TextInput 
        style = {styles.textInput}
        onChangeText = {text => setText(text)}
        value = {text}
          multiline = {true}>
        </TextInput>
        
      <Button 
        onPress={speak} 
        color= "#f06a1d"
        title = "Press to hear text"/>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textInput: {
    fontSize:18,
    width:250,
    height: 100,
    borderWidth: 2,
    borderColor:'#36454f',
    marginBottom:10,
  },
 
});
