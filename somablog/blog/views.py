from django.shortcuts import render
from rest_framework import viewsets
from .serializers import BlogPostSerializers, CommentSerializer
from .models import BlogPost
from rest_framework import generics, permissions
from django.shortcuts import get_object_or_404

class BlogPostViewSets(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializers
    lookup_field = 'slug' #This tells DRF to use the slug for update or delete instead of the ID
     
    def perform_create(self, serializer):
         serializer.save(author=self.request.user) 
         
"""
generics.CreateAPIView: a class-based view for 
handling HTTP POST requests to create new objects.
perform_create: a builtin
"""    

class CommentView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        # Retrieve the post_slug from the URL kwargs
        post_slug = self.kwargs.get('slug')
        print(f'Received post slug: {post_slug}')  
        post = get_object_or_404(BlogPost, slug=post_slug)
        serializer.save(post=post, user=self.request.user)