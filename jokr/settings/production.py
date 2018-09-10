from .base import *
from .base import env

SECRET_KEY = env('DJANGO_SECRET_KEY')

DATABASES['default'] = env.db('DATABASE_URL')  # noqa F405
DATABASES['default']['ATOMIC_REQUESTS'] = True  # noqa F405
DATABASES['default']['CONN_MAX_AGE'] = env.int('CONN_MAX_AGE', default=60)  # noqa F405
