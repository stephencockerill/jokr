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
    JokeReaction,
)
from jokes.permissions import IsAuthorOrReadOnly
from jokes.serializers import (
    JokeReactionSerializer,
    JokeSerializer,
    UserSerializer,
)

User = get_user_model()


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'jokes': reverse('joke-list', request=request, format=format),
        'reactions': reverse('reaction-list', request=request, format=format),
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
            is_rated = self.request.query_params.get('is_rated')
            if is_rated == 'true':
                # jokes already rated by user
                return queryset.filter(Q(reactions__user=self.request.user))
            # jokes not yet rated by user
            return queryset.filter(~Q(reactions__user=self.request.user))
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


class JokeReactionList(APIView):
    """
    List joke reactions, or create jokes reactions.
    """
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsAuthorOrReadOnly
    )
    def get(self, request, format=None):
        context = {'request': request}
        joke_id = request.GET.get('joke')
        if joke_id:
            reaction = JokeReaction.objects.filter(
                joke_id=joke_id,
                user=request.user,
            ).first()
            if reaction:
                serializer = JokeReactionSerializer(reaction, context=context)
                return Response(serializer.data)
            raise Http404

        reactions = JokeReaction.objects.filter(user=request.user)
        serializer = JokeReactionSerializer(reactions, context=context, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        context = {'request': request}
        joke_id = request.data.get('joke')
        existing = JokeReaction.objects.filter(
            joke_id=joke_id,
            user=request.user,
        ).first()
        # update if reaction exists
        update = False
        if existing:
            update = True
            serializer = JokeReactionSerializer(
                existing,
                data=request.data,
                context=context,
            )
        else:
            serializer = JokeReactionSerializer(
                data=request.data,
                context=context,
            )

        if serializer.is_valid():
            reaction = serializer.save(user=request.user)
            reaction.joke.update_rating(reaction, update=update)
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
