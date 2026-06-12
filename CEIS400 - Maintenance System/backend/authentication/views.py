from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Employee
from .serializers import EmployeeSerializer, EmployeeCreateSerializer


class LoginView(APIView):
    """POST /api/auth/login/  { emp_id, password }

    Looks up the Employee by empID, checks the password against the linked
    Django User, and returns JWT access/refresh tokens plus the user info
    the frontend stores (empID, firstName, lastName, role).
    """
    permission_classes = [AllowAny]

    def post(self, request):
        emp_id = request.data.get('emp_id')
        password = request.data.get('password')

        if not emp_id or not password:
            return Response({'error': 'Employee ID and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            employee = Employee.objects.select_related('user').get(empID__iexact=emp_id)
        except Employee.DoesNotExist:
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        user = authenticate(username=employee.user.username, password=password)
        if user is None:
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)

        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'empID': employee.empID,
                'firstName': employee.firstName,
                'lastName': employee.lastName,
                'role': employee.role,
            },
        })


class EmployeeListCreateView(generics.ListCreateAPIView):
    """GET  /api/supervisor/employees/  -> list all employees
    POST /api/supervisor/employees/  -> create a new employee + login"""
    queryset = Employee.objects.all().order_by('empID')
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return EmployeeCreateSerializer
        return EmployeeSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        employee = serializer.save()
        return Response(EmployeeSerializer(employee).data, status=status.HTTP_201_CREATED)


class EmployeeDeleteView(generics.DestroyAPIView):
    """DELETE /api/supervisor/employees/<id>/  -> remove an employee (and their User)."""
    queryset = Employee.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_destroy(self, instance):
        user = instance.user
        instance.delete()
        user.delete()
