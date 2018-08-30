import React from 'react';
import { 
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class App extends React.Component {
  render() {
		const pic = {
			uri: 'https://cdn.pixabay.com/photo/2016/06/09/02/34/clown-1445040_640.png'
		};
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
				<Image source={pic} style={{width: 300, height: 200}}/>
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
