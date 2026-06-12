from django.urls import path
from .views import LoginView, EmployeeListCreateView, EmployeeDeleteView

urlpatterns = [
    path('auth/login/', LoginView.as_view(), name='login'),
    path('supervisor/employees/', EmployeeListCreateView.as_view(), name='employee-list-create'),
    path('supervisor/employees/<int:pk>/', EmployeeDeleteView.as_view(), name='employee-delete'),
]
