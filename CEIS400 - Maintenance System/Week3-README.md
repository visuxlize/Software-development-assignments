# Week 3 - Design Phase (Architecture)

**Due:** May 22, 2026
**Phase:** Design
**Submitted By:** Team 6

---

## Overview

Week 3 focused on architectural decisions. The team selected an architecture style, documented how it supports the SRS quality attributes, and produced both a static and dynamic view of the system. The professor's feedback on this week's submission suggested adding object-oriented architecture to complement the layered approach, which the team incorporated in a revised version.

---

## Deliverables

### 1. Software Requirements Specification - Updated
**File:** CEIS400_Team6_MMMS_SRS_Andres_Marte_updatedWeek3.docx

Updated to add Section 3 Software System Attributes covering the five non-functional requirements that drive the architecture:

- Usability: system must be operable in under 5 minutes of self-guided use, 4 steps max per task
- Performance: all transactions complete in under 3 seconds, checkout in under 2 minutes
- Reliability: available all working hours, offline mode required for network outages
- Security: LAN only, hashed passwords, RBAC for supervisor functions
- Maintainability: supervisors manage records through the UI without IT involvement

---

### 2. Software Architecture Description
**File:** CEIS400_Andres_ArchitectureDescription_v2.docx
**Prepared by:** Andres Marte

Documents the hybrid architecture chosen for the MMMS.

**Architecture: Three-Tier Layered + Object-Oriented (Hybrid)**

The layered architecture defines overall system structure:
- Presentation Layer: React 18 - all screens the user sees
- Business Logic Layer: Django REST Framework - all rules, routing, authentication, validation
- Data Layer: SQLite / PostgreSQL - Employee, Equipment, Materials, Records tables

The object-oriented architecture is applied inside the business logic layer. Five domain classes were identified: Employee, Equipment, Transaction, Material, MaterialRequest. Each class owns its own data and behavior matching the Django models on the backend.

The hybrid approach was recommended by the professor after reviewing the initial submission which only described the layered architecture.

**SRS quality attribute mapping:**

| Attribute | How the architecture supports it |
|-----------|----------------------------------|
| Usability | Presentation layer is separate from backend, UI can change without touching the database |
| Performance | React only re-renders what changed, Django handles validation server-side |
| Reliability | Offline sync module queues transactions and replays on reconnect |
| Security | Auth and RBAC live in business logic layer, presentation never touches database directly |
| Maintainability | Each layer is independent, new features are new routes and pages |

---

### 3. Static Architecture Diagram
**File:** Static Architecture Diagram (Lucidchart PNG)
**Prepared by:** Andres Marte

Three stacked colored boxes showing all layers and components. Blue for Presentation, Green for Business Logic, Yellow for Data. Double-headed arrows between layers labeled with communication protocol. Each component box shows the FR numbers it covers.

---

### 4. Sequence Diagram (Dynamic View)
**File:** Sequence Diagram (Ramon Marrero)
**Prepared by:** Ramon Marrero

Shows the 14-step message flow for the equipment checkout use case from ID scan to success confirmation. Four lifelines: Employee, Browser UI, Django Backend, Database. Solid arrows for requests, dashed arrows for responses.

---

## Professor Feedback

The professor noted the layered architecture made sense and suggested considering a hybrid that also makes use of object-oriented architecture. The team revised the architecture description to include a new Section 2.2 covering the five OOP domain classes and Section 2.3 explaining why the hybrid approach is stronger than either style alone.
