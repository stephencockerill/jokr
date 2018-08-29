from rest_framework import serializers

from jokes.models import (
    Joke,
    JokeRating,
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


class JokeRatingSerializer(serializers.ModelSerializer):
    joke = serializers.PrimaryKeyRelatedField(
        queryset=Joke.objects.all(),
    )
    user = UserSerializer(read_only=True)
    class Meta:
        model = JokeRating
        fields = (
            'id',
            'joke',
            'rating',
            'user',
            'created_at',
        )
