from rest_framework import serializers
from .models import Equipment, EquipmentCheckout


class EquipmentSerializer(serializers.ModelSerializer):
    """Serializes Equipment using the same field names the frontend expects
    (equipID, equipName, equipDesc, quantTotal, quantAvail)."""

    class Meta:
        model = Equipment
        fields = ['id', 'equipID', 'equipName', 'equipDesc', 'quantTotal', 'quantAvail']


class EquipmentCheckoutSerializer(serializers.ModelSerializer):
    equipID = serializers.CharField(source='equipment.equipID', read_only=True)
    equipName = serializers.CharField(source='equipment.equipName', read_only=True)
    quantTotal = serializers.IntegerField(source='equipment.quantTotal', read_only=True)
    quantAvail = serializers.IntegerField(source='equipment.quantAvail', read_only=True)

    class Meta:
        model = EquipmentCheckout
        fields = ['id', 'equipID', 'equipName', 'quantTotal', 'quantAvail', 'checkedOutAt', 'returnedAt']
