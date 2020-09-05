import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableWithoutFeedback, Button, Alert } from 'react-native';


export default function App() {
  const [guess, addGuess] = useState('');
  const [guessCount, setCount] = useState(1);
  const [correctAnswer, setAnswer] =useState(Math.floor(Math.random()*100)+1);
  const [evaluation, setEvaluationText]=useState('');

  const setRandomNumber = () => {
    let number = Math.floor(Math.random()*100)+1;
    setAnswer(number);
    console.log('number', number);
  };
  const startAgain = () => {
    addGuess('');
    setRandomNumber();
    setCount(1);
    setEvaluationText('');
  }
  const showAlert = () => {
    Alert.alert('You guessed the number in ' +guessCount +' guesses');
  }

  const checkGuessedNumber = () => {
    setCount(guessCount+1);
   
    if(Number(guess)<correctAnswer) {
      var txt = 'Your guess ' +guess +' is too low';
      addGuess('');
    } else if (Number(guess)>correctAnswer){
      var txt = 'Your guess ' +guess +' is too high';
      addGuess('');
    } else if (Number(guess)==correctAnswer) {
      var txt = 'Correct!';
      showAlert();
    }
    setEvaluationText(txt);
};

    return (
    <View style={styles.container}>
      <Text style={styles.text}>Guess a number between 1-100</Text>
      <Text style={styles.text}>{evaluation}</Text>
      <TextInput style={styles.txtInput} onChangeText={text =>addGuess(text)} keyboardType={"number-pad"} value={guess}></TextInput>
      <View style={styles.buttonholder}>
        <Button title="Make a guess" onPress={checkGuessedNumber} style={styles.button}/>
      </View>
      <View style={styles.buttonholder}>
        <Button title="New game" onPress={startAgain} style={styles.button}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );

  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(139,231,206,1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize:24,
    padding: 15,
  },
  txtInput: {
    width:100,
    height:50,
    borderColor:"darkgray",
    borderWidth:2,
    backgroundColor:"white",
    marginBottom:15,
    fontSize:24,
    textAlign:'center',
  },
  
  buttonholder: {
    marginBottom:40,
    backgroundColor:'red',
  }
});
