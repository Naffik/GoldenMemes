from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from web_app.models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from web_app.api.permissions import AdminOrReadOnly, CommentUserOrReadOnly


class PostVS(viewsets.ViewSet):

    def list(self, request):
        queryset = Post.objects.all()
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Post.objects.all()
        post = get_object_or_404(queryset, pk=pk)
        serializer = PostSerializer(post)
        return Response(serializer.data)

    def create(self, request):
        serializer = PostSerializer(data=request.data)
        post_user = self.request.user
        if serializer.is_valid():
            serializer.save(post_author=post_user)
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

    def update(self, request, pk):
        queryset = Post.objects.get(pk=pk)
        serializer = PostSerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

    def destroy(self, request, pk):
        queryset = Post.objects.get(pk=pk)
        queryset.delete()
        return Response(status=204)


class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    # def get_queryset(self):
    #     pk = self.kwargs.get('pk')
    #     comment_author = self.request.user
    #     return Comment.objects.filter(post=pk, comment_author=comment_author)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [CommentUserOrReadOnly]


class CommentCreate(generics.CreateAPIView):
    serializer_class = CommentSerializer

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
