# CEIS400 - Software Engineering
## GB Maintenance Management System (MMMS)
### Team 6 - Course Deliverables

**School:** DeVry University
**Course:** CEIS400 - Software Engineering
**Semester:** Spring 2026
**Team Members:** John DelAtorre, Justin Haag, Ramon Marrero, Andres Marte, Nicole Vaynshtok

---

## Project Summary

The GB Maintenance Management System (MMMS) is a full-stack web application built for GB Manufacturing's maintenance department of approximately 200 employees in New York City. The system replaces a fully manual paper-based equipment tracking process that was costing the company over $50,000 in lost equipment annually and generating excessive duplicate materials orders.

The MMMS has two core modules:

- Equipment Checkout and Return - employees scan their ID card barcode to log in, check out tools by scanning a barcode, return equipment, and report damaged items. Supervisors receive alerts for overdue equipment and manage the employee and equipment database.
- Materials Warehouse Search - employees search both the Main Warehouse and Small Warehouse simultaneously from one screen instead of physically visiting both locations.

---

## Tech Stack

- Frontend: React 18 + Vite + React Router
- Backend: Django REST Framework + SimpleJWT
- Database: SQLite (development) / PostgreSQL (production)
- Auth: JWT tokens with role-based access control

---

## Weekly Deliverables

| Week | Deliverable | Status |
|------|-------------|--------|
| Week 1 | Business Problem Scenario, SRS, Use Cases, Project Plan | Complete |
| Week 2 | Use Case Descriptions, Use Case Diagram, Class Diagram, VOPC Matrix | Complete |
| Week 3 | Software Architecture Description | Complete |
| Week 4 | Software Design Description (SDD), Architecture Framework Code | Complete |
| Week 5 | Component Construction, Frontend and Backend Code | Complete |
| Week 6 | Test Cases Document | Complete |
| Week 7 | Initial Test Report, Updated Test Report, Team Charter | Complete |

---

## Folder Structure

```
CEIS400 - Maintenance System/
  Course Deliverables/
    README.md                  (this file)
    Week1-README.md
    Week2-README.md
    Week3-README.md
    Week4-README.md
    Week5-README.md
    Week6-README.md
    Week7-README.md
  backend/                     (Django REST Framework)
  frontend/                    (React 18 + Vite)
```

---

## How to Run

See the main project README in the CEIS400 - Maintenance System folder for full setup instructions.

**Demo Login IDs (password: pass1234)**

| ID | Name | Role |
|----|------|------|
| E001 | Carlos Rivera | Employee |
| E002 | Dana Park | Employee |
| E003 | Mike Torres | Employee |
| S001 | Janet Williams | Supervisor |
