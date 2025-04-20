from rest_framework import serializers
from django.contrib.auth import get_user_model,authenticate
import re
from .models import UserProfile

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'date_joined', 'is_active']
        extra_kwargs = {'password': {'write_only': True}}
        
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("email is already taken")
        return value
        
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("username is already taken")
        return value
    
    def validate_password (self, value):
        if not re.match(r"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", value):
            raise serializers.ValidationError(
                "Password must be at least 8 characters long and include a number & special character. "
            )
        return value
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.is_active = True
        user.save()
        return user
    
    
class LoginSerializers(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only = True)
    
    def validate(self, attr):
        email = attr.get('email')
        password = attr.get('password')
        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            if not user:
                raise serializers.ValidationError(("invailed email or password"), code = "authorization")
        else:
            raise serializers.ValidationError("must include email and password", code = "authorization")
        attr['user'] = user
        return attr
    
    def __str__(self):
        return f"{self.email} has logged in"
    
    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['bio', 'contact', 'image']
    
    def validate(self, attrs):
        print(f"attr{attrs}")
        if not attrs.get('bio') and not attrs.get('contact'):
            raise serializers.ValidationError('you must provide at least a bio or contact')
        return attrs
    
    def validate_bio(self, value):
        if len(value) > 300:
            raise serializers.validationError('Bio must be less than 300 characters')
        return value
        
    def validate_profileImage(self, value):
        if value:
            if not value.name.endswith(('.png', '.jpg', '.jpeg')):
                raise serializers.ValidationError('image must be a PNG or JPG image.')
            if value.size > 5 * 1024 * 1024: #5 mb
                raise serializers.ValidationError('image size must be under 5MB.')
            return value
    
    
class PublicProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['bio','image']