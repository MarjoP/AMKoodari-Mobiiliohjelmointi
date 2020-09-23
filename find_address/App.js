import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {

const[region, setRegion] = useState({
  latitude:60,
  longitude:25,
  latitudeDelta:0.03,
  longitudeDelta:0.02,
});
const[coordinate, setCoordinate] = useState({
  latitude: 60.201373,
  longitude: 24.934041
});

const[address, setAddress]=useState('');

const getLocation = () => {
  var address2 = address.replace(/\s/g, '+').replace(/,/g, "");
  const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=1gmjSLfXwWvmVu6IkRh7yO8AudfIzN1P&location=' +address2;

  console.log(url);
 
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
      <Text>Karttasovellus</Text>

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
    flex:0.3,
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
