const API_HOST = 'https://shielded-dawn-65540.herokuapp.com';

const api = {
  HOST: API_HOST,
  registerUser: 'registerUser',
  
  login: function(email, password, cb){
    fetch(API_HOST + '/auth/login/', {
      method: 'POST',
      body: JSON.stringify({email: email, password: password}),
      headers:{
        'Content-Type': 'application/json'
      }

    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
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
};

export default api;
