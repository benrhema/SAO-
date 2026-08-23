from rest_framework.permissions import BasePermission


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
