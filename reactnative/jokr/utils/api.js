const API_HOST = 'https://shielded-dawn-65540.herokuapp.com';
const api = {
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
  getJokes: 'getJokes function',
};

export default api;
