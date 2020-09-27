/* eslint-disable no-bitwise */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
// jäätiin show weather forecast http://www.ptm.fi/tutorials/react-native/weather-forecast-2/

import React, { useState } from 'react';
import useAxios from 'axios-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Card, Text, CardItem, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Form, Input, Item, Modal } from 'native-base';


const WeatherForecast = (params) => {
    const city = params.city;
    const API_KEY = '1930b8d66da70f855beebfaead1b274f';
    const [{ data, loading, error }, refetch] = useAxios(
        'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric' + '&appid=' + API_KEY
    );

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error!</Text>;

    // just for testing
    //console.log('DATA: ' + data);

    const WindDirection = (props) => {

        if (props >= 340 & props <= 360) return 'North';
        if (props >=  0 & props < 20) return 'North';
        if (props >= 20 & props < 60) return 'North-East';
        if (props >=  60 & props < 120) return 'East';
        if (props >= 120 & props < 160) return 'South-East';
        if (props >=  160 & props < 200) return 'South';
        if (props >= 200 & props < 240) return 'South-West';
        if (props >=  240 & props < 300) return 'West';
        if (props >= 300 & props < 340) return 'North-West';
        else return 'null';

    };

    const refreshForecast = () => {
        refetch();
    };

    const deleteCity = () => {
        params.deleteCity(data.id);
    };

    return (
        <Card>
            <CardItem>
                <Body>
                    <Text>
                        {data.name}
                    </Text>
                    <Text>Main: {data.weather[0].description}</Text>
                    <Text>Temp: {data.main.temp} °C (feels: {data.main.feels_like} °C)</Text>
                    <Text>Windspeed: {data.wind.speed} m/s, from {WindDirection(data.wind.deg)} {data.wind.deg}°</Text>

                    <View style={{ flexDirection: "row", justifyContent:'space-between', alignItems:'stretch' }}>
                        <Button style={{ flex: 0.8, justifyContent: 'center', marginRight: 60 }} small bordered danger>
                            <Text onPress={()=>deleteCity(data.id)} > Delete</Text> 
                        </Button>
                        <Button style={{ flex: 0.8, justifyContent: 'center', marginLeft: 60 }} small bordered success>
                            <Text onPress={refreshForecast}>refresh</Text>
                        </Button>
                    </View>
                </Body>
            </CardItem>
        </Card >
    );
};

export default WeatherForecast;

