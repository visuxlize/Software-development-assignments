# Week 4 - Design and Construction Begin

**Due:** May 29, 2026
**Phase:** Design and Construction
**Submitted By:** Team 6

---

## Overview

Week 4 was the biggest week of the project. The team produced the Software Design Description (SDD), set up version control on GitHub, and began building the actual system code. By the end of this week the architecture skeleton was complete and all major components existed in code even if not fully functional.

---

## Deliverables

### 1. Software Design Description (SDD)
**File:** CEIS400_Team6_SDD.docx

Full IEEE 1016 format SDD covering all 9 sections. Key sections and authors:

**Section 1 - Introduction** (Justin Haag)
Purpose, scope, references, definitions and acronyms.

**Section 2 - System Overview** (Justin Haag)
High-level description of both MMMS modules.

**Section 3 - System Architecture** (Justin Haag)
Summary referencing the Week 3 architecture description.

**Section 4 - Data Dictionary** (Ramon Marrero)
Definitions for all 5 domain classes and key field types.

**Section 5 - System Architecture Detail** (Andres Marte)
Full layered plus OOP architecture explanation with layer summary and rationale table mapping each SRS quality attribute to the architecture.

**Section 6 - Component Design** (Nicole Vaynshtok)
OOA of requirements, static class diagram with attributes and methods, sequence diagram, two design patterns explained:
- Singleton pattern: JWT authentication session - one token per user managed by SimpleJWT
- Factory pattern: Role-based view access - IsSupervisor permission class acts as factory

Design quality review against OOP principles: Single Responsibility, Open/Closed, Separation of Concerns, DRY, Encapsulation.

**Section 7 - Human Interface Design** (Andres Marte)
Six design principles, navigation structure table, detailed description of all six screens, interface response table with 12 user actions and system responses.

**Section 8 - Requirements Matrix** (John DelAtorre)
Cross-reference of every FR number to the component that implements it.

**Section 9 - Appendices**
API endpoint reference table with all 14 endpoints, GitHub repository information.

---

### 2. GitHub Repository Setup
**URL:** https://github.com/visuxlize/Software-development-assignments

The CEIS400 - Maintenance System folder was added to the existing software development assignments repository. All team members can clone the repo using sparse checkout to pull only the CEIS400 folder.

---

### 3. Architecture Framework Code

The full application skeleton was built this week with all files in place.

**Backend (Django REST Framework)**

Files created:
- models.py: Employee, Equipment, Material, Transaction, MaterialRequest models
- serializers.py: serializers for all 5 models
- views.py: LoginView, EquipmentListView, CheckoutView, ReturnView, MyEquipmentView, MaterialSearchView, MaterialRequestView, SupervisorDashboardView, ApproveRequestView, EmployeeManageView, EmployeeDeleteView, TransactionListView
- urls.py: 14 API endpoints mapped to views

**Frontend (React 18)**

Files created:
- main.jsx: app entry point with routing and AuthProvider
- context/AuthContext.jsx: JWT token management
- components/Nav.jsx: shared navigation bar
- pages/Login.jsx: employee ID and password entry
- pages/Dashboard.jsx: employee home screen
- pages/Checkout.jsx: tool ID entry and available tools grid
- pages/Return.jsx: checked-out tools list and condition selector
- pages/Materials.jsx: dual warehouse search and request submission
- pages/Supervisor.jsx: tabbed dashboard with employees, equipment, transactions
- mock/api.js: in-memory mock data for frontend testing before backend connects

---

### 4. Construction Status Report

Overall completion at end of Week 4: approximately 75%

| Component | Status |
|-----------|--------|
| Django models and migrations | Complete |
| Django serializers | Complete |
| Django views - all endpoints | Complete |
| Database seed data | Complete |
| React project structure | Complete |
| All React pages | Complete |
| React to Django API connection | In Progress - 50% |
| Offline sync module | Not started |
