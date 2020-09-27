/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import Dialog from "react-native-dialog";
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Form, Input, Item, Modal } from 'native-base';
import WeatherForecast from './WeatherForecast';
import { ScrollView } from 'react-native';

const MenuArea = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [cityName, setCityName] = useState("");
    const [cities, setCities] = useState([]);

    const openDialog = () => {
        setModalVisible(true);
    };

    const addCity = () => {
        setCities([...cities, { id: cities.length, name: cityName }]);
        setModalVisible(false);
    };

    const cancelCity = () => {
        setModalVisible(false);
    }

    const deleteCity = (id) => {
        let filteredArray = cities.filter(city => city.id !== id);
        setCities(filteredArray);
      }


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
                        <Input onChangeText={(text) => setCityName(text)} placeholder="cityname" />
                    </Item>
                </Form>
                <Dialog.Button color='red' label="Cancel" onPress={cancelCity} />
                <Dialog.Button color='green' label="Add" onPress={addCity} />
            </Dialog.Container>

            <ScrollView>
                {!modalVisible && cities.map(function (city, index) {
                    return (
                        <WeatherForecast
                            key={index}
                            city={city.name}
                            id={city.id}
                            deleteCity={()=>deleteCity(city.id)} />
                    )
                })}
            </ScrollView>

        </Container>
    );

};
export default MenuArea;


