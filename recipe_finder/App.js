import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, KeyboardAvoidingView, View, FlatList, TextInput, Button, Image} from 'react-native';

export default function App() {

  const[text, setText] = useState("");
  const[recipes, addResults] = useState([]);

  const findRecipes = () => {
    const url = 'http://www.recipepuppy.com/api/?i=' +text;
    fetch(url)
    .then((response) =>response.json())
    .then((responseJson) => {
      addResults(responseJson.results);
      
    })
    .catch((error) => {
      Alert.alert('Error', error.message);
    });
  }

	
const FlatListItemSeparator = () => {
   return (
     <View
       style={{
         height: .5,
         width: "100%",
         backgroundColor: "#000",
       }}
     />
   );
 }

  return (
  
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput style={{fontSize: 18, width:200, borderColor:'gray', borderWidth:1, marginBottom:5}} value={text}
          placeholder="incredient" onChangeText={(text => setText(text))}/>
        <Button title="FIND" onPress={findRecipes}/>
    </View>
      <View style = {styles.recipes}>
        <FlatList 
        style={{marginLeft:"5%", marginTop:25}} 
          keyExtractor={item => item.href}
          renderItem={({item}) => 
          <View>
            <Text>{item.title}</Text>
            <Image style={styles.thumbnail} source={{uri: item.thumbnail}}/>
          </View>}
          data={recipes}
          ItemSeparatorComponent = {FlatListItemSeparator}/>
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
  },
  recipes: {
    flex:7,
    backgroundColor: 'whitesmoke',
    
  },
  search: {
    flex: 1,
    marginTop:40
  },
  thumbnail: {
    width:50,
    height:50
  }
});
