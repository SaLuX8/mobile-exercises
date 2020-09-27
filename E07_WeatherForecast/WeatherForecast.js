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
    )

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error!</Text>;

    // just for testing
    //console.log('DATA: ' + data);

    const WindDirection = (props) => {
        if (props >= 0 & props < 90) return 'NE';
        if (props >= 90 & props <= 180) return 'SE';
        if (props >= 180 & props <= 270) return 'SW';
        if (props >= 270 & props <= 360) return 'NW';
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
                    <Text>Windspeed: {data.wind.speed} m/s, from {WindDirection(data.wind.deg)}</Text>

                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <Text onPress={()=>deleteCity(data.id)}> - del -</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text onPress={refreshForecast} style={{ textAlign: 'right', alignSelf: 'stretch' }}> - refresh -</Text>
                        </View>
                    </View>
                </Body>
            </CardItem>
        </Card >
    );
};

export default WeatherForecast;

