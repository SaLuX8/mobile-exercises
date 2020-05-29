import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

function Movie(props) {
    return(
      <View style={{borderColor:'black', backgroundColor:'lightblue', padding:'8px', borderWidth: '1px', margin:'5px'}}>
        <Text style={{fontWeight:"bold"}}> {props.title} </Text>
        <Text> {props.theatre} </Text>
        <Text> {props.start} </Text>
      </View>
    );
}

export default function App() {
  
    return(
      <View style={styles.container}>
        <Movie title ="A Fistful of Dollars" theatre="Finnkino, Jyväskylä, sali 1" start="today 21.00" />
        <Movie title ="The Good, The Bad and The Ugly" theatre="Finnkino, Jyväskylä, sali 2" start="today 20.00" />
        <Movie title ="Once Upon a Time in the West" theatre="Finnkino, Jyväskylä, sali 3" start="today 20.00" />
      </View>
    );
  
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 5,
    borderColor: 'black',
  },

});
