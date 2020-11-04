import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app';
import "firebase/firestore";
import { Card, Button, TextField, Select, MenuItem, InputLabel, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const firebaseConfig = {
  apiKey: "AIzaSyBnQq-z3rlE6VFbXP0pQ56QgSdiuyGIgA8",
  authDomain: "shoppinglist-633ff.firebaseapp.com",
  databaseURL: "https://shoppinglist-633ff.firebaseio.com",
  projectId: "shoppinglist-633ff",
  storageBucket: "shoppinglist-633ff.appspot.com",
  messagingSenderId: "96999322113",
  appId: "1:96999322113:web:496e42fa9b9eb175974600",
  measurementId: "G-ERLRXPY2QZ"
};
firebase.initializeApp(firebaseConfig);

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #38d031 30%, #7afb04 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'purple',
    height: 800,
    padding: '10px 30px',
    textAlign: 'center',


  },
  cards: {
    background: 'rgb(204, 230, 167)',
    padding: '5px',
    margin: '10px auto',


  },

});


function App() {

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");
  const [count, setCount] = useState(1);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      //database
      const db = firebase.firestore();
      //data
      const data = await db.collection("items").get();
      //shopping list items: name, count and id
      const items = data.docs.map(doc => {
        return {
          name: doc.data().name,
          count: doc.data().count,
          id: doc.id
        };
      });
      //set states
      setItems(items);
      setLoading(false);
    }
    //fetch loading data
    fetchData();

  }, []); //called only once

  // render loading... text
  if (loading) return (<p>Loading...</p>);

  // create shopping list items
  const sh_items = items.map((item, index) => {
    const text = item.name + " " + item.count;
    return (

      <Card key={index} className={classes.cards}>
        <TextField style={{ width: '70%' }} value={text} InputProps={{ disableUnderline: true }}></TextField>
        <Button onClick={() => deleteItem(item)}>X</Button>
      </Card>
    );
  });

  // add a new item to data base and shopping list items
  const addItem = async () => {
    // create a new shopping list item
    let newItem = { name: item, count: count, id: '' };
    // add to database
    const db = firebase.firestore();
    let doc = await db.collection('items').add(newItem);
    // get added doc id and set id to newItem
    newItem.id = doc.id;
    // update states
    setItems([...items, newItem]);
    setItem("");
    setCount(1);
  }

  // delete item from database and UI
  const deleteItem = async (item) => {
    // remove from db
    const db = firebase.firestore();
    db.collection('items').doc(item.id).delete();
    // delete from items state and update state
    let filteredArray = items.filter(collectionItem => collectionItem.id !== item.id);
    setItems(filteredArray);
  }


  // render shopping list
  return (
    <Container maxWidth="sm">
      <div className={classes.root}>
        <h2>Shopping List</h2>

        <TextField id="item" label="Item" onChange={e => setItem(e.target.value)} ></TextField>
        <Select id="count" label="Count" defaultValue={1} onChange={e => setCount(e.target.value)}  >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
        </Select>
        <Button className={classes.inputItem} onClick={() => addItem()}>Add</Button>



        {sh_items}
      </div>
    </Container>

  );
}

export default App;
