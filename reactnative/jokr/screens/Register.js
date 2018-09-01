import React from 'react';
import { 
  TextInput,
  Text,
  View,
  Button,
  Alert,
  AppRegistry,
  Platform,
  KeyboardAvoidingView
} from 'react-native';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: ''
    };
  }
  render() {
    return (
      <KeyboardAvoidingView behavior='position' >
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TextInput 
            style = {{fontSize: 30, margin: 10}} 
            placeholder='Username' 
            onChangeText={(username) => this.setState({username})}
          />
          <TextInput 
            style = {{fontSize: 30, margin: 10}} 
            placeholder='Email' 
            onChangeText={(email) => this.setState({email})}
          />
          <TextInput 
            style = {{fontSize: 30, margin: 10}} 
            placeholder='Password' 
            secureTextEntry={true} 
            onChangeText={(password1) => this.setState({password1})}
          />
          <TextInput 
            style = {{fontSize: 30, margin: 10}} 
            placeholder='Password(again)' 
            secureTextEntry={true} 
            onChangeText={(password2) => this.setState({password2})}
          />
          <View style={{margin:7}} />
          <Button
            onPress={()=>{this.props.screenProps.register(this.state.username, this.state.email, this.state.password1, this.state.password2)}}
            title="Submit"
          />

        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Register;