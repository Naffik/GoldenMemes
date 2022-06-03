from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import PostList, PostDetail, PostCreate, CommentList, CommentDetail, CommentCreate, PostCommentList

router = DefaultRouter()
# router.register('post', PostVS, basename='posts')
# router.register(r'comment', CommentVS, basename='comments')

urlpatterns = [
    path('', include(router.urls)),
    path(r'comment/', CommentList.as_view(), name='comment-list'),
    path(r'comment/<int:pk>/', CommentDetail.as_view(), name='comment-detail'),

    path(r'post/', PostList.as_view(), name='post-list'),
    path(r'post/<int:pk>/', PostDetail.as_view(), name='post-detail'),
    path(r'post/<int:pk>/comments/', PostCommentList.as_view(), name='post-comments-list'),
    path(r'post/create-post/', PostCreate.as_view(), name='post-create'),
    path(r'post/<int:pk>/create-comment/', CommentCreate.as_view(), name='comment-create'),
]
