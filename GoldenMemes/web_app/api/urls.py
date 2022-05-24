from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import PostVS, CommentList, CommentDetail, CommentCreate


router = DefaultRouter()
router.register('post', PostVS, basename='posts')
# router.register(r'comment', CommentVS, basename='comments')

urlpatterns = [
    path('', include(router.urls)),
    path(r'comment/', CommentList.as_view(), name='comment-list'),
    path(r'comment/<int:pk>/', CommentDetail.as_view(), name='comment-detail'),
    path(r'post/<int:pk>/create-comment/', CommentCreate.as_view(), name='comment-create'),
]
