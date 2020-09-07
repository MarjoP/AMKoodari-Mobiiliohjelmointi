import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {CalculatorScreen} from './Calculator';



export default function HistoryScreen({route, navigation}) {
    const {list} = route.params;
    return (
        <View style={styles.hist}>
            <FlatList style={styles.flatlist} data={list} renderItem={({item}) =>
                <Text>{item.key}</Text>
            }/>
        </View>
    );
};
const styles = StyleSheet.create({
    hist: {
      flex:1,
      justifyContent:'flex-start',
      alignItems:'center',
      paddingTop:50,
        backgroundColor:'rgba(170,219,220,1)',
    }
  });