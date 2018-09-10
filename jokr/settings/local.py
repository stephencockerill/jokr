import os
from .base import *
from .base import env

DEBUG = True

SECRET_KEY = env('DJANGO_SECRET_KEY', default='HY8Boiz20IUl8guLsfTnU1KsOxqyyHpBKCkOsFgWpv2PEfh8X4pN9UgP4Gko5ijJ')
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(str(BASE_DIR), 'db.sqlite3'),
    }
}
