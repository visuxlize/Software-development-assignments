from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    """Used for listing employees on the Supervisor page."""

    class Meta:
        model = Employee
        fields = ['id', 'empID', 'firstName', 'lastName', 'role']


class EmployeeCreateSerializer(serializers.ModelSerializer):
    """Used when a supervisor adds a new employee. Accepts a plaintext
    password and creates both the Django User and the Employee profile."""

    password = serializers.CharField(write_only=True)

    class Meta:
        model = Employee
        fields = ['empID', 'firstName', 'lastName', 'role', 'password']

    def validate_empID(self, value):
        if Employee.objects.filter(empID__iexact=value).exists():
            raise serializers.ValidationError('An employee with this ID already exists.')
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        empID = validated_data['empID']

        user = User.objects.create_user(
            username=empID,
            password=password,
            first_name=validated_data['firstName'],
            last_name=validated_data['lastName'],
        )

        employee = Employee.objects.create(user=user, **validated_data)
        return employee
