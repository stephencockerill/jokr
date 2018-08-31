# jokr

## Running locally
Follow these instructions to get the jokr API server running.

`TODO: add frontend instructions`

### Prerequisites
The following must be installed on you development environment:
* Python 3
* [pipenv](https://pipenv.readthedocs.io/en/latest/)

### Setup
This will clone this repository, setup a pipenv shell, and install all the required
python modules to run the server.
```
$ git clone https://github.com/stephencockerill/jokr.git
$ pipenv --python 3.6
$ pipenv shell
$ pipenv install
```

### Run the API server
Run the following command. `0.0.0.0:8000` configures the server to listen to all incoming IP addresses on port 8000. This is necassary so that the phone application can connect to the API, provided the phone and the server are on the same network.
```
$ python manage.py runserver 0.0.0.0:8000
```

## Using API
Once the server is running locally, you can browse the API at http://localhost:8000/ (thanks to [Django Rest Framework](http://www.django-rest-framework.org/)).
There you will see all available API endpoints.
