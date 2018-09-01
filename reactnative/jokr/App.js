import { createStackNavigator } from 'react-navigation';
import React from 'react';

import Jokes from './screens/Jokes.js';
import Login from './screens/Login.js';
import Register from './screens/Register.js';
import api from  './utils/api.js';

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
