from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path
from user_app.api.views import registration_view, UserProfileDetail, UserProfileList
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # path('login/', obtain_auth_token, name='login'),
    # path('logout/', logout_view, name='logout'),

    path('register/', registration_view, name='register'),
    path('profile/<str:user>/', UserProfileDetail.as_view(), name='profile'),
    path('profile/', UserProfileList.as_view(), name='profile-list'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
