from rest_framework.permissions import BasePermission


class IsSuperUser(BasePermission):
    """Only the super admin can create, activate/deactivate, or delete
    other admin accounts.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_superuser)


class IsAuthenticatedOrCreateOnly(BasePermission):
    """Anyone can submit (create); only authenticated admins can list, read,
    update or delete. Used for endpoints that hold personal information
    (donations, contact/volunteer form submissions) so records aren't
    publicly listable while the public submission forms stay open.
    """

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return bool(request.user and request.user.is_authenticated)
