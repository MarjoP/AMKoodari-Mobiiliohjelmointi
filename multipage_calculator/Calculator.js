import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


export default function CalculatorScreen({navigation}) {

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
                <Button style={styles.but} type='outline' onPress={add} title="+"/>
                <Button style={styles.but} onPress={substract} title="-"/> 
                <Button style= {styles.but} title='History' onPress={() => 
                    navigation.navigate('History', {list:data})}/>
            </View>

            <StatusBar style="auto" />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
      padding:20,
      backgroundColor: '#fff',
      alignItems:'center',
      justifyContent:'center',
      flex:1,
      backgroundColor:'rgba(231,251,251,1)',
    },
    header: {
      fontSize:20,
      alignItems: 'center',
      justifyContent: 'center',
      height:50,
    },
    res: {
      flex:1,
    },
    inputContainer: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      
    },
    buttoncontainer: {
      flex:3,
      flexDirection:'row',
      alignItems: 'flex-start',
    }, 
    but: {
      flex:1,
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