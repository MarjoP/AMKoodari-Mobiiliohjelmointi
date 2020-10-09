import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [contactList, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });
      if(data.length > 0) {
        setContacts(data);
      }
    }
  })();
}, []);

const FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#000",
      }}
    />
  );
}

  return (

    <View style={styles.container}>
      <Text style={{fontSize:24, marginBottom:5}}>Contacts</Text>
      <FlatList 
        data = {contactList}
        ItemSeparatorComponent =  {FlatListItemSeparator }
        keyExtractor={(item, index) => index}
        renderItem = {({item}) => (
          <View style={styles.contacts}>
              <Text style={{fontSize:18, fontWeight:'bold'}}>{item.name}</Text>
              {item.phoneNumbers && item.phoneNumbers.map(phone => (
                  <Text style={{fontSize:16}}>phone: {phone.number}</Text>
              ))}
          </View>
      )
      }/>
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
    paddingTop:20,
    paddingBottom:20,
    fontSize:18,
  },
  contacts: {
    marginTop:10,
    marginBottom:5,
  }
});
