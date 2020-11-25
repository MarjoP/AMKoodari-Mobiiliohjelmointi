import React, { useState, useEffect} from 'react';
import {StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import { Input, Button, Tooltip, Icon } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function ClassicScreen({ navigation }) {
 const [player, setPlayer]=useState('');
 const [theme, selectTheme] = useState('');
 const [difficulty, selectDifficulty] = useState('');
 const [cards, setThemeCards] =useState([]);
 const [data, setArr] = useState([]);

 //siirtyminen pelinäkymään jos teema ja vaikeusaste on valittu
const startGame = () => {
    if(player =='')
    {
        setPlayer('anonymous');
    }
    if(theme != '' && difficulty != '' && cards.length!=0)
    {
        goToGame();
    } else
    {
        Alert.alert("Theme and difficulty need to be selected first!");
    }
}

function goToGame() {
    navigation.navigate('ClassicGame', {player: {player}, theme: {theme}, difficulty: {difficulty}, cards: {cards}});
}

//haetaan kortit (30 kpl) valitun teeman perusteella 
function getThemeCards (selectedTheme) {
    selectTheme(selectedTheme);
    var url = '';
    var helperArray =[];
   
    if (selectedTheme.label == 'Pokemon')
    {   
        for(var i=1; i<31; i++)
           {
               var arra = [];
               url = 'https://pokeapi.co/api/v2/pokemon/'+i;
               fetch(url)
               .then((response) => response.json())
               .then((responseJson) => {
                  var imgPath=responseJson.sprites.front_default.toString();
             
                  arra.push({id:responseJson.name.toString(), imagePath:imgPath, flip:true, clickable:true});  
                  setThemeCards(arra);
               });
           }
    }

    else if (selectedTheme.label == 'Space')
    {
        url = 'https://images-api.nasa.gov/search?q=small&description=nebula&media_type=image';
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            var arr = responseJson.collection.items;
            setArr(arr);

           for(var i=0; i<30; i++)
           {
                helperArray.push({id:arr[i].data[0].nasa_id, imagePath:arr[i].links[0].href, flip:true, clickable:true});
           }
           setThemeCards(helperArray);
           helperArray=([]);
        });
    }
};

return (
<View style = {styles.container}>
    <ScrollView>
        <View style = {{flex:1, padding:10, marginTop:5}}><Text style={{color:'#00bf0d', fontWeight:'600', fontSize:18, paddingLeft:10, paddingRight:10}}>Fill in your name and select the theme and level you want to play.</Text>
        </View>

        <View style={styles.inputCont}>
        <Input labelStyle={{color:'#140b42'}}
        containerStyle={{width:250}}
        placeholder = 'name' label='PLAYER' onChangeText={(name) => setPlayer(name)} value = {player}></Input>
    
            <View style = {styles.dropdowns}>
                <View style={{flex:1, height:100}}>
                    <Text style={{flex:1, margin:7, fontSize:16, fontWeight:'bold', color:'#140b42'}}>THEME</Text>
                    <DropDownPicker  
                        items={[
                            {label:"Pokemon"},
                            {label:"Space"},
                            ]}
                            containerStyle={{height: 50, width:150, flex:3, margin:7}}
                            placeholder="Theme"
                            value={theme}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            labelStyle={{
                                fontSize: 18,
                                textAlign: 'left',
                            }}
                            onChangeItem={(selectedTheme) =>
                            getThemeCards(selectedTheme)}/>
                </View>
                <View style={{flex:1, height:100}}>
                    <Text style={{flex:1, margin:7, fontSize:16, fontWeight:'bold', color:'#140b42'}}>DIFFICULTY</Text>
                    <DropDownPicker  
                        items={[
                            {label:"Easy"},
                            {label:"Medium"},
                            {label:"Hard"},
                            ]}
                            containerStyle={{height: 50, width:150, flex:3, margin:7}}
                            placeholder="Level"
                            value={difficulty}
                            dropDownStyle={{backgroundColor: '#F4F3F4'}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            labelStyle={{
                                fontSize: 18,
                                textAlign: 'left',
                                
                            }}
                            onChangeItem={(diff) =>
                            selectDifficulty({diff})}/>
                </View>
            </View>
        </View>
        <View style={{flex:1, marginTop:15, zIndex:-3, marginTop:30, alignItems:'center'}}>
            <Button title="START GAME"
                type = "solid"
                raised={true}
                buttonStyle={{backgroundColor:'#cf0072', borderWidth:4, borderColor:'#140b42', width:200, height:120, justifyContent:'center', color:'white', borderRadius:10}}
            onPress = {startGame}
                />
        </View>
        <View style={{marginTop:50}}>
            <Tooltip
            backgroundColor='#04de00'
            height={100}
            width={250}
            withPointer={true}     
            popover={<Text>Score formation: Amount of quesses * 15 + used time in seconds *3. The less points the better! </Text>}>
            <Text style={{alignSelf:'center', color:'#00bf0d', fontSize:18}}>score info</Text>
            </Tooltip>
        </View>
    </ScrollView>
</View>
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F3F4',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputCont: {
        padding:5,
        paddingTop:15,
        flex:1,
        backgroundColor:'#ff9cf5',
        borderWidth:2,
        marginTop:15,
        marginBottom:5,
        borderColor:'#140b42', 
    },
    dropdowns: {
        flex:1,
        width: 350,
        flexDirection:'row',
    }
  });
  