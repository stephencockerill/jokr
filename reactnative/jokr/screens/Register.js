import Dimensions from 'Dimensions';
import React from 'react';
import { 
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
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
      <View style={styles.container}>

        <View style={[styles.inputWrapper, {marginTop: 20}]}>
          <TextInput 
            style={styles.input} 
						underlineColorAndroid='transparent'
            placeholder='Username' 
            onChangeText={(username) => this.setState({username})}
          />
          <TextInput 
            style={styles.input} 
						underlineColorAndroid='transparent'
            placeholder='Email' 
            onChangeText={(email) => this.setState({email})}
          />
          <TextInput 
            style={styles.input} 
						underlineColorAndroid='transparent'
            secureTextEntry={true} 
            placeholder='Password' 
            onChangeText={(password1) => this.setState({password1})}
          />
          <TextInput 
            style={styles.input} 
						underlineColorAndroid='transparent'
            placeholder='Password(again)' 
            secureTextEntry={true} 
            onChangeText={(password2) => this.setState({password2})}
          />
        </View>

        <View style={styles.buttonsWrapper}>
					<TouchableOpacity
						style={[styles.button, {backgroundColor: 'blue'}]}
            onPress={()=>{this.props.screenProps.register(this.state.username, this.state.email, this.state.password1, this.state.password2)}}>
						<Text style={[styles.buttonText, {color: 'white'}]}>SIGN UP</Text>
					</TouchableOpacity>
				</View>

      </View>

    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: 'black'
	},
  input: {
    width: DEVICE_WIDTH - 40,
		fontSize: 20,
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'left',
    backgroundColor: 'gray',
    padding: 15,
    marginTop: 15,
    borderRadius: 5,
  },
  inputWrapper: {
		flex: 1,
		//justifyContent: 'space-around',
    justifyContent: 'center',
		alignItems: 'center',
  },
	buttonsWrapper: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	button: {
		width: 125,
		height: 50,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
	},
});

export default Register;
