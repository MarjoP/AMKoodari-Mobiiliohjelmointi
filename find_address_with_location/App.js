import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {Modal, StyleSheet, Text, View, TextInput, Button, Alert, RefreshControlBase} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {

const[modal, setVisible] =useState(false);

const[region, setRegion] = useState({
  latitude:60,
  longitude:25,
  latitudeDelta:0.03,
  longitudeDelta:0.02,
});

const[coordinate, setCoordinate] = useState({
  latitude:0,
  longitude:0
});

const[address, setAddress]=useState('');

const getCurrentLocation = async () => {
  let { status } = await Location.requestPermissionsAsync();
  if(status !== 'granted') {
    Alert.alert('No permission to access location');
  } 
  else {
    setVisible(true);
    let location = await Location.getCurrentPositionAsync({});
    var lat = location.coords.latitude;
    var long = location.coords.longitude;

    console.log(lat + " " +long);

    setRegion({
      latitude:lat,
      longitude:long,
      latitudeDelta:0.03,
      longitudeDelta:0.02,
    });

    setCoordinate({
      latitude:lat,
      longitude:long
    });
    setVisible(false);
  }
}
  useEffect(() => {
    getCurrentLocation();
    }, []);

const getLocation = () => {
  var address2 = address.replace(/\s/g, '+').replace(/,/g, "");
  const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=1gmjSLfXwWvmVu6IkRh7yO8AudfIzN1P&location=' +address2;
 
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    setRegion({
      latitude:data.results[0].locations[0].latLng.lat,
      longitude:data.results[0].locations[0].latLng.lng,
      latitudeDelta:0.03,
      longitudeDelta:0.
    });
    setCoordinate({
      latitude:data.results[0].locations[0].latLng.lat,
      longitude:data.results[0].locations[0].latLng.lng,
    });
    console.log(region.latitude);
    console.log(coordinate.longitude);
  });
}

  return (
    <View style={styles.container}>
      <Text>Map application</Text>
    <View>
      <Modal
          animationType="slide"
          transparent
          visible={modal}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
            <View style={{
          flex:0.25,    
          alignItems: 'center',
          backgroundColor: 'gray',
          justifyContent:'center',
          alignItems:'center',
          margin: 25}}>
            <Text style={{fontSize: 16, color: 'white'}}>Finding current location...</Text>
          </View>
          </Modal>
        </View>

      <View style ={styles.search}>
        <TextInput style={styles.input} placeholder='address here' onChangeText = {text => setAddress(text)} 
        value={address}/>
        <Button title="SHOW" onPress={getLocation}></Button>
      </View>

      <MapView
        style= {styles.map}
        region = {region}>
          <Marker coordinate ={coordinate}
        title ='Kohde'/>
        </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:25,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    flex:0.2,
    marginBottom:20,
    justifyContent:'flex-end'
  },
  input: {
    width:300,
    borderBottomWidth:2,
  },
  map: {
    flex:1, 
    width: 300, 
    height:350,
    marginBottom:20
  },
});
