import React from 'react';
import { 
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
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
      } else if (this.state.outOfJokes == true) {
        return (
          <View>
            <Text>Out of jokes :(</Text>
          </View>
        )
      } else if (this.state.isLoading == true) {
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
      <View>
        <View>
          {
            joke ?
            (
              <ScrollView>
                <Text>{joke.text_content}</Text>
              </ScrollView>
            ) : (
              <Text>Out of jokes :(</Text>
            )
          }
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
          <View style={{width: 50, height: 50}}>
            <Button
              onPress={() => {this.postReaction(joke.id, 'RED_BUTTON')}}
              style={{width: 50, height: 50}}
              color="red"
              title="X"
            />
          </View>
          <View style={{width: 50, height: 50}}>
            <Button
              onPress={() => {this.postReaction(joke.id, 'GREEN_BUTTON')}}
              style={{width: 50, height: 50}}
              color= "green"
              title="<3"
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Jokes;
