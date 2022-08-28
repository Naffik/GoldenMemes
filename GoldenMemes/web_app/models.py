from django.db import models
from django.template.defaultfilters import slugify
from user_app.models import User
from taggit.managers import TaggableManager


class Category(models.Model):
    name = models.CharField(max_length=120, unique=True)

    def __str__(self):
        return self.name


class PostManager(models.Manager):
    def get_queryset(self):
        return super(PostManager, self).get_queryset().all()

    def new(self):
        return self.get_queryset().filter(status='new')

    def accepted(self):
        return self.get_queryset().filter(status='accepted')


STATUS_CHOICE = (
    ('new', 'Post is waiting to be accepted'),
    ('accepted', 'Post is accepted'),
    ('rejected', 'Post is rejected')
)


class Post(models.Model):
    objects = PostManager()

    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=False, blank=True)
    post_author = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='media/images/', null=False, verbose_name="")
    like = models.IntegerField(null=True, default=0)
    dislike = models.IntegerField(null=True, default=0)
    status = models.CharField(choices=STATUS_CHOICE, default='new', max_length=255)
    number_of_comments = models.IntegerField(null=True, default=0)
    tags = TaggableManager()

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Post, self).save(*args, **kwargs)

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    comment_author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comment_author")
    created = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)
    content = models.TextField(max_length=2048)

    def __str__(self):
        return str(self.comment_author)

