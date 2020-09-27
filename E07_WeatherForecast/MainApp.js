/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import Dialog from 'react-native-dialog';
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Right,
  Body,
  Text,
  Form,
  Input,
  Item,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import WeatherForecast from './WeatherForecast';
import {ScrollView} from 'react-native';

const MainApp = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cityName, setCityName] = useState('');
  const [cities, setCities] = useState([]);
  let run = false;
  // load cities when app starts
  useEffect(() => {
    getData();
  }, [run]); // jos ei laiteta ehtoa (kun run muuttuu), jolloin useEffect ajetaan, haetaan myös WeatherForecast komponentilta säätiedot vaikkei kaupunkia ole annettu => error

  // save cities if cities state changes
  useEffect(() => {
    storeData();
  }, [cities]);


  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@cities', JSON.stringify(cities));
    } catch (e) {
      // saving error
      console.log('Cities saving error!');
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@cities');
      console.log('cities ladattu');
      if (value !== null) {
        setCities(JSON.parse(value));
      }
    } catch (e) {
      console.log('Cities loading error!');
    }
  };

  // voidaan käyttää tyhjäämään koko asyncStorage tämän apin osalta
  const clearAppData = async function() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
       
    } catch (error) {
        console.error('Error clearing app data.');
    }
}

const openDialog = () => {
    setModalVisible(true);
  };

  const addCity = () => {
    setCities([...cities, {id: cities.length, name: cityName}]);
    setModalVisible(false);
  };

  const cancelCity = () => {
    setModalVisible(false);
  };

  const deleteCity = (id) => {
    let filteredArray = cities.filter((city) => city.id !== id);
    setCities(filteredArray);
  };

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Weather App</Title>
        </Body>
        <Right>
          <Button>
            <Text onPress={openDialog}>Add</Text>
          </Button>
          
        </Right>
      </Header>

      <Dialog.Container visible={modalVisible}>
        <Dialog.Title>Add a new city</Dialog.Title>
        <Form>
          <Item>
            <Input
              onChangeText={(text) => setCityName(text)}
              placeholder="cityname"
            />
          </Item>
        </Form>
        <Dialog.Button color="red" label="Cancel" onPress={cancelCity} />
        <Dialog.Button color="green" label="Add" onPress={addCity} />
      </Dialog.Container>

      <ScrollView>
        {!modalVisible &&
          cities.map(function (city, index) {
              run = true;
            return (
              <WeatherForecast
                key={index}
                city={city.name}
                id={city.id}
                deleteCity={() => deleteCity(city.id)}
              />
            );
          })}
      </ScrollView>
    </Container>
  );
};
export default MainApp;
