import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import  myplacesScreen from './myplaces';
import  mapScreen  from './map';


const Stack = createStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "My Places" component={myplacesScreen}/>
        <Stack.Screen name = "Map" component={mapScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

