from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from rest_framework.throttling import UserRateThrottle
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from web_app.models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from web_app.api.permissions import IsAdminOrReadOnly, IsCommentUserOrReadOnly, IsPostUserOrReadOnly
from web_app.api.pagination import PostPagination


class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = PostPagination



class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsPostUserOrReadOnly]


class PostCreate(generics.CreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.all()

    def perform_create(self, serializer):
        post_author = self.request.user
        serializer.save(post_author=post_author)

# class PostVS(viewsets.ViewSet):
#     permission_classes = [IsAuthenticated]
#
#     def list(self, request):
#         queryset = Post.objects.all()
#         serializer = PostSerializer(queryset, many=True)
#         return Response(serializer.data)
#
#     def retrieve(self, request, pk=None):
#         queryset = Post.objects.all()
#         post = get_object_or_404(queryset, pk=pk)
#         serializer = PostSerializer(post)
#         return Response(serializer.data)
#
#     def create(self, request):
#         serializer = PostSerializer(data=request.data)
#         post_user = self.request.user
#         if serializer.is_valid():
#             serializer.save(post_author=post_user)
#             return Response(serializer.data)
#         else:
#             return Response(serializer.errors)
#
#     def update(self, request, pk):
#         queryset = Post.objects.get(pk=pk)
#         serializer = PostSerializer(queryset, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             return Response(serializer.errors)
#
#     def destroy(self, request, pk):
#         queryset = Post.objects.get(pk=pk)
#         queryset.delete()
#         return Response(status=204)


class PostCommentList(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['comment_author__username', 'post__title']

    def get_queryset(self):
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
        post_id = Post.objects.get(pk=pk)

        comment_user = self.request.user
        # comment_queryset = Comment.objects.filter(post=post_id, comment_author=comment_user)
        #
        # if comment_queryset.exists():
        #     raise ValidationError("You cannot comment this post!")

        post_id.number_of_comments = post_id.number_of_comments + 1
        post_id.save()

        serializer.save(post=post_id, comment_author=comment_user)


# class CommentVS(viewsets.ViewSet):
#
#     def list(self, request):
#         queryset = Comment.objects.all()
#         serializer = CommentSerializer(queryset, many=True)
#         return Response(serializer.data)
#
#     def retrieve(self, request, pk=None):
#         queryset = Comment.objects.all()
#         comment = get_object_or_404(queryset, pk=pk)
#         serializer = CommentSerializer(comment)
#         return Response(serializer.data)
#
#     def create(self, request):
#         serializer = CommentSerializer(data=request.data)
#         print(self.kwargs.get('pk'))
#         # post = Post.objects.get(pk=self.objects.pk)
#         comment_author = self.request.user
#         # print(comment_author)
#         # comment_queryset = Comment.objects.filter(post=post, comment_author=comment_author)
#         #
#         # if comment_queryset.exists():
#         #     raise ValidationError("You cannot comment this post!")
#
#         if serializer.is_valid():
#             serializer.save(comment_author=comment_author)
#             return Response(serializer.data)
#         else:
#             return Response(serializer.errors)
#
#     def update(self, request, pk):
#         queryset = Comment.objects.get(pk=pk)
#         serializer = CommentSerializer(queryset, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             return Response(serializer.errors)
#
#     def destroy(self, request, pk):
#         queryset = Comment.objects.get(pk=pk)
#         queryset.delete()
#         return Response(status=204)
