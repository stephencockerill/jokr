import React from 'react';
import { 
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  render() {
    const pic = {
      uri: 'https://cdn.pixabay.com/photo/2016/06/09/02/34/clown-1445040_640.png'
    };
    return (
      
      <KeyboardAvoidingView behavior='position' >
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={pic} style={{width: 300, height: 200}}/>
          <TextInput 
            style = {{fontSize: 30, margin: 20}} 
            placeholder='Email' 
            onChangeText={(email) => this.setState({email})}
          />
          <TextInput 
            style = {{fontSize: 30}} 
            placeholder='Password' 
            secureTextEntry={true} 
            onChangeText={(password) => this.setState({password})}
          />
          <View style={{margin:7}} />
          <Button
            onPress={() => {this.props.screenProps.login(this.state.email, this.state.password)}}
            title="Submit"
          />
          <View style={{margin:35}} />
          <Button
            onPress={()=>{this.props.navigation.navigate('Register')}}
            title="New User"
          />

        </View>
      </KeyboardAvoidingView>
      
    );
  }
}

export default Login;