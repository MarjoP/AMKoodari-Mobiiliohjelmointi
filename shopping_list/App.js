import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Button } from 'react-native';

export default function App() {

const [text, setText] = useState('');
const [list, addToList] = useState([]);

const addPressed = () => {
    addToList([...list, {key:text}]);
    setText('');
}
const clearList = () => {
  addToList([]);
}

  return (

    <View style={styles.all}>
      <View style={styles.container}>
        <Text style={{fontSize:22}}>Add items on shopping list</Text>
      </View>

      <View style={styles.txtInput}>
        <TextInput style={{width:300, height:70, borderWidth:2, borderColor:'darkgreen', backgroundColor:'white', fontSize:18}} 
        onChangeText={text => setText(text)} value={text}></TextInput>
      </View>

      <View style={styles.buttons}>
        <Button style={styles.but} title="Add" color='green' onPress={addPressed}></Button>
        <Button style={styles.but} title="Clear" color='rgba(245,34,25,1)' onPress={clearList}></Button>
      </View>

      <View style={styles.list}>
        <Text style={{fontSize:20, color:'rgba(1,26,8,1)', fontWeight: 'bold'}}>Shopping list</Text>
        <FlatList data={list} renderItem={({item}) =>
            <Text style={{fontSize:18}}>{item.key}</Text>}/>
      </View>

      <StatusBar style="auto" />
    </View>
  );

}

const styles = StyleSheet.create({
  all: {
    flex:1,
    padding:10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'rgba(104,248,116,1)',
    marginTop:10,
  },
  txtInput: {
    flex:1,
    backgroundColor:'rgba(104,248,116,1)',
    textAlign:'center',
    justifyContent: 'center', 
    alignItems: 'center',
    fontSize:16,
  },
  buttons: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(104,248,116,1)',
    flexDirection:'row',
    justifyContent:'space-around',
    
  },
  but: {
    width:70,
    height:70,
  },
  list: {
    flex:4,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(77,187,107,0.7)',
  }
});

