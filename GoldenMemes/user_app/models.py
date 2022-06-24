from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile')
    country = models.CharField(blank=True, max_length=250)
    profile_picture = models.ImageField(upload_to='images/profiles/', null=True, blank=True)

    def __str__(self):
        return str(self.user.username)
