from django.contrib.auth.models import User
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token


class RegistrationTestCase(APITestCase):

    def test_registration(self):
        data = {
            "username": "test",
            "email": "test@example.com",
            "password": "testPassword1@#",
            "password2": "testPassword1@#"
        }
        url = reverse('register')
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, 'Created User')


class LoginTestCase(APITestCase):

    def setUp(self):
        self.username = "test"
        self.password = "testPassword1@#"
        self.data = {
            "username": self.username,
            "password": self.password
        }

    def test_login(self):
        user = User.objects.create_user(username=self.data['username'], password=self.data['password'])
        self.assertEqual(user.is_active, 1, 'Active User')

        url = reverse('token_obtain_pair')
        response = self.client.post(url, self.data)
        token = response.data['access'] if 'access' else response.data['refreash']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        self.assertEqual(response.status_code, status.HTTP_200_OK, 'Login User')


