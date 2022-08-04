from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework_simplejwt.tokens import RefreshToken
from user_app.models import User
from user_app.api.serializers import RegistrationSerializer
from user_app.api.utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from django.conf import settings

# @api_view(['POST'],)
# def registration_view(request):
#
#     if request.method == 'POST':
#         serializer = RegistrationSerializer(data=request.data)
#
#         data = {}
#
#         if serializer.is_valid():
#             print('dupa')
#             account = serializer.save()
#
#             data['response'] = "Registraion successful!"
#             data['username'] = account.username
#             data['email'] = account.email
#
#             refresh = RefreshToken.for_user(account)
#             data['token'] = {
#                                 'refresh': str(refresh),
#                                 'access': str(refresh.access_token),
#                             }
#
#         else:
#             data = serializer.Errors()
#
#         return Response(data, status=status.HTTP_201_CREATED)


class RegisterView(generics.GenericAPIView):
    serializer_class = RegistrationSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data

        user = User.objects.get(username=user_data['username'])

        token = RefreshToken.for_user(user).access_token

        current_site = get_current_site(request).domain
        relative_link = reverse('email-verify')
        abs_url = 'http://' + current_site + relative_link + "?token=" + str(token)
        email_body = 'Hi ' + user.username + ' please verify your email address using below link \n' + abs_url
        data = {
            'email_body': email_body,
            'email_subject': 'Verify your email address',
            'mail_to': user_data['email']
        }
        Util.send_email(data)

        return Response(user_data, status=status.HTTP_201_CREATED)


class VerifyEmail(generics.GenericAPIView):

    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(id=payload['user_id'])
            if not user.is_active:
                user.is_active = True
                user.save()
            return Response({'email': 'Successfully verified'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as e:
            return Response({'error': 'Activation link expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as e:
            return Response({'error': 'Invalid Token'}, status=status.HTTP_400_BAD_REQUEST)
