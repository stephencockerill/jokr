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
    };
    this.getJokes = this.getJokes.bind(this);
  }

  getJokes() {
    url = this.state.jokes.next;
    token = this.props.screenProps.token
    api.getJokes(url, token, (res) => {
      this.setState({
        jokes: res
      });
    });
  }

  componentDidMount() {
    this.getJokes();
  }
  
  render() {
    return (
      <View>
        <Text>Jokes Page</Text>
        {
          this.state.jokes.results.length > 0 ?
          (
            <ScrollView>
            {
              this.state.jokes.results.map((joke, index) => (
                <Text key={index}>{joke.text_content}</Text>
              ))
            }
            </ScrollView>
          ) : (
              <Text>No jokes</Text>
          )
        }
      </View>
    );
  }
}

export default Jokes;
