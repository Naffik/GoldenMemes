from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

STATUS_CHOICE = (
    ('new', 'Meme is not accepted'),
    ('accepted', 'Meme is good enough'),
    ('rejected', 'Meme is rejected')
)


class Post(models.Model):
    title = models.CharField(max_length=255)
    post_author = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    # meme = models.FileField(upload_to='images/', null=True, verbose_name="")
    like = models.IntegerField(null=True, default=0)
    dislike = models.IntegerField(null=True, default=0)
    status = models.CharField(choices=STATUS_CHOICE, default='new', max_length=255)
    number_of_comments = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    comment_author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments_author")
    date = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)
    content = models.TextField(max_length=2048)

    def __str__(self):
        return str(self.comment_author)
