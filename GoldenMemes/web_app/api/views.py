from django.db.models import Exists, OuterRef
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
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
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    pagination_class = PostPagination

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            profile = UserProfile.objects.get(user=user)
            post = Post.objects.annotate(is_liked=Exists(Like.objects.filter(users=user, post=OuterRef('pk'))),
                                         is_disliked=Exists(DisLike.objects.filter(users=user, post=OuterRef('pk'))),
                                         is_favourite=Exists(Post.objects.filter(favourites=profile))).order_by('pk')
        else:
            post = Post.objects.all().order_by('pk')
        return post


class PostSearch(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    pagination_class = PostPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['post_author__username', 'title']
    search_fields = ['^title']
    ordering_fields = ['title', 'created', 'like', 'dislike']

    def get_queryset(self, *args, **kwargs):
        my_tags = []
        tags = self.request.data.get('tags')
        if tags is not None:
            for x in tags.split(','):
                my_tags.append(x)
            qs = Post.objects.filter(tags__name__in=my_tags)
        else:
            qs = Post.objects.all()

        return qs


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
            post.dislike
        except Post.dislike.RelatedObjectDoesNotExist as e:
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
                post.dislike.users.remove(request.user)
                return Response({'detail': 'User added like'}, status=status.HTTP_200_OK)

        elif opinion.lower() == 'dislike':
            if request.user in post.dislike.users.all():
                post.dislike.users.remove(request.user)
                return Response({'detail': 'User removed dislike'}, status=status.HTTP_204_NO_CONTENT)
            else:
                post.dislike.users.add(request.user)
                post.like.users.remove(request.user)
                return Response({'detail': 'User added dislike'}, status=status.HTTP_200_OK)

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
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = PostPagination

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            profile = UserProfile.objects.get(user=user)
            post = Post.objects.annotate(is_liked=Exists(Like.objects.filter(users=user, post=OuterRef('pk'))),
                                         is_disliked=Exists(DisLike.objects.filter(users=user, post=OuterRef('pk'))),
                                         is_favourite=Exists(Post.objects.filter(favourites=profile))).order_by('like')
        else:
            post = Post.objects.all().order_by('like')
        return post


class PostListNew(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = PostPagination

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            profile = UserProfile.objects.get(user=user)
            post = Post.objects.new().annotate(is_liked=Exists(Like.objects.filter(users=user, post=OuterRef('pk'))),
                                         is_disliked=Exists(DisLike.objects.filter(users=user, post=OuterRef('pk'))),
                                         is_favourite=Exists(Post.objects.filter(favourites=profile)))
        else:
            post = Post.objects.new()
        return post


class PostListFresh(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = PostPagination

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            profile = UserProfile.objects.get(user=user)
            post = Post.objects.accepted().annotate(is_liked=Exists(Like.objects.filter(users=user, post=OuterRef('pk'))),
                                         is_disliked=Exists(DisLike.objects.filter(users=user, post=OuterRef('pk'))),
                                         is_favourite=Exists(Post.objects.filter(favourites=profile)))
        else:
            post = Post.objects.accepted()
        return post


class PostListHot(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = PostPagination

    def get_queryset(self):
        today = date.today()
        week = today + timedelta(days=-7)
        user = self.request.user
        if user.is_authenticated:

            profile = UserProfile.objects.get(user=user)
            post = Post.objects.annotate(is_liked=Exists(Like.objects.filter(users=user, post=OuterRef('pk'))),
                                         is_disliked=Exists(DisLike.objects.filter(users=user, post=OuterRef('pk'))),
                                         is_favourite=Exists(Post.objects.filter(favourites=profile))
                                         ).filter(created__gte=week, status='accepted').order_by('like')
        else:
            post = Post.objects.filter(created__gte=week, status='accepted').order_by('like')
        return post
