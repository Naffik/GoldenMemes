from rest_framework import permissions


class IsAdminOrReadOnly(permissions.IsAdminUser):

    def has_permission(self, request, view):
        # admin_permission = super.has_permission(request, view)
        # admin_permission = bool(request.user and request.user.is_staff)
        # return request.method == "GET" or admin_permission
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return bool(request.user and request.user.is_staff)


class IsProfileUserOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return bool(obj.user == request.user or request.user.is_staff)


class IsProfileUser(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return bool(obj.user == request.user or request.user.is_staff)
        else:
            return bool(obj.user == request.user or request.user.is_staff)
