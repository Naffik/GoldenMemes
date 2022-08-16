from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    is_active = models.BooleanField(default=True)


class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_profile")
    nickname = models.CharField(max_length=50, null=True, blank=True)
    avatar = models.ImageField(upload_to='media/profile_images/', blank=True)
    bio = models.TextField()

    def __str__(self):
        return str(self.nickname)
