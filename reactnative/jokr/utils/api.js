const API_HOST = 'https://shielded-dawn-65540.herokuapp.com'

const api = {
  HOST: API_HOST,
  registerUser: 'registerUser',
  login: 'login function',

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

export default api
