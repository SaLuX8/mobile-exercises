/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react'
import {StyleSheet} from "react-native";
import { Container, Header, Content, Icon, Accordion, Text, View} from "native-base";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';


const Map = () => {
    return (
        <View>
            <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,

                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      flex:1,
    },
   });

export default Map;


