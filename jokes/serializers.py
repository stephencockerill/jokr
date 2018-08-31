from rest_framework import serializers

from jokes.models import (
    Joke,
    JokeReaction,
)
from users.serializers import UserSerializer


class JokeSerializer(serializers.HyperlinkedModelSerializer):
    author = UserSerializer(read_only=True)
    class Meta:
        model = Joke
        fields = (
            'id',
            'url',
            'author',
            'average_rating',
            'created_at',
            'last_modified_at',
            'num_ratings',
            'text_content',
        )


class JokeReactionSerializer(serializers.ModelSerializer):
    joke = serializers.PrimaryKeyRelatedField(
        queryset=Joke.objects.all(),
    )
    user = UserSerializer(read_only=True)
    class Meta:
        model = JokeReaction
        fields = (
            'id',
            'joke',
            'reaction',
            'user',
            'created_at',
        )
