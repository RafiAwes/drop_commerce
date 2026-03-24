import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from .managers import CustomUserManager
# Create your models here.
class RoleChoice(models.TextChoices):
    USER = 'USER', 'User'
    ADMIN_SUPER = 'ADMIN_SUPER', 'Super'
    ADMIN_EDITOR = 'ADMIN_EDITOR', 'Editor'
    ADMIN_SUPPORT = 'ADMIN_SUPPORT', 'Support'

class TierChoices(models.TextChoices):
    BRONZE = 'BRONZE', 'Bronze'
    SILVER = 'SILVER', 'Silver'
    GOLD = 'GOLD', 'Gold'


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    role = models.CharField(max_length=20, choices=RoleChoice.choices, default=RoleChoice.USER)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    def __str__(self):
        return self.email

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    reward_points = models.IntegerField(default=0)
    tier_level = models.CharField(
        max_length=10, 
        choices=TierChoices.choices, 
        default=TierChoices.BRONZE
    )
    order_status_notifications = models.BooleanField(default=True)
    marketing_notifications = models.BooleanField(default=False)
    avatar_url = models.URLField(max_length=500, blank=True, null=True)

    def __str__(self):
        return f"{self.user.email} Profile"