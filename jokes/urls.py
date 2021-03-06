from django.conf.urls import url
from django.urls import path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

from jokes import views
from users.views import UserListView

router = routers.SimpleRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = router.urls
urlpatterns += [
    url(r'^$', views.api_root, name='api-root'),
    url(r'^auth/login/$', views.LoginViewCustom.as_view(), name='rest_login'),
    url(r'^jokes/$', views.JokeList.as_view(), name='joke-list'),
    url(
        r'^jokes/(?P<pk>[0-9]+)/$',
        views.JokeDetail.as_view(),
        name='joke-detail'
    ),
    # TODO create view  /jokes/<id>/reactions/ to get all reactions for a joke
    url(
        r'^jokes/(?P<joke_id>[0-9]+)/reactions/$',
        # placeholder until JokeReactionDetail view is made
        views.JokeDetail.as_view(),
        name='joke-reaction-list'
    ),
    url(r'^reactions/$', views.JokeReactionList.as_view(), name='reaction-list'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
