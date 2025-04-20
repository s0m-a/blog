from rest_framework import serializers
from .models import BlogPost
from .models import Tag,Category, Comment
from accounts.serializers import UserSerializer
from django.utils.text import slugify

class BlogPostSerializers(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = serializers.SlugRelatedField(
        slug_field = 'name',
        queryset = Category.objects.all(),
    )
    tags = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Tag.objects.all(),
        many=True,   # This allows multiple tags to be added
        required=False
    )
    class Meta:
        model = BlogPost
        fields = ['author', 'title', 'content', 'created_at','updated_at','category','tags', 'is_published']
        
    def create(self, validated_data):
            # Automatically generate slug from title
            title = validated_data.get('title')
            slug = slugify(title)
        # Check if the slug already exists, and append a number if it does
            original_slug = slug
            counter = 1
            while BlogPost.objects.filter(slug=slug).exists():
                slug = f"{original_slug}-{counter}"
                counter += 1
            validated_data['slug'] = slug

            tags_data = validated_data.pop('tags', []) #Pulls out tags from the input data or uses an empty list
            blog_post = BlogPost.objects.create(**validated_data)
            for tag_name in tags_data:
            #_: This is a boolean value (True or False) that indicates whether the object was created (True if created, False if it was retrieved).
                tag, _ = Tag.objects.get_or_create(name=tag_name, defaults={'slug': slugify(tag_name)})
                # add() method on the tags field, which is a many-to-many relationship.
                blog_post.tags.add(tag)
            return blog_post
        
    def update(self, instance, validated_data):
         # If the title is updated, auto-generate a new slug.
            if 'title' in validated_data:
                title = validated_data.get('title')
                slug = slugify(title)
                orginal_slug = slug
                counter = 1
                while BlogPost.objects.filter(slug=slug).exists():
                    slug = f'{orginal_slug}-{counter}'
                    counter +=1
                validated_data['slug'] = slug
                
            tags_data = validated_data.pop('tags', None)
         # Update the BlogPost instance with all other validated fields
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            # Save the updated BlogPost instance to the database
            instance.save()
            if tags_data is not None:
             # Clear all existing tags from the instance
                instance.tags.clear()
                for tag_name in tags_data:
                    tag,_ = Tag.objects.get_or_create(name=tag_name)
                    instance.tags.add(tag)
            return instance
        
        
class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    post = serializers.SlugRelatedField(read_only=True, slug_field='slug')
    """
    SerializerMethodField() is used when you want to include a custom value in the 
    serialized output that is not a direct model field.
    """
    post_author = serializers.SerializerMethodField()
    class Meta:
        model=Comment
        fields = ['post', 'user','post_author',"content"]
        """
       method starting with get_ followed by the field name
       obj is an instance of the Comment model
        """
    def get_post_author(self, obj):
        return  obj.post.author.username
