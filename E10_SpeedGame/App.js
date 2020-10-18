
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Button,
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { TabView, SceneMap } from 'react-native-tab-view';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from "react-native-dialog";

// connection to Realm
const Realm = require('realm');

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [addDialogVisible, setAddDialogVisible] = React.useState(false);
  const [name, setName] = React.useState("");
  const [timeOne, setTimeOne] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [players, setPlayers] = React.useState([]);

  const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#fff' }]}>
      <Text style={styles.text}>Double tap the circle as fast as you can!</Text>
      <View style={styles.circle} onTouchStart={circlePressed} />
      <Text style={styles.text}>Time: {score}</Text>
      <View style={styles.row}>
        <View style={styles.button}>
          <Button title="Add highscores" onPress={() => setAddDialogVisible(true)} />
        </View>
        <View style={styles.button}>
          <Button title="Reset time" onPress={()=>Reset()} />
        </View>
      </View>
    </View>
  );

  const Reset = () =>{
    setScore(0);
    setTimeOne(0);
  }

  const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#fff' }]}>
      <ScrollView>
        {players.map((player, index) => {
          return (
            <View key={index} style={styles.highscore}>
              <Text style={styles.highscoreName}>{player.name}</Text>
              <Text style={styles.highscoreScore}>{player.score}</Text>
            </View>
          )
        })}
      </ScrollView>
    </View>
  );

  const initialLayout = { width: Dimensions.get('window').width };

  const [routes] = React.useState([
    { key: 'first', title: 'Game' },
    { key: 'second', title: 'Highscores' },
  ]);

  // Player schema

  const Player = {
    name: 'Player',
    properties: {
      name: 'string',
      score: { type: 'int', default: 0 },
    },
  };

  //connection
  const realm = new Realm({ schema: [Player] });

  // save
  const okClicked = () => {
    setAddDialogVisible(false);
    // add highscore
    realm.write(() => {
      const player = realm.create('Player', {
        name: name,
        score: score,
      });
    });
  }

  const circlePressed = () => {
    // get start time - first press
    if (timeOne === 0) {
      const date = new Date();
      setTimeOne(date.getTime());
      setScore(0);
      // second press, calc time and store
    } else {
      const date = new Date();
      setScore(date.getTime() - timeOne);
    }
  }

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const indexChange = (index) => {
    // change tab index from code   
    setIndex(index);
    // more code later here, load HS when tab 1 is selected == hs tab    
    if (index === 1) {
      // load highscores
      let players = realm.objects('Player').sorted('score');
      let playersArray = Array.from(players);
      setPlayers(playersArray);
    }
  }


  return (
    <>
      <Header
        leftComponent={<Icon name="bars" color='#fff' />}
        centerComponent={{ text: 'SPEED GAME', style: { color: '#fff' } }}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={indexChange}
        initialLayout={initialLayout}

      />

      <Dialog.Container visible={addDialogVisible}>
        <Dialog.Title>Add a new highscore</Dialog.Title>
        <Dialog.Input label="Name" placeholder="Click and type your name here" onChangeText={text => setName(text)} />
        <Dialog.Button label="Ok" onPress={okClicked} />
      </Dialog.Container>

    </>
  );
};


const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: 'red',
    alignSelf: "center",
    marginTop: 100
  },
  text: {
    marginTop: 50,
    alignSelf: "center"
  },
  button: {
    marginRight: 20,
    marginTop: 50,
    alignSelf: "center",
    width: 150
  },
  row: {
    flexDirection: 'row',
    alignSelf: "center"
  },
  highscore: {
    flexDirection: 'row',
    margin: 10,
  },
  highscoreName: {
    fontSize: 20,
    color: 'black',
    width: '50%',
    textAlign: 'right',
    marginRight: 5
  },
  highscoreScore: {
    fontSize: 20,
    color: 'gray',
    width: '50%',
    marginLeft: 5
  }
});

