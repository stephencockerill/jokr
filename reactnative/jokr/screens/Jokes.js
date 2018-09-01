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
        next: api.HOST + '/jokes/?is_rated=false',
        previous: '',
        results: [],
      },
      currentIndex: 0,
      isLoading: true,
      outOfJokes: false,
    };
    this.getJokes = this.getJokes.bind(this);
    this.nextJoke = this.nextJoke.bind(this);
  }

  getJokes() {
    url = this.state.jokes.next;
    token = this.props.screenProps.token
    if (!url) {
      this.setState({
        outOfJokes: true,
      });
    } else {
      api.getJokes(url, token, (res) => {
        this.setState({
          jokes: res,
          currentIndex: 0,
          isLoading: false,
        });
      });
    }
  }

  nextJoke() {
    let nextIndex = this.state.currentIndex + 1;
    console.log(nextIndex);
    this.setState({
      currentIndex: nextIndex,
    })
  }

  componentDidMount() {
    this.getJokes();
  }
  
  render() {
    const jokes = this.state.jokes;
    const currentIndex = this.state.currentIndex;
    const joke = jokes.results[currentIndex];
    console.log('count', jokes.count);
    console.log('next', jokes.next);

    if (this.state.outOfJokes) {
      <View>
        <Text>Out of jokes :(</Text>
      </View>
    } else if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading laughs...</Text>
        </View>
      )
    } else if (!joke) {
      this.getJokes();
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
        <View>
          <Button
            onPress={() => {this.nextJoke()}}
            title="Next"
          />
        </View>
      </View>
    );
  }
}

export default Jokes;
