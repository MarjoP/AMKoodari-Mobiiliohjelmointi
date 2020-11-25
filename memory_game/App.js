import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Header } from 'react-native-elements';
import ClassicScreen from './screens/ClassicScreen';
import RepeatScreen from './screens/RepeatScreen';
import ScoreScreen from './screens/ScoreScreen';
import ClassicGame from './screens/ClassicGame';


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
     <Header centerComponent={{text: 'MEMORY GAME', style: {color:'#fff', fontWeight:'bold'}}} containerStyle={{
    backgroundColor:'#140b42'}}/>
    <Tab.Navigator>
      <Tab.Screen name="Classic-Game" component={StackScreens}/>
      <Tab.Screen name="Repeat-Game" component={RepeatScreen} />
      <Tab.Screen name="Scoreboard" component={ScoreScreen}/>
    </Tab.Navigator>
    </NavigationContainer>
  );
}

function StackScreens() { 
  return (
          <Stack.Navigator>
            <Stack.Screen name ="Classic-Game" component={ClassicScreen} options={{headerShown:false}}/>
            <Stack.Screen name="ClassicGame" component={ClassicGame} options={{headerShown:false}}/>
          </Stack.Navigator>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
