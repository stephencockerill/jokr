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


class Register extends React.Component {
  render() {
    const pic = {
      uri: 'https://cdn.pixabay.com/photo/2016/06/09/02/34/clown-1445040_640.png'
    };
    return (
      <View style={styles.container}>
        <Text>Register Page</Text>
        <Image source={pic} style={{width: 300, height: 200}}/>
        <Button
          onPress={() => {
            this.props.navigation.navigate('Login')
          }}
          title="Go to Login"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Register;