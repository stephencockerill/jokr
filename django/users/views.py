from django.contrib.auth import get_user_model
from rest_framework import generics

from users.models import CustomUser
from users.serializers import UserSerializer

User = get_user_model()


# NOT USED: view is in jokes.views for now
class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
