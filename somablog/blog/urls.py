from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogPostViewSets, CommentView

# A router automatically generates URL patterns for your API views (viewsets)
router = DefaultRouter()
router.register(r'posts', BlogPostViewSets)  # This creates endpoints like /posts/ and /posts/{pk}/

urlpatterns = [
    path('', include(router.urls)),  # These include the router URLs at the root, e.g., /posts/...
    path('comments/<slug:slug>/', CommentView.as_view(), name='create-comment'),
]
