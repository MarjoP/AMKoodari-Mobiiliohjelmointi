import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, SectionList } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import { Button } from 'react-native-elements';

const db = SQLite.openDatabase('memoryGameScores1.db');  

export default function ScoreScreen() {

const[cgScores, setcgScores] = useState([]);

const [levelHeader, setLevelHeader] = useState();

useEffect(() => {

}, [])


const getEasyScores = () => {
  db.transaction(tx => {
    tx.executeSql('select * from classicGameScores where level="Easy" order by score limit 20;',[], (_, { rows }) => 
    setcgScores(rows._array));
  },(error => {console.log("could not get cards" +error)}));

setLevelHeader('Classic Easy')
}

const getMediumScores = () => {

  db.transaction(tx => {
    tx.executeSql('select * from classicGameScores where level="Medium" order by score limit 20;',[], (_, { rows }) => 
    setcgScores(rows._array));
  },(error => {console.log("could not get cards" +error)}));
  setLevelHeader('Classic Medium')
}
const getHardScores = () => {
  db.transaction(tx => {
    tx.executeSql('select * from classicGameScores where level="Hard" order by score limit 20;',[], (_, { rows }) => 
    setcgScores(rows._array));
  },(error => {console.log("could not get cards" +error)}));
  setLevelHeader('Classic Hard')
}
const getRepeatScores = () => {
  db.transaction(tx => {
    tx.executeSql('select * from repeatGameScores order by score desc limit 20;',[], (_, { rows }) => 
    setcgScores(rows._array));
  },(error => {console.log("could not get cards" +error)}));
  setLevelHeader('Repeat game')
}

const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#db9cd2",
          marginLeft: "0%"
        }}
      />
    );
  };

  
return (
<View style = {styles.container}>
<Text style={{fontSize:24, fontWeight:'600', color: '#140b42', marginTop:10, marginBottom:10}}>TOP 20 RESULTS</Text>

<View style={styles.buttonGroup}>
<Button 
  onPress={getEasyScores}
  title="Classic Easy"
  buttonStyle={{backgroundColor:"#f5e942", width:85, height:70, borderRightWidth:2, borderBottomWidth:2, borderColor:'black' }}
  titleStyle={{color:'black'}}
  containerStyle={{margin:3}}
  raised={true}
  />
<Button 
  onPress={getMediumScores}
  title="Classic Medium"
  buttonStyle={{backgroundColor:"#f5e942", width:85, height:70, borderRightWidth:2, borderBottomWidth:2, borderColor:'black' }}
  titleStyle={{color:'black'}}
  containerStyle={{margin:3}}
  raised={true}
  />
<Button 
  onPress={getHardScores}
  title="Classic Hard"
  buttonStyle={{backgroundColor:"#f5e942", width:85, height:70, borderRightWidth:2, borderBottomWidth:2, borderColor:'black' }}
  titleStyle={{color:'black'}}
  containerStyle={{margin:3}}
  raised={true}
  />
<Button 
  onPress={getRepeatScores}
  title="Repeat Game"
  buttonStyle={{backgroundColor:"#f5e942", width:85, height:70, borderRightWidth:2, borderBottomWidth:2, borderColor:'black' }}
  titleStyle={{color:'black'}}
  containerStyle={{margin:3}}
  raised={true}
  />

</View>


<View style={styles.classicResults}>
  <View style>
    <Text style={{fontSize:18, fontWeight:'600', color: '#140b42', marginBottom:3}}>{levelHeader}</Text>
  </View>

        <View style={styles.listcontainerHeader}>
          <Text style={{ fontSize: 16, fontWeight: '600', paddingTop: 3, flex:2}}>Rank</Text>
          <Text style={{ fontSize: 16, fontWeight: '600', paddingTop: 3, flex:4}}>Player</Text>
          <Text style={{ fontSize: 16, fontWeight: '600', paddingTop: 3, flex:2}}>Score</Text>
          <Text style={{ fontSize: 16, fontWeight: '600', paddingTop: 3, flex:3}}>Date</Text>
        </View>
   
          <View style={styles.results}>
            <FlatList 
            style={{flex:1}}
            keyExtractor={item => item.id.toString()} 
            renderItem={({item, index}) => 
            <View style={styles.listcontainer}>
               <View style={{flex:2}}>
                  <Text style={{fontWeight:'600'}}>#{index+1} </Text>
                </View>
                <View style={{flex:4, }}>
                  <Text>{item.player}</Text>
                </View> 
                <View style={{flex:2}}>
                  <Text>{item.score} </Text>
                </View> 
                <View style={{flex:3}}>
                  <Text>{item.date} </Text>
                </View>
            </View>} 
            data={cgScores} 
            ItemSeparatorComponent={listSeparator} 
          />
          </View>
    </View>

</View>
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#04de00',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonGroup: {
      flex:1,
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'center'
    },
    listcontainer: {
      width:350,
      flexDirection:'row',
      paddingLeft:10,
      paddingRight:10,
      backgroundColor:'#f0f0f0',
      borderWidth:1,
      borderColor:'#140b42'
    },
    listcontainerHeader: {
      width:350,
      flexDirection:'row',
      paddingLeft:10,
      paddingRight:10,
      backgroundColor:'#eb056c',
    
    },
    classicResults: {
      flex:4,
      alignItems:'flex-start',
      justifyContent:'flex-start',
      margin:2,
    },
     results: {
      alignItems:'center',
      flex:1,
      width:350,
    },
    repeatResults: {
      flex:1,
    },

    modal: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'
    },
    modalText: {
        fontSize:40,
        textAlign:'center',
        justifyContent:'center',  
    },
    inputCont: {
        paddingTop:15,
        flex:1,
    },
    dropdowns: {
        flex:1,
     
        width: 350,
        flexDirection:'row',
    }
  });