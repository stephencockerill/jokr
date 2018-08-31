from collections import namedtuple

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
    text_content = models.TextField(unique=True)
    # related models
    author = models.ForeignKey(
        # 'auth.User',
        User,
        related_name='jokes',
        on_delete=models.CASCADE,
    )
    class Meta:
        ordering = ('-average_rating', '-num_ratings')

    def update_rating(self, reaction, update=False):
        """Update num_ratings and average_rating based on reaction"""
        rating = getattr(JokeReaction, reaction.reaction).value
        # update existing rating
        if update:
            numerator = self.average_rating * (self.num_ratings - 1) + rating
            denomenator = self.num_ratings
        # add new rating
        else:
            numerator = (self.average_rating * self.num_ratings) + rating
            denomenator = self.num_ratings + 1
        self.average_rating = numerator / (denomenator or 1)
        self.num_ratings = denomenator
        self.save()

class JokeReaction(models.Model):
    """
    User reaction to a joke based.
    """
    # reaction choices and their values
    Reaction = namedtuple('Reaction', ['id', 'value'])
    GREEN_BUTTON = Reaction('GREEN_BUTTON', 1)
    LEFT = Reaction('LEFT', -1)
    RED_BUTTON = Reaction('RED_BUTTON', -1)
    RIGHT = Reaction('RIGHT', 1)
    SAVE = Reaction('SAVE', 5)
    REACTION_CHOICES = (
        (GREEN_BUTTON.id, GREEN_BUTTON.value),
        (LEFT.id, LEFT.value),
        (RED_BUTTON.id, RED_BUTTON.value),
        (RIGHT.id, RIGHT.value),
        (SAVE.id, SAVE.value),
    )

    reaction = models.CharField(
        max_length=16,
        choices=REACTION_CHOICES,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    # related models
    joke = models.ForeignKey(
        Joke,
        related_name='reactions',
        on_delete=models.CASCADE,
    )
    user = models.ForeignKey(
        # 'auth.User',
        User,
        related_name='reactions',
        on_delete=models.CASCADE,
    )
    class Meta:
        ordering = ('created_at',)
        unique_together = ('joke', 'user')
