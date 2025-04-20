from django.db import models
import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin,Group, Permission
from django.conf import settings

class CustomeUserManger(BaseUserManager):
    def create_user(self,email, password=None, **values): #create_user is a builtin method
        if not email:
            raise Exception("the email feild must be set")
        print(f"values:  {values}")
        email = self.normalize_email(email)
        user = self.model(email=email, **values)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **values): #create_superuser is a builtin method
        user = self.create_user(email, password, **values)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user        

class CustomerUser(AbstractBaseUser, PermissionsMixin):
   id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
   username = models.CharField(max_length=250, unique=True, null=False)
   email = models.EmailField(max_length=254, unique=True, null=False)
   password = models.CharField(max_length=128, null=False)
   first_name = models.CharField(max_length=100, null=True)
   last_name = models.CharField(max_length=100, null=True)
   date_joined = models.DateField(auto_now_add=True)
   is_active = models.BooleanField(default=True)
   is_staff = models.BooleanField(default=False)

   groups = models.ManyToManyField( #This creates a relationship where a user can belong to multiple groups
        Group, # This links to the Group model provided by Django  for managing user groups and their permissions.
        related_name="customuser_groups",  # Prevents conflict with auth.User.groups
        blank=True, # This means the user can have no groups (optional)
    )
   user_permissions = models.ManyToManyField( #This creates a relationship where a user can have multiple specific permissions. 
        Permission, # This links to the Permission model provided by Django and  represents various actions a user can perform.
        related_name="customuser_permissions",  # Prevents conflict with auth.User.user_permissions
        blank=True, # This means the user can have no specific permissions (optional)
    )
   objects = CustomeUserManger()
   USERNAME_FIELD = 'email'
   REQUIRED_FIELDS=["username"]
   
   
   def __str__(self):
       return f'{self.username}'
   
   
class UserProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True)
    image = models.ImageField(upload_to= 'profile_image/', blank=True, null=True)
    contact = models.CharField(max_length=100, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return f"{self.user.username}'s profile"