from rest_framework import permissions


class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow authors to edit.
    """
    def has_object_permission(self, request, view, obj):
        # All users can read
        if request.method in permissions.SAFE_METHODS:
            return True

        # edit permissions only allowed to author
        return obj.author == request.user
