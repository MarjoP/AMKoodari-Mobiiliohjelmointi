import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, FlatList} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Input, Button, ListItem, Icon} from 'react-native-elements';

const db = SQLite.openDatabase('shoppinglist3.db');


export default function App() {

const[text, setText] = useState("");
const[amount, setAmount] = useState("");
const[shList, addToList] = useState([]);

useEffect(() => {
  db.transaction(tx => {
    tx.executeSql('create table if not exists shList (id integer primary key not null, text text, amount text);');
  },(error => {console.log("error" +error)}), updateList)
}, []);

const saveItem = () => {
  db.transaction(tx => {
    tx.executeSql('insert into shList (text, amount) values (?, ?);',
      [text, amount]);
  }, (error => {console.log("error" +error)}), updateList);
setText("");
setAmount("");
}

const updateList= () => {
  db.transaction(tx => {
    tx.executeSql('select * from shList;', [], (_, { rows }) => addToList(rows._array)
    );
  });
  console.log(shList);
}

const deleteItem = (id) => {
  db.transaction(
    tx => { tx.executeSql('delete from shList where id = ?;', [id]);
  },null, updateList
  )
}
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
      <Header 
      centerComponent = {{text: 'SHOPPING LIST', style: {color: '#fff', fontSize:18}}}
      containerStyle={{
        backgroundColor: '#080259',
        marginBottom: 50,
        height:60,
      }}
      />

      <View style={styles.inputCont}>
        <Input placeholder="item"
        containerStyle={{width:250}}
        onChangeText={text => setText(text)} value={text}></Input>
        <Input placeholder="amount" 
        containerStyle={{width:250}}
        onChangeText={amount => setAmount(amount)} value={amount}></Input>
        <Button title="Save" 
        buttonStyle = {{backgroundColor: '#3e02b5', width:100}}
        onPress={saveItem}></Button>
      </View>

      <View style={styles.outputCont}>
        <FlatList
          keyExtractor={item => item.id.toString()} 
          renderItem={({item, index}) =>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={{fontWeight:'bold'}}>{item.text}</ListItem.Title>
              <ListItem.Subtitle style = {{color:'#4f4e4d'}}>{item.amount}</ListItem.Subtitle>
            </ListItem.Content>
          <ListItem.Title style={{color: '#7a7978', fontSize:16}}>Bought</ListItem.Title>
          <ListItem.Chevron size='28' color='#9e0012' onPress={() => deleteItem(item.id)}></ListItem.Chevron>
         </ListItem>
          }
          data={shList}
        />
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
    marginBottom:60,
  },

  outputCont: {
     marginTop:20,
    flex:4,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-start',
    width:300,
  },
  listcontainer: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
 
});
