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
  Login: { 
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      title: 'Jokr',
    }),
  },
  Register: { 
    screen: Register,
    navigationOptions: ({ navigation }) => ({
      title: 'Registration',
    }), 
  },
});

const JokesNavigator = createStackNavigator({
  Jokes : { screen: Jokes,
    navigationOptions: ({ navigation }) => ({
      title: 'Jokr',
    }), 
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '75ef0231a723411b9a317a1fd28494549e7da930',
      jokes: {
        count: 0,
        next: api.HOST + '/jokes/?is_rated=false',
        previous: '',
        results: [],
      },
    };
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }


  login(email, password){
    api.login(email, password, (res)=>{
      if(res.key !== undefined){
        this.setState({
          token: res.key
        });
      }
    });
  }

  register(username, email, password1, password2){
    api.register(username, email, password1, password2, (res)=>{
      console.log(res.key);
      if(res.key !== undefined){
        this.setState({
          token: res.key
        });
      }
    });
  }

  render() {
    return(
      this.state.token ? (
        <JokesNavigator screenProps = {{token: this.state.token}}/>
      ) : (
        <LoginNavigator screenProps = {{login: this.login, register: this.register}}/>
      )
    );
  }
}
