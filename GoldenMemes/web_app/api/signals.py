from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from web_app.models import Post, Like, DisLike


@receiver(post_save, sender=Post)
def create_post_like_dis_like(sender, instance, created, *args, **kwargs):
    if created:
        Like.objects.create(post=instance)
        DisLike.objects.create(post=instance)
