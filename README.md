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
$ cd django
$ pipenv --python 3.6
$ pipenv shell
$ pipenv install
```

### Run the API server
in `jokr/django`:
```
$ python manage.py runserver
```

## Using API
Once the server is running locally, you can browse the API at http://localhost:8000/ (thanks to [Django Rest Framework](http://www.django-rest-framework.org/)).
There you will see all available API endpoints.
