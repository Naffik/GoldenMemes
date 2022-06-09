from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from web_app.models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from web_app.api.permissions import IsAdminOrReadOnly, IsCommentUserOrReadOnly, IsPostUserOrReadOnly
from web_app.api.pagination import PostPagination


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
        return Post.objects.filter(pk=self.kwargs.get('pk'))

    def perform_destroy(self, instance):
        instance.image.delete()
        instance.delete()

    def perform_update(self, serializer):
        post = Post.objects.get(pk=self.kwargs.get('pk'))
        try:
            post.image.delete()
        except FileNotFoundError:
            pass
        serializer.save()


class PostDetailSlug(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'
    permission_classes = [IsPostUserOrReadOnly]

    def get_queryset(self, *args, **kwargs):
        slug = self.kwargs.get('slug')
        return Post.objects.filter(slug=slug)

    def perform_destroy(self, instance):
        instance.image.delete()
        instance.delete()

    def perform_update(self, serializer):
        post = Post.objects.get(slug=self.kwargs.get('slug'))
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
        post_id = Post.objects.get(pk=pk)

        comment_user = self.request.user

        post_id.number_of_comments = post_id.number_of_comments + 1
        post_id.save()

        serializer.save(post=post_id, comment_author=comment_user)
