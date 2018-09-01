import { createStackNavigator } from 'react-navigation';
import React from 'react';
import {
  Text,
  View,
} from 'react-native';

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
    this.state = {
      token: 'b525a2cf056ea79b4ed185cd4ce2af53d8c6a360',
      jokes: {
        count: 0,
        next: api.HOST + '/jokes/?is_rated=false',
        previous: '',
        results: [],
      },
    };
    this.goJokes = this.goJokes.bind(this);
  }

  goJokes() {
    this.setState({
      token: ''
    })
  }

  render() {
    return(
      this.state.token ? (
        <JokesNavigator screenProps = {{token: this.state.token}}/>
      ) : (
        <LoginNavigator screenProps = {{goJokes: this.goJokes}}/>
      )
    );
  }
}
