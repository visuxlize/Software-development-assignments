from django.db import models
from django.contrib.auth.models import User


class Employee(models.Model):
    """Profile information layered on top of Django's built-in User model.

    The User model still handles the actual password/auth, but the frontend
    and Nicole's diagram talk in terms of empID/firstName/lastName/role, so
    this model stores those fields directly.
    """
    ROLE_CHOICES = [
        ('employee', 'Employee'),
        ('supervisor', 'Supervisor'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='employee')
    empID = models.CharField(max_length=20, unique=True)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='employee')

    def __str__(self):
        return f"{self.empID} - {self.firstName} {self.lastName} ({self.role})"
