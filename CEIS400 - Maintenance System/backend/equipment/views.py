from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from authentication.models import Employee
from .models import Equipment, EquipmentCheckout
from .serializer import EquipmentSerializer


class EquipmentViewSet(viewsets.ModelViewSet):
    """CRUD for equipment, plus three extra actions used by the frontend:

    - POST /api/equipment/checkout/  { equipID }  -> check a tool out
    - POST /api/equipment/return/    { equipID }  -> return a checked-out tool
    - GET  /api/equipment/mine/                   -> tools the logged-in user has out
    """
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'])
    def checkout(self, request):
        equip_id = request.data.get('equipID')
        if not equip_id:
            return Response({'error': 'equipID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            equipment = Equipment.objects.get(equipID=equip_id)
        except Equipment.DoesNotExist:
            return Response({'error': f'No equipment found with ID {equip_id}.'}, status=status.HTTP_404_NOT_FOUND)

        if equipment.quantAvail <= 0:
            return Response({'error': f'{equipment.equipName} is not available right now.'}, status=status.HTTP_400_BAD_REQUEST)

        employee = Employee.objects.get(user=request.user)

        equipment.quantAvail -= 1
        equipment.save()
        EquipmentCheckout.objects.create(equipment=equipment, employee=employee)

        return Response({'message': f'{equipment.equipName} ({equipment.equipID}) checked out successfully.'})

    @action(detail=False, methods=['post'], url_path='return')
    def return_equipment(self, request):
        equip_id = request.data.get('equipID')
        if not equip_id:
            return Response({'error': 'equipID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            equipment = Equipment.objects.get(equipID=equip_id)
        except Equipment.DoesNotExist:
            return Response({'error': f'No equipment found with ID {equip_id}.'}, status=status.HTTP_404_NOT_FOUND)

        employee = Employee.objects.get(user=request.user)

        checkout = EquipmentCheckout.objects.filter(
            equipment=equipment, employee=employee, returnedAt__isnull=True
        ).first()

        if checkout is None:
            return Response({'error': f'You do not have {equipment.equipName} checked out.'}, status=status.HTTP_400_BAD_REQUEST)

        checkout.returnedAt = timezone.now()
        checkout.save()

        if equipment.quantAvail < equipment.quantTotal:
            equipment.quantAvail += 1
            equipment.save()

        return Response({'message': f'{equipment.equipName} ({equipment.equipID}) returned successfully.'})

    @action(detail=False, methods=['get'])
    def mine(self, request):
        employee = Employee.objects.get(user=request.user)
        checkouts = EquipmentCheckout.objects.filter(employee=employee, returnedAt__isnull=True)

        data = [{
            'equipID': c.equipment.equipID,
            'equipName': c.equipment.equipName,
            'quantTotal': c.equipment.quantTotal,
            'quantAvail': c.equipment.quantAvail,
        } for c in checkouts]

        return Response(data)
