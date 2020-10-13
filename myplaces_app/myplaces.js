import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard, FlatList, Dimensions } from 'react-native';
import { Input, Button, ListItem,  } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('MyPlaces.db');

export default function myplacesScreen({ navigation}) {

const [text, setText] = useState('');
const [list, addToList] = useState([]);

useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists places (id integer primary key not null, address text);');
    },(error => {console.log("error" +error)}), updateList)
  }, []);

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into places (address) values (?);',
        [text]);
    }, (error => {console.log("error" +error)}), updateList);
  setText("");
  }
  
  const updateList= () => {
    db.transaction(tx => {
      tx.executeSql('select * from places;', [], (_, { rows }) => addToList(rows._array)
      );
    });
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => { tx.executeSql('delete from places where id = ?;', [id]);
    },null, updateList
    )
  }


  return (

    <View style={styles.container}>
 
        <Input 
        placeholder="Type in address"
        containerStyle={{width:300}} onChangeText={text => setText(text)} value={text}></Input>
        <Button title="Add" buttonStyle = {{width:200}} onPress={saveItem}></Button>
  
      <View style={styles.list}>
      <FlatList
          keyExtractor={item => item.id.toString()} 
          renderItem={({item}) =>
          <ListItem bottomDivider 
          onPress={() => navigation.navigate('Map', {place: item.address})}
          onLongPress={ () => deleteItem(item.id)}>
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:'bold'}}>{item.address}</ListItem.Title>
            </ListItem.Content>
          <ListItem.Title style={{color: '#7a7978', fontSize:14}}>Show on map</ListItem.Title>
          <ListItem.Chevron color='#9e0012' ></ListItem.Chevron>
         </ListItem>
          }
          data={list}
        />
    </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop:10,
  },

  list: {
      marginTop:10,
    flex:1,
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'flex-start',
  }
});

