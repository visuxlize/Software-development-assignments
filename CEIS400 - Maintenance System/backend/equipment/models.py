from django.db import models
from authentication.models import Employee


class Equipment(models.Model):
    """A piece of equipment/tool that employees can check out and return.

    Field names intentionally match the frontend (camelCase) and Nicole's
    UML class diagram so the React app can talk to this API with no
    translation layer.
    """
    equipID = models.CharField(max_length=20, unique=True)
    equipName = models.CharField(max_length=200)
    equipDesc = models.CharField(max_length=200, blank=True, default='')
    quantTotal = models.IntegerField()
    quantAvail = models.IntegerField()

    def __str__(self):
        return f"{self.equipID} - {self.equipName}"


class EquipmentCheckout(models.Model):
    """Tracks which employee currently has which piece of equipment.

    A row with returnedAt=None means the item is still checked out.
    This is the "Equipment Checkout" class from Nicole's diagram.
    """
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE, related_name='checkouts')
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='checkouts')
    checkedOutAt = models.DateTimeField(auto_now_add=True)
    returnedAt = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        status = 'returned' if self.returnedAt else 'checked out'
        return f"{self.equipment.equipID} -> {self.employee.empID} ({status})"
