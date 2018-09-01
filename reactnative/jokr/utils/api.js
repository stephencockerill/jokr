const API_HOST = 'https://shielded-dawn-65540.herokuapp.com';

const api = {
  HOST: API_HOST,
  registerUser: 'registerUser',
  
  login: function(email, password, cb){
    fetch(API_HOST + '/auth/login/', {
      method: 'POST',
      body: JSON.stringify({email: email, password: password}),
      headers:{
        'Content-Type': 'application/json',
      },
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      cb(data);
    }).catch(function(error){
      console.error('Error:', error);
    });
  },

  register: function(username, email, password1, password2, cb){
    fetch(API_HOST + '/auth/registration/', {
      method: 'POST',
      body: JSON.stringify({username: username, email: email, password1: password1, password2, password2}),
      headers:{
        'Content-Type': 'application/json',
      },
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      cb(data);
    }).catch(function(error){
      console.error('Error:', error);
    });
  },

  getJokes: function(url, token, cb) {
    fetch(url, {
      method: "GET",
      headers: {"Authorization": "Token " + token,},
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      cb(data);
    }).catch(error => {
      console.log('Error:', error);
    });
  },

  postReaction: function(joke_id, reaction, token, cb){
    fetch(API_HOST + '/reactions/', {
      method: 'POST',
      body: JSON.stringify({joke: joke_id, reaction: reaction,}),
      headers:{
        "Authorization": "Token " + token,
        'Content-Type': 'application/json',
      },
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      cb(data);
    }).catch(function(error){
      console.error('Error:', error);
    });
  },
};

export default api;
