# Week 5 - Component Construction

**Due:** June 5, 2026
**Phase:** Construction
**Submitted By:** Team 6

---

## Overview

Week 5 completed the core component construction. The React frontend was fully built and running. The Django backend was complete with all endpoints functional. Nicole's original Python business logic was refactored to use guard clauses and consistent dict returns, then converted into proper Django models and views. The frontend was running on mock data while the backend connection was being finalized.

---

## Deliverables

### 1. Updated Source Code

**Backend refactor**

Nicole's original standalone Python script was reviewed and identified as having two problems. First, all methods were defined outside the MaintenanceSystem class meaning they would throw AttributeError if called. Second, the methods returned plain strings like Equipment Not Found instead of structured data, making them incompatible with a REST API.

The refactored backend consists of four files:

**models.py**
Replaces Nicole's plain Python classes with Django models. Employee uses AbstractBaseUser for secure password hashing. Equipment has a status field (available, checked_out, damaged) replacing the quantAvail/quantTotal pattern since tools are tracked individually by barcode. Transaction records every checkout and return permanently.

**serializers.py**
Converts Django model objects to JSON for React and converts incoming JSON back to Python. EquipmentSerializer includes a computed checked_out_by_name field so React gets a readable name without a second request.

**views.py**
Each view uses guard clauses throughout - check the failure conditions first, return early with an error, happy path at the bottom with no nesting. Every view returns a consistent dict with success boolean and message string so React always does if result.success without string matching.

**urls.py**
14 endpoints mapped to views covering auth, equipment, materials, and all supervisor functions.

---

### 2. Frontend - Standalone React App

The frontend was built as a standalone application using mock data so it could be developed and tested independently of the backend.

**mock/api.js**
In-memory mock that simulates all API responses. All mock functions use a small delay to feel like real network requests. When Nicole finishes the backend connection, this file gets replaced with real Axios calls.

**Pages built:**
- Login: ID and password entry with demo chips and role-based redirect
- Dashboard: checked-out tools table and quick navigation
- Checkout: tool ID input with available tools grid that auto-fills on click
- Return: radio button tool selection with condition selector
- Materials: dual warehouse search with transfer and order request buttons
- Supervisor: tabbed interface for employees, equipment, and transaction history with add/remove modals

**To run the frontend standalone (no backend needed):**
```
cd frontend
npm install
npm run dev
```
Open http://localhost:3000 and use any demo ID with password pass1234.

---

### 3. Design Pattern Implementation Notes

**Singleton - JWT Authentication Session**
Implemented in AuthContext.jsx. One JWT token is created on login and stored in localStorage. Every request reuses that token. Token expiration is controlled by ACCESS_TOKEN_LIFETIME in Django settings.

**Factory - Role-Based View Access**
Implemented as the IsSupervisor permission class in views.py. Returns 403 automatically if the user role is not supervisor. React reads user.role from AuthContext and conditionally renders the Supervisor nav link.

---

## Team Notes

The frontend and backend were built in parallel this week. The mock API in the frontend matches the exact shape of the real Django API responses so the swap from mock to real will be a direct replacement with no changes to the page logic.
