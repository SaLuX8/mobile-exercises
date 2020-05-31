import React, {useState} from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';

export default function App() {
  const [numbers, setnumbers]=useState([]);

  const addNumber = () =>{
    setnumbers([...numbers, (Math.random()*100).toFixed(2)]);
  }

  return (
    <View>
      <Button title="Add number" onPress={addNumber}/>
      
      <ScrollView>
        {
          numbers.map((number, index)=>{
            return <Text key={index}>{number}</Text>
          })
        }
      </ScrollView>
    </View>
  );
}