import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import './App.css';
import Yritykset from './Yritykset';
import Info from './Info';
import Home from './Home';
import PageNavBar from './PageNavBar';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    console.log("versio 19");
    return (
      <div className="App">
        <div>
          <PageNavBar />
        </div>

        <div className="container">
          <Jumbotron>
            <h1 >Uusyrityshaku</h1>
            <p>Hae uusien yritysten tiedot</p>
          </Jumbotron>
          <div>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path={'/haku'} component={Yritykset} />
              <Route path={'/info'}>
                <Info />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

