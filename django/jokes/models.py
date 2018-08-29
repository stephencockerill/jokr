from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Joke(models.Model):
    """
    Joke displayed to users.

    'user' field refers to the author of the joke
    """
    average_rating = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified_at = models.DateTimeField(auto_now=True)
    num_ratings = models.PositiveIntegerField(default=0)
    text_content = models.TextField()
    # related models
    author = models.ForeignKey(
        # 'auth.User',
        User,
        related_name='jokes',
        on_delete=models.CASCADE,
    )
    class Meta:
        ordering = ('average_rating', 'num_ratings')


class JokeRating(models.Model):
    """
    Rating that a user gives a joke based on their reaction.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField()
    # related models
    joke = models.ForeignKey(
        Joke,
        related_name='ratings',
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(
        # 'auth.User',
        User,
        related_name='ratings',
        on_delete=models.CASCADE,
    )
    class Meta:
        ordering = ('created_at',)
        unique_together = ('joke', 'user')
