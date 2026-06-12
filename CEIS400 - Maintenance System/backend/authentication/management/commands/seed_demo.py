from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from authentication.models import Employee
from equipment.models import Equipment


class Command(BaseCommand):
    """Creates the demo employees and equipment used by the frontend's
    Login screen (E001-E003, S001, password 'pass1234') and a starter
    set of tools so Checkout/Return have something to work with.

    Run with: python manage.py seed_demo
    """
    help = 'Seed demo employees and equipment for local testing.'

    def handle(self, *args, **options):
        demo_employees = [
            ('E001', 'Carlos', 'Reyes', 'employee'),
            ('E002', 'Dana', 'Kim', 'employee'),
            ('E003', 'Mike', 'Owens', 'employee'),
            ('S001', 'Sam', 'Bennett', 'supervisor'),
        ]

        for emp_id, first, last, role in demo_employees:
            if Employee.objects.filter(empID=emp_id).exists():
                self.stdout.write(f'Skipping {emp_id}, already exists.')
                continue

            user = User.objects.create_user(
                username=emp_id,
                password='pass1234',
                first_name=first,
                last_name=last,
            )
            Employee.objects.create(user=user, empID=emp_id, firstName=first, lastName=last, role=role)
            self.stdout.write(self.style.SUCCESS(f'Created employee {emp_id} ({first} {last}, {role})'))

        demo_equipment = [
            ('T001', 'Cordless Drill', '18V cordless drill with battery pack', 3, 3),
            ('T002', 'Angle Grinder', '4.5 inch angle grinder', 2, 2),
            ('T003', 'Ladder (8ft)', 'Fiberglass step ladder, 8 feet', 4, 4),
            ('T004', 'Torque Wrench', '1/2 inch drive, 10-150 ft-lb', 2, 2),
        ]

        for equip_id, name, desc, total, avail in demo_equipment:
            if Equipment.objects.filter(equipID=equip_id).exists():
                self.stdout.write(f'Skipping {equip_id}, already exists.')
                continue

            Equipment.objects.create(
                equipID=equip_id, equipName=name, equipDesc=desc,
                quantTotal=total, quantAvail=avail,
            )
            self.stdout.write(self.style.SUCCESS(f'Created equipment {equip_id} ({name})'))
