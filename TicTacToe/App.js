import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

  return (
    <View >
      <Board />
    </View>
  );
}

class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.square}>
        <Button
          title={this.props.value}
          onPress={() => {
            this.props.onPress()
          }}
        />
      </View>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(' '),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
  }

  renderSquare(i) {
    return (
    <Square 
    value={this.state.squares[i]}
    onPress={() => this.handleClick(i)} />
    )
  }

  newGame(){
    this.setState({ xIsNext:true });

  }

  render() {
    const status = this.state.xIsNext ? 'Next player: X' : 'Next player: O';

    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.status}>{status}</Text>
        <View style={styles.boardRow}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </View>
        <View style={styles.boardRow}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </View>
        <View style={styles.boardRow}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </View>

        <View style={styles.button}>
        <Button
          title='New Game'
          color='green'
          onPress={() => {
            this.setState({squares: Array(9).fill(' '), xIsNext:true})
          }}/>


        </View>
        
      </View>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const styles = StyleSheet.create({
  boardRow: {
    flexDirection: 'row',

  },
  status: {
    marginTop: '10%'
  },
  square: {
    flex: 1,
    justifyContent: "center",
    padding: 1,
    maxWidth: 40
  },
  button: {
    marginTop: '2%'
  }
});
