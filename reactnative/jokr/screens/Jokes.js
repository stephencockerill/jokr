import Dimensions from 'Dimensions';
import React from 'react';
import { 
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  StatusBar,

} from 'react-native';

import api from  '../utils/api.js';


class Jokes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: {
        count: 0,
        next: api.HOST + '/jokes/?limit=100&is_rated=false',
        previous: '',
        results: [],
      },
      currentIndex: 0,
      isLoading: true,
      outOfJokes: false,
      getAttempts: 0,
    };
    this.getJokes = this.getJokes.bind(this);
    this.nextJoke = this.nextJoke.bind(this);
    this.postReaction = this.postReaction.bind(this);
  }

  getJokes() {
    url = this.state.jokes.next;
    getAttempts = this.state.getAttempts + 1;
    token = this.props.screenProps.token;
    api.getJokes(url, token, (res) => {
      if (!res.count) {
        this.setState({
          outOfJokes: true,
          isLoading: false,
          getAttempts: getAttempts,
        })
      } else {
        this.setState({
          jokes: res,
          currentIndex: 0,
          isLoading: false,
          outOfJokes: false,
          getAtempts: 0,
        });
      }
    });
  }

  nextJoke() {
    const nextIndex = this.state.currentIndex + 1;
    this.setState({
      currentIndex: nextIndex,
    })
  }

  postReaction(jokeId, reaction) {
    token = this.props.screenProps.token;
    api.postReaction(jokeId, reaction, token, (res) => {});
    this.nextJoke();
  }

  componentDidMount() {
    this.getJokes();
  }
  
  render() {
    const jokes = this.state.jokes;
    const currentIndex = this.state.currentIndex;
    const joke = jokes.results[currentIndex];
    const notLikeButton = {uri: 'http://pluspng.com/img-png/tinder-png--1000.png'};
    const likeButton = {uri: 'https://www.greenheartgames.com/wp-content/uploads/2012/11/greenheartlogosq.png'};
    const saveButton = {uri: 'https://orig00.deviantart.net/a7a3/f/2016/295/b/0/tinder_super_like_star_by_topher147-dalwd0y.png'};

    // Handy debugging logs
    /*
    console.log('~~~~~~~~~~~~~~~~~');
    console.log('joke', (typeof joke));
    console.log('currentIndex', currentIndex);
    console.log('isLoading', this.state.isLoading);
    console.log('outOfJokes', this.state.outOfJokes);
    console.log('getAttempts', this.state.getAttempts);
    */

    if (!joke) {
      if (this.state.getAttempts < 1) {
        this.getJokes();
        return (
          <View>
            <Text>Loading laughs...</Text>
          </View>
        )
      } else if (this.state.outOfJokes === true) {
        return (
          <View>
            <Text>Out of jokes :(</Text>
          </View>
        )
      } else if (this.state.isLoading === true) {
        return (
          <View>
            <Text>Loading laughs...</Text>
          </View>
        )
      } else {
        return (
          <View>
            <Text>Something's wrong... stop laughing this isn't funny!</Text>
          </View>
        )
      }
    }

    return (
      <View style={{
        flex: 1,
        backgroundColor: 'black',

      }}>

        <View style={{
          height: BIG_HEIGHT,
          width: DEVICE_WIDTH,
        }}>
          {
            joke ?
            (
              <ScrollView>
                <Text style={{fontSize:30, color:'white', textAlign:'center'}}>{joke.text_content}</Text>
                <View style={{margin:200}}/>
              </ScrollView>
            ) : (
              <Text>Out of jokes :(</Text>
            )
          }
        </View>

        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {this.postReaction(joke.id, 'RED_BUTTON')}}>
            <Image
              source={notLikeButton}
              style={{width: 50, height: 50}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {this.postReaction(joke.id, 'SAVE')}}>
            <Image
              style={{width: 40, height: 40}}
              source={saveButton}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {this.postReaction(joke.id, 'GREEN_BUTTON')}}>
            <Image
              style={{width: 50, height: 50}}
              source={likeButton}
            />
          </TouchableOpacity>
				</View>

      </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const SMALL_HEIGHT = DEVICE_HEIGHT * .3;
const BIG_HEIGHT = DEVICE_HEIGHT * .7;

const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: 'black'
	},
	buttonsWrapper: {
    height: SMALL_HEIGHT,
    width: DEVICE_WIDTH,
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
	}
});

export default Jokes;
