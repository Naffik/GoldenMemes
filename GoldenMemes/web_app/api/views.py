from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import generics, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.views import APIView
from web_app.models import Post, Comment, Like, DisLike
from user_app.models import UserProfile
from .serializers import PostSerializer, CommentSerializer, PostCreateSerializer
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
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['post_author__username', 'title']
    search_fields = ['^title', 'tags__name']
    ordering_fields = ['title', 'tags__name', 'id', 'created', 'like', 'dislike']


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
    serializer_class = PostCreateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.all()

    def perform_create(self, serializer):
        post_author = self.request.user
        serializer.save(post_author=post_author)


class PostFavAdd(APIView):
    permission_classes = [IsAuthenticated]
    bad_request_message = 'An error has occurred'

    def post(self, request):
        post = get_object_or_404(Post, pk=request.data.get('pk'))
        user = UserProfile.objects.get(user=request.user)
        if user not in post.favourites.all():
            post.favourites.add(user)
            return Response({'detail': 'User added to post'}, status=status.HTTP_200_OK)
        return Response({'detail': self.bad_request_message}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        post = get_object_or_404(Post, pk=request.data.get('pk'))
        user = UserProfile.objects.get(user=request.user)
        if user in post.favourites.all():
            post.favourites.remove(user)
            return Response({'detail': 'User removed from post'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'detail': self.bad_request_message}, status=status.HTTP_400_BAD_REQUEST)


class PostLike(APIView):
    permission_classes = [IsAuthenticated]
    bad_request_message = 'An error has occurred'

    def post(self, request, *args, **kwargs):
        post_pk = self.kwargs.get('pk')
        opinion = self.kwargs.get('opinion')

        post = get_object_or_404(Post, pk=post_pk)

        try:
            post.dis_like
        except Post.dis_like.RelatedObjectDoesNotExist as e:
            DisLike.objects.create(post=post)

        try:
            post.like
        except Post.like.RelatedObjectDoesNotExist as e:
            Like.objects.create(post=post)

        if opinion.lower() == 'like':
            if request.user in post.like.users.all():
                post.like.users.remove(request.user)
                return Response({'detail': 'User removed like'}, status=status.HTTP_204_NO_CONTENT)
            else:
                post.like.users.add(request.user)
                post.dis_like.users.remove(request.user)
                return Response({'detail': 'User added like'}, status=status.HTTP_200_OK)

        elif opinion.lower() == 'dis_like':
            if request.user in post.dis_like.users.all():
                post.dis_like.users.remove(request.user)
                return Response({'detail': 'User removed dis_like'}, status=status.HTTP_204_NO_CONTENT)
            else:
                post.dis_like.users.add(request.user)
                post.like.users.remove(request.user)
                return Response({'detail': 'User added dis_like'}, status=status.HTTP_200_OK)

        else:
            return Response({'detail': self.bad_request_message}, status=status.HTTP_400_BAD_REQUEST)


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

