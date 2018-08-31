import React from 'react';
import { 
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  AppRegistry,
  Platform
} from 'react-native';


class Login extends React.Component {
  render() {
    return (
      <View >
        <Text>Login Page</Text>
        <Button
          onPress={() => {
            this.props.navigation.navigate('Register')
          }}
          title="Register"
        />
        <Button
          onPress={this.props.screenProps.goJokes}
          title="Go to Jokes"
        />
      </View>
    );
  }
}

export default Login;