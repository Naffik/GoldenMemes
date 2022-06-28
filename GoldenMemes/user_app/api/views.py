from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import generics
from user_app.api.serializers import RegistrationSerializer, UserProfileSerializer
from user_app.models import UserProfile


# @api_view(['POST'],)
# def logout_view(request):
#
#     if request.method == 'POST':
#         request.user.auth_token.delete()
#         return Response(status=status.HTTP_200_OK)


@api_view(['POST'],)
def registration_view(request):

    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)

        data = {}

        if serializer.is_valid():
            account = serializer.save()

            data['response'] = "Registraion successful!"
            data['username'] = account.username
            data['email'] = account.email

            # token = Token.objects.get(user=account).key
            # data['token'] = token

            refresh = RefreshToken.for_user(account)
            data['token'] = {
                                'refresh': str(refresh),
                                'access': str(refresh.access_token),
                            }

        else:
            data = serializer.Errors()

        return Response(data, status=status.HTTP_201_CREATED)


class UserProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    # permission_classes = []
    print(queryset)
    lookup_url_kwarg = 'user'
    lookup_field = 'user__username'

    def get_queryset(self, *args, **kwargs):
        return UserProfile.objects.filter(user__username=self.kwargs.get('user'))

    def perform_destroy(self, instance):
        instance.profile_picture.delete()
        instance.delete()

    def perform_update(self, serializer):
        user = get_object_or_404(User, username=self.kwargs.get('user'))
        profile = UserProfile.objects.filter(user__username=self.kwargs.get('user'))
        try:
            profile.profile_picture.delete()
        except FileNotFoundError:
            pass
        serializer.save()


class UserProfileList(generics.ListAPIView):
    queryset = UserProfile.objects.all().order_by('pk')
    serializer_class = UserProfileSerializer
