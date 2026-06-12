# Running MMMS locally (backend + frontend)

This wires up Nicole's class diagram, the Django backend, and Andres's React
frontend so they all use the same field names (equipID, equipName, equipDesc,
quantTotal, quantAvail, empID, firstName, lastName, role).

## 1. Backend (Django)

From inside `MMMS 8.01.22 PM/`:

```
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py seed_demo
python manage.py runserver
```

This starts the API at http://localhost:8000. `seed_demo` creates the demo
logins used by the frontend's Login page:

- E001 / Carlos, E002 / Dana, E003 / Mike (role: employee)
- S001 / Sam (role: supervisor)
- password for all of them: pass1234

It also creates 4 starter tools (T001-T004) so Checkout/Return have data.

## 2. Frontend (React + Vite)

In a second terminal, from `frontend/`:

```
npm install
npm run dev
```

Open http://localhost:3000. The Vite dev server proxies `/api/*` requests to
http://localhost:8000, so the two run side by side.

## 3. Try it out

- Log in as E001 (employee) -> Dashboard -> Check Out a tool -> Return it.
- Log out, log in as S001 (supervisor) -> Supervisor page -> add/remove
  employees and equipment.

## What was added to the backend

- `equipment/models.py`: Equipment now uses equipID/equipName/equipDesc/
  quantTotal/quantAvail (matches Nicole's diagram and the frontend). Added
  EquipmentCheckout to track who has what checked out.
- `equipment/views.py`: kept the existing CRUD viewset and added three
  actions: `POST /api/equipment/checkout/`, `POST /api/equipment/return/`,
  `GET /api/equipment/mine/`.
- `authentication/models.py`: new Employee model (empID/firstName/lastName/
  role) linked one-to-one with Django's built-in User, which still handles
  passwords.
- `authentication/views.py`: `POST /api/auth/login/` returns JWT tokens plus
  user info; `/api/supervisor/employees/` lists/creates employees, and
  `/api/supervisor/employees/<id>/` deletes one.
- `mmms/settings.py`: added djangorestframework-simplejwt and
  django-cors-headers, configured JWT auth as the default and opened CORS
  for the Vite dev server.
- `mmms/urls.py`: now only routes to the JSON API the React app uses
  (the old server-rendered template views/login pages were not part of the
  React flow and were left out).

Still missing per `MISSING_FEATURES.md` (Materials, approval workflow,
condition reporting, transaction history) - those need new models/endpoints
before the related frontend pages can come back.
