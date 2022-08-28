from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from web_app.models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from web_app.api.permissions import IsAdminOrReadOnly, IsCommentUserOrReadOnly, IsPostUserOrReadOnly
from web_app.api.pagination import PostPagination
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.template.defaultfilters import slugify
from datetime import date, timedelta
import random


class PostList(generics.ListAPIView):
    queryset = Post.objects.all().order_by('pk')
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = PostPagination


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsPostUserOrReadOnly]

    def get_queryset(self, *args, **kwargs):
        return Post.objects.filter(slug=self.kwargs.get('slug'))

    def perform_destroy(self, instance):
        instance.image.delete()
        instance.delete()

    def update(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        slug = slugify(request.data.get('title'))
        response = super(PostDetail, self).update(request, pk=pk, slug=slug)
        return response

    def perform_update(self, serializer):
        post = Post.objects.filter(slug=self.kwargs.get('slug'))
        try:
            post.image.delete()
        except FileNotFoundError:
            pass
        serializer.save()


class PostCreate(generics.CreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.all()

    def perform_create(self, serializer):
        post_author = self.request.user
        serializer.save(post_author=post_author)


class PostCommentList(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['comment_author__username', 'post__title']

    def get_queryset(self, *args, **kwargs):
        pk = self.kwargs.get('pk')
        return Comment.objects.filter(post=pk)


class CommentList(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['comment_author__username', 'post__title']
    # filter_backends = [filters.SearchFilter]
    # search_fields = ['comment_author__username', 'post__title']

    # def get_queryset(self):
    #     pk = self.kwargs.get('pk')
    #     comment_author = self.request.user
    #     return Comment.objects.filter(post=pk, comment_author=comment_author)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsCommentUserOrReadOnly]


class CommentCreate(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Comment.objects.all()

    def perform_create(self, serializer):
        pk = self.kwargs.get('pk')
        post = Post.objects.get(pk=pk)
        comment_user = self.request.user
        post.number_of_comments = post.number_of_comments + 1
        post.save()

        serializer.save(post=post, comment_author=comment_user)


class PostRandom(generics.RetrieveAPIView):
    serializer_class = PostSerializer
    lookup_field = 'status'
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        status = self.kwargs.get('status')
        posts = list(Post.objects.filter(status=status).values_list('pk', flat=True))
        r = random.choice(posts)
        post = Post.objects.filter(pk=r)
        return post


class PostListBest(generics.ListAPIView):
    queryset = Post.objects.accepted().order_by('-like')
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = PostPagination


class PostListNew(generics.ListAPIView):
    queryset = Post.objects.new()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = PostPagination


class PostListFresh(generics.ListAPIView):
    queryset = Post.objects.accepted()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = PostPagination


class PostListHot(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = PostPagination

    def get_queryset(self, *args, **kwargs):
        today = date.today()
        week = today + timedelta(days=-7)
        post = Post.objects.filter(created__gte=week, status='accepted').order_by('-like')
        return post

