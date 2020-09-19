import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Picker } from 'react-native';
//import {Picker} from '@react-native-community/picker';

export default function App() {
  
  const[text, setText]=useState('');
  const[convRates, setRates] = useState({});
  const[input, setInput] = useState('');
  const [result, setResult] = useState('');

  const convert = () => {
    let calculation = (Number(text)/Number(convRates[input])).toFixed(2);
    setResult(calculation);
  }

  useEffect(() => {
 const getRates = () => {
    const url = 'http://data.fixer.io/api/latest?access_key=826726424fcf1f6927c6d496220a7b0f';
    fetch (url)
    .then((response) => response.json())
    .then((responseJson) => {
     setRates(responseJson.rates);
    });    
  };
  getRates();
}, [] );

//api key: 826726424fcf1f6927c6d496220a7b0f

    return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={{fontSize:30, fontWeight:'bold', marginTop:40}}>Euro converter</Text>
        <Image style={{height:150, width: 150, marginBottom:20}} source ={require('./Picture1.png')}/>
      </View>

      <View style={styles.bottom}>
        <Text style ={{fontSize:20, marginBottom:20}}>{"Conversion result: \t" + result.toString() + " " +'\u20AC'}</Text>

      <View style={styles.next}>
        <View style={styles.inputAndButton}>
          <View style={styles.textIp}>
            <TextInput
              style={{fontSize:18, width:100, height:50, borderWidth:1, borderColor:'gray', marginBottom:10}}
              value = {text}
              keyboardType='number-pad'
              onChangeText = {(text) => setText(text)}/>
          <View style={styles.btn}>
            <Button title = 'Convert' onPress={convert}/>
          </View>    
        </View>
        </View>      
          
        <View style={styles.picker}>
          <Picker
            selectedValue={input}
            style={{height: 50, width: 100}}
            onValueChange={(itemValue, itemIndex) =>
            setInput(itemValue)}>
             <Picker.Item value='' label='Currency' /> 
              {Object.keys(convRates).map((key) => {
              return( <Picker.Item label={key} value={key} key={key}/>)
            })}      
          </Picker>
        </View>

     </View>     
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:350,
  },
  inputAndButton: {
    flex:0.5,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    width:120
  },
  top: {
    flex:0.5,
    marginBottom:10
  },
  bottom: {
    flex:1,
    flexDirection:'column'
  },
  picker: {
    flex:0.4,
    alignItems:'flex-end'
  },
  next: {
    width:300,
    flexDirection:'row',
  }

});
