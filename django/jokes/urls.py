from django.conf.urls import url
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from jokes import views
from users.views import UserListView


urlpatterns = [
    url(r'^$', views.api_root, name='api-root'),
    url(r'^auth/login/$', views.LoginViewCustom.as_view(), name='rest_login'),
    url(r'^jokes/$', views.JokeList.as_view(), name='joke-list'),
    url(
        r'^jokes/(?P<pk>[0-9]+)/$',
        views.JokeDetail.as_view(),
        name='joke-detail'
    ),
    # TODO create view  /jokes/<id>/ratings/ to get all ratings for a joke
    url(
        r'^jokes/(?P<joke_id>[0-9]+)/ratings/$',
        # placeholder until JokeRatingDetail view is made
        views.JokeDetail.as_view(),
        name='joke-rating-list'
    ),
    url(r'^ratings/$', views.JokeRatingList.as_view(), name='rating-list'),
    url(r'^users/$', views.UserList.as_view(), name='customuser-list'),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view(), name='customuser-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
