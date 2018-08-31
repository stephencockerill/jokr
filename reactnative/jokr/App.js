import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Register from './Register.js';
import Login from './Login.js';
import Jokes from './Jokes.js';

const LoginNavigator = createStackNavigator({
  Login: { screen: Login},
  Register: { screen: Register },
});

const JokesNavigator = createStackNavigator({
  Jokes : { screen: Jokes},
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {token: true};
    this.goJokes = this.goJokes.bind(this);
  }

  goJokes() {
    this.setState({
      token: false
    });
  }

  render() {
    return( this.state.token ? (<LoginNavigator screenProps = {{goJokes: this.goJokes}}/>) : (<JokesNavigator />));
  }
}