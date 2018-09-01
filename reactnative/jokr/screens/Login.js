import Dimensions from 'Dimensions';
import React from 'react';
import { 
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
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
      <View style={styles.container}>
				<View style={{justifyContent: 'center', alignItems: 'center'}}>
        	<Image source={pic} style={{width: 300, height: 200}}/>
				</View>

        <View style={styles.inputWrapper}>
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
            onChangeText={(password) => this.setState({password})}
          />
        </View>

        <View style={styles.buttonsWrapper}>
					<TouchableOpacity
						style={[styles.button, {backgroundColor: 'white'}]}
						onPress={()=>{this.props.navigation.navigate('Register')}}>
						<Text style={[styles.buttonText, {color: 'blue'}]}>SIGN UP</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, {backgroundColor: 'blue'}]}
						onPress={() => {this.props.screenProps.login(this.state.email, this.state.password)}}>
						<Text style={[styles.buttonText, {color: 'white'}]}>LOGIN</Text>
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
    borderRadius: 5,
  },
  inputWrapper: {
		flex: 1,
		justifyContent: 'space-around',
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

export default Login;
