from django.contrib import admin
from .models import CustomerUser, UserProfile
# Register your models here.
admin.site.register(CustomerUser)
admin.site.register(UserProfile)