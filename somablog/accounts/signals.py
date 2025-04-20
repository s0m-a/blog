"""
signal for automatically creating a profile for user when they register
"""
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomerUser, UserProfile

"""
  @receiver:Listen to the event “CustomerUser was saved”
  if created: makes sure we only react on new user creation
"""
@receiver(post_save, sender=CustomerUser)
def create_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    else:
        instance.profile.save()