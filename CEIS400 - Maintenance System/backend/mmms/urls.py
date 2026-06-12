"""
URL configuration for mmms project.
"""
from django.contrib import admin
from django.urls import path, include
from authentication.views import LoginView


urlpatterns = [
    path('admin/', admin.site.urls),

    # API used by the React frontend
    path('api/', include('equipment.urls')),
    path('api/', include('authentication.urls')),
]
