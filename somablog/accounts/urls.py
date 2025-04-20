from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterUserView.as_view(), name='register_user'),
    path('login/', views.LoginAPIView.as_view(), name='login_user'),
    path('profile/', views.OwnProfileAPIView.as_view(), name='own_profile'),
    path('profile/<str:username>/', views.UserProfileAPIView.as_view(), name='user_profile'),
    path('check-auth/', views.CheckAuthAPIView.as_view(), name='check-auth'),
    path('logout/', views.LogoutAPIView.as_view(), name='logout'),
    path('refresh/', views.RefreshTokenView.as_view(), name='token_refresh'),
]