# Week 2 - Analysis Phase

**Due:** May 15, 2026
**Phase:** Analysis
**Submitted By:** Team 6

---

## Overview

Week 2 moved from requirements into analysis. The team selected five high-priority use cases from the Week 1 list and wrote full descriptions for each one. Use case diagrams and class diagrams were created to visually represent the system structure and behavior. The VOPC matrix was built to ensure every use case connected to at least one class.

---

## Deliverables

### 1. Use Case Descriptions
**File:** CEIS400_Team6_Use_Case_Descriptions.docx
**Format:** Basic Use Case Description Template

Five use cases were selected based on frequency, complexity, visibility, and risk. Each team member was assigned one or more use cases to write.

| Use Case | ID | Author |
|----------|----|--------|
| Employee Authentication | UC-01/02/03 | Justin Haag |
| Equipment Checkout | UC-05/06/07 | Andres Marte |
| View and Return Checked-Out Equipment | UC-10/11 | Ramon Marrero |
| Supervisor Add/Remove Employee | UC-23/24/25/26 | John DelAtorre |

Each description includes: Use Case Name, ID, Importance Level, Primary Actor, Use Case Type, Stakeholders, Brief Description, Trigger, Relationships (Association, Include, Extend, Generalization), Normal Flow of Events, SubFlows, and Alternate/Exceptional Flows.

---

### 2. Use Case Diagram
**File:** Use Case Diagram (Lucidchart export)
**Prepared by:** Team 6

Shows all 5 use cases inside the MMMS system boundary with Employee and Supervisor actors outside. Key relationships:

- Employee Authentication has include arrows from Equipment Checkout, View Checked-Out Equipment, and Return Checked-Out Equipment
- Supervisor generalizes Employee with an is-a arrow
- All 5 use cases are inside the system boundary box

---

### 3. Class Diagram
**File:** Class Diagram (Lucidchart export)
**Prepared by:** Nicole Vaynshtok (base) + Andres Marte (methods and relationships)

Four core classes identified from the use case descriptions:

- Employee: empID, firstName, lastName, role, isActive - methods: login(), logout(), getRole()
- Equipment: equipID, equipName, equipDesc, quantTotal, quantAvail - methods: checkAvailability(), updateStatus()
- Equipment Checkout (Transaction): transID, empID, equipID, checkOut, checkIn, status - methods: recordCheckout(), recordReturn()
- Supervisor: empID, role, actionType - methods: addEmployee(), removeEmployee(), approveRequest()

Relationships: Supervisor generalizes Employee, Employee initiates Equipment Checkout, Equipment Checkout records Equipment.

---

### 4. VOPC Matrix
**File:** VOPC Matrix
**Prepared by:** Team 6

View of Participating Classes matrix cross-referencing the 5 use cases against the 4 classes. Every use case has at least one X in a class column and every class has at least one X in a use case row confirming complete requirements coverage.

---

## Notes

Week 2 was also when Drake Carr and Steven Leefing left the group, reducing the team from 7 to 5 members. Remaining team: John DelAtorre, Justin Haag, Ramon Marrero, Andres Marte, Nicole Vaynshtok.
