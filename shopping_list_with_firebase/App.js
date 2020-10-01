import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, FlatList, Button } from 'react-native';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBhfbAv-ZXuuvba_Ktono-mX6cC6mo0ECw",
  authDomain: "shopping-list-7c8c7.firebaseapp.com",
  databaseURL: "https://shopping-list-7c8c7.firebaseio.com",
  projectId: "shopping-list-7c8c7",
  storageBucket: "shopping-list-7c8c7.appspot.com",
  messagingSenderId: "528055328752",
  appId: "1:528055328752:web:1e00966554a42d93548735",
  measurementId: "G-BGF7VJFN45"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {

const[text, setText] = useState("");
const[amount, setAmount] = useState("");
const[shList, addToList] = useState([]);

const saveItem = () => {
  firebase.database().ref('shList/'+newKey).push({
    'text': text, 'amount': amount
  });
 setText("");
 setAmount("");
 }

useEffect(() =>  {
 firebase.database().ref('shList/').on('value', snapshot => {
   const data = snapshot.val();
   const prods=Object.values(data);
   addToList(prods);
   console.log(shList);
   console.log("start");
 });
}, []);


const listSeparator = () => {
  return (
    <View
      style={{
        height: 5,
        width: "80%",
        backgroundColor: "#fff",
        marginLeft: "10%"
      }}
    />
  );
}
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      

      <View style={styles.inputCont}>
      <Text style={{fontSize:22}}>Shopping list</Text>
        <TextInput style={styles.textInput} placeholder="item" onChangeText={text => setText(text)} value={text}></TextInput>
        <TextInput style={styles.textInput} placeholder="amount" 
        onChangeText={amount => setAmount(amount)} value={amount} keyboardType="numeric"></TextInput>
        <Button style={styles.button} title="Save" onPress={saveItem}></Button>
      </View>

      <View style={styles.outputCont}>
      <FlatList
      keyExtractor={item => item.toString()} 
      renderItem={({item}) =>
        <View style={styles.listcontainer}>
          <Text style={{fontSize:22}}>{item.text}, {item.amount}</Text>
      </View>}
      data={shList}
      ItemSeparatorComponent={listSeparator}/>

      </View>
    
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputCont: {
 
    paddingTop:20,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    paddingBottom:20,
  },
  textInput: {
    marginBottom:3,
    marginTop:5,
    fontSize:20,
    width:200,
    borderWidth:1,
    borderColor:'gray',
    paddingBottom:3,
  },
  outputCont: {
    paddingTop:10,
    flex:4,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-start',
  },
  listcontainer: {
    flexDirection:'row',
    justifyContent:'center'
  },
  delete: {
    color:'red',
    fontSize:20,
    paddingLeft:15,
  }
});
