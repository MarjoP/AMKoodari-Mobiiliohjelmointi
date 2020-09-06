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
      
      <View  style ={styles.header}>
       <Text>Calculator with history</Text>
       <Text>{result}</Text>
      </View>



      <View style={styles.inputContainer}>
        <TextInput style= {styles.txtInput} onChangeText={text => setFirst(text)} value={first} keyboardType={'number-pad'}/>
        <TextInput style= {styles.txtInput} onChangeText={text => setSecond(text)} value={second} keyboardType={'number-pad'}/>
      </View>

      <View style={styles.buttoncontainer}>
          <Button style={styles.but} onPress={add} title="+"/>
          <Button style={styles.but} onPress={substract} title="-"/> 
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
    padding:20,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center',
    flex:1,
  },
  header: {
    fontSize:20,
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
  },
  res: {
    flex:1,
  },
  inputContainer: {
    flex:2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttoncontainer: {
    flex:1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
  }, 
  but: {
    height:50,
    width:50,
  },
  txtInput: {
    borderColor:'darkblue',
    borderWidth:1,
    width:200,
    height:50,
    margin:10,
    flex:1,
  },
  hist: {
    flex:5,
    marginTop:70,
  }
});
