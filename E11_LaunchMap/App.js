import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
} from 'react-native';


const App: () => React$Node = () => {
  const [latitude, setLatitude] = useState(0);
  const [longigude, setLongitude] = useState(0);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.area}>
        <Text>Give latitude value:</Text>
        <TextInput placeholder='Latitude' />
        <Text>Give longitude value:</Text>
        <TextInput placeholder='Longitude' />
        <Button title="Launch a Map" />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  area: {
    margin: 20
  }
});

export default App;