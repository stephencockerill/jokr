import { createStackNavigator } from 'react-navigation';
import React from 'react';

import Jokes from './screens/Jokes.js';
import Login from './screens/Login.js';
import Register from './screens/Register.js';
import api from  './utils/api.js';

const LoginNavigator = createStackNavigator({
  Login: { 
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      title: 'Jokr',
    }),
  },
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
    this.login = this.login.bind(this);
  }

  goJokes() {
    this.setState({
      token: false
    });
  }
  login(email, password){
    api.login(email, password, (res)=>{
      console.log(res.key);
      if(res.key !== undefined){
        this.setState({
          token: res.key
        });
      }
    });
  }


  render() {
    return( this.state.token === true ? (<LoginNavigator screenProps = {{goJokes: this.goJokes, login: this.login}}/>) : (<JokesNavigator />));
  }
}
