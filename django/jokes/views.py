from django.contrib.auth import get_user_model
from django.db.models import Q
from django.http import Http404
from rest_framework import (
    generics,
    permissions,
    status,
)
from rest_auth.registration.views import LoginView
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView

from jokes.models import (
    Joke,
    JokeRating,
)
from jokes.permissions import IsAuthorOrReadOnly
from jokes.serializers import (
    JokeRatingSerializer,
    JokeSerializer,
    UserSerializer,
)

User = get_user_model()


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'jokes': reverse('joke-list', request=request, format=format),
        'ratings': reverse('rating-list', request=request, format=format),
        'users': reverse('customuser-list', request=request, format=format),
    })


class JokeDetail(generics.RetrieveDestroyAPIView):
    queryset=Joke.objects.all()
    serializer_class = JokeSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsAuthorOrReadOnly
    )


class JokeList(generics.ListCreateAPIView):
    serializer_class = JokeSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsAuthorOrReadOnly
    )

    def get_queryset(self):
        queryset = Joke.objects.all()
        if 'is_rated' in self.request.query_params:
            # jokes not yet rated by user
            queryset = queryset.filter(~Q(ratings__user=self.request.user))
        return queryset


    def post(self, request, format=None):
        context = {'request': request}
        # support batch create
        many = isinstance(request.data, list)
        serializer = JokeSerializer(
            data=request.data,
            many=many,
            context=context
        )
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JokeRatingList(APIView):
    """
    List joke rating, or create jokes ratings.
    """
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsAuthorOrReadOnly
    )
    def get(self, request, format=None):
        context = {'request': request}
        joke_id = request.GET.get('joke')
        if joke_id:
            rating = JokeRating.objects.filter(
                joke_id=joke_id,
                user=request.user,
            ).first()
            if rating:
                serializer = JokeRatingSerializer(rating, context=context)
                return Response(serializer.data)
            raise Http404

        ratings = JokeRating.objects.filter(user=request.user)
        serializer = JokeRatingSerializer(ratings, context=context, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        context = {'request': request}
        # support batch create
        many = isinstance(request.data, list)
        print(request.data)
        serializer = JokeRatingSerializer(
            data=request.data,
            many=many,
            context=context,
        )
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# to circumvent CSRF issue
class LoginViewCustom(LoginView):
    authentication_classes = (TokenAuthentication,)
