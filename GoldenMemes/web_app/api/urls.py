from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (PostList, PostDetail, PostCreate, CommentList,
                    CommentDetail, CommentCreate, PostCommentList)

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path(r'comment/', CommentList.as_view(), name='comment_list'),
    path(r'comment/<int:pk>/', CommentDetail.as_view(), name='comment_detail'),

    path(r'post/', PostList.as_view(), name='post_list'),
    path(r'post/<int:pk>/<slug:slug>/', PostDetail.as_view(), name='post_detail'),
    # path(r'post/<int:pk>/', PostDetail.as_view(), name='post_detail'),
    # path(r'post/<slug:slug>/', PostDetailSlug.as_view(), name='post_detail_slug'),
    path(r'post/<int:pk>/comments/', PostCommentList.as_view(), name='post_comments_list'),
    path(r'post/submit/', PostCreate.as_view(), name='post_create'),
    path(r'post/<int:pk>/create-comment/', CommentCreate.as_view(), name='comment_create'),
]
