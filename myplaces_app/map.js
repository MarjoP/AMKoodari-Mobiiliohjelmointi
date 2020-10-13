import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ViewropTypes} from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default function mapScreen({ route, navigation}) {

    const {place} = route.params;

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

      const getLocation = () => {
        var address = place.replace(/\s/g, '+').replace(/,/g, "");
        const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=1gmjSLfXwWvmVu6IkRh7yO8AudfIzN1P&location=' +address;

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
            });
        }


      useEffect(() => {
        getLocation();
      }, []);


    return (
        <View style={styles.container}>
  
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
    map: {
        flex:1, 
        width: 300, 
        height:350,
        marginBottom:20
      },
    });