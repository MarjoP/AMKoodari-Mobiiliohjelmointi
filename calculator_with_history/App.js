import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, FlatList } from 'react-native';

export default function App() {
  
const [first, setFirst] = useState('');
const [second, setSecond] = useState('');
const [result, setResult] = useState('');
const [data, setData] = useState([{key:'History'}]);

const add = () => {
  let answer = Number(first) + Number(second);
  setResult("Result: " +answer);
  let calculation = first +" + " +second +" = " +answer;
  setData([...data, {key:calculation}]);
  setFirst('');
  setSecond('');
}

const substract = () => {
  let answer = Number(first) - Number(second);
  setResult("Result: " +answer);
  let calculation = first +" - " +second +" = " +answer;
  setData([...data, {key:calculation}]);
  setFirst('');
  setSecond('');
}

  return (
    <View style={styles.container}>
     
        <Text style ={styles.header}>Calculator with history</Text>
      
      <Text>{result}</Text>

      <TextInput style= {styles.txtInput} onChangeText={text => setFirst(text)} value={first} keyboardType={'number-pad'}/>
      <TextInput style= {styles.txtInput} onChangeText={text => setSecond(text)} value={second} keyboardType={'number-pad'}/>
      
      <View style={styles.buttoncontainer}>
        <View style={styles.button} >
          <Button style = {{borderColor:'darkgray', borderWidth:1}} onPress={add} title="+"/>
        </View>
        <View style={styles.button}>
          <Button onPress={substract} title="-"/>
        </View>
      </View>

      <View style={styles.hist}>
        <FlatList style={styles.flatlist} data={data} renderItem={({item}) =>
        <Text>{item.key}</Text>
        }/>
      </View>

      <StatusBar style="auto" />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    padding:100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:400,
    flex:1,
  },
  header: {
    fontSize:20,
    margin:10,
    height:100,
  },
  buttoncontainer: {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
  }, 
  button: {
  padding:10,
  height:50,
  width:50,
  },
  txtInput: {
    borderColor:'darkblue',
    borderWidth:1,
    width:200,
    height:50,
    margin:10,
  },
  hist: {
    marginTop:70,
  }
});
