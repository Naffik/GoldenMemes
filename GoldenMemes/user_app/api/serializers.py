from user_app.models import User
from rest_framework import serializers
from rest_framework.exceptions import ValidationError


class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise ValidationError({'error': 'Password should be same as Password2'})

        if User.objects.filter(email=self.validated_data['email']).exists():
            raise ValidationError({'error': 'Email already exists'})

        account = User(email=self.validated_data['email'], username=self.validated_data['username'])
        account.set_password(password)
        account.save()

        return account
