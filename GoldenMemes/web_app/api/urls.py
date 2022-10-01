from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (PostList, PostDetail, PostCreate, CommentList, PostListBest, PostListFresh, PostListNew,
                    PostListHot, CommentDetail, CommentCreate, PostCommentList, PostRandom, PostFavAdd, PostLike,
                    PostSearch)

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path(r'comment/', CommentList.as_view(), name='comment-list'),
    path(r'comment/<int:pk>/', CommentDetail.as_view(), name='comment-detail'),

    path(r'post/', PostList.as_view(), name='post-list'),
    path(r'post/img/<int:pk>/<slug:slug>/', PostDetail.as_view(), name='post-detail'),
    path(r'post/<int:pk>/comments/', PostCommentList.as_view(), name='post_comments-list'),
    path(r'post/<str:opinion>/<int:pk>/', PostLike.as_view(), name='post-like'),
    path(r'post/submit/', PostCreate.as_view(), name='post-create'),
    path(r'post/search/', PostSearch.as_view(), name='post-search'),
    path(r'post/<int:pk>/create-comment/', CommentCreate.as_view(), name='comment-create'),
    path(r'post/random/<status>/', PostRandom.as_view(), name='post-random'),
    path(r'post/best/', PostListBest.as_view(), name='post-list-best'),
    path(r'post/new/', PostListNew.as_view(), name='post-list-fresh'),
    path(r'post/fresh/', PostListFresh.as_view(), name='post-list-fresh'),
    path(r'post/hot/', PostListHot.as_view(), name='post-list-hot'),
    path(r'post/fav/', PostFavAdd.as_view(), name='post-fav-add'),
]