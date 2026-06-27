# Week 6 - Test Cases

**Due:** June 12, 2026
**Phase:** Testing
**Submitted By:** Team 6

---

## Overview

Week 6 produced the formal test cases document following IEEE 829 format. The team wrote 12 test cases covering all major functional requirements. These test cases were designed so that any team member could execute them without being the original developer of the feature.

---

## Deliverables

### 1. Test Cases Document
**File:** CEIS400_Test_Cases_Team_6.docx

12 test cases covering the core system functionality. Each test case includes requirements addressed, prerequisite conditions, test input, expected results, criteria for evaluating results, step-by-step instructions, and features to be tested.

| Test Case | Name | Tester | FR Reference |
|-----------|------|--------|-------------|
| TC-01 | Employee Login - Valid Credentials | Ramon Marrero | FR-1.1, FR-1.2 |
| TC-02 | Employee Login - Invalid Credentials | Andres Marte | FR-1.1, FR-1.3 |
| TC-03 | Supervisor Login and Role-Based Access | Justin Haag | FR-1.1, FR-1.4, FR-7.1 |
| TC-04 | Add New Equipment (Supervisor) | John DelAtorre | FR-7.4 |
| TC-05 | Remove Equipment (Supervisor) | Nicole Vaynshtok | FR-7.5 |
| TC-06 | Add New Employee (Supervisor) | Nicole Vaynshtok | FR-7.2 |
| TC-07 | Remove Employee (Supervisor) | Justin Haag | FR-7.3 |
| TC-08 | View Equipment List | John DelAtorre | FR-2.1 |
| TC-09 | Equipment Checkout - Available Inventory | Nicole Vaynshtok | FR-2.2, FR-2.3 |
| TC-10 | Equipment Checkout - Out of Stock | Andres Marte | FR-2.4 |
| TC-11 | Equipment Return | Andres Marte | FR-3.1, FR-3.2 |
| TC-12 | View Currently Checked Out Equipment | Nicole Vaynshtok | FR-2.5 |

---

### 2. Notes on Test Execution

- TC-04 through TC-07 require a supervisor account. Use S001 with the Supervisor role pre-seeded in the database.
- TC-09, TC-12, and TC-11 depend on each other and should be run in that order.
- TC-10 requires an equipment record with Available Quantity of 0 to exist before the test.
- TC-02 includes a SQL injection sub-test to verify the authentication layer does not pass raw user input directly to the database.
- All tests are executed against the live running application at localhost:3000 with both the Django backend and React frontend running simultaneously.

---

## How to Run Both Servers Before Testing

**Terminal 1 - Backend:**
```
cd backend
source venv/bin/activate    (Mac/Linux)
venv\Scripts\activate       (Windows - run Set-ExecutionPolicy RemoteSigned first)
python manage.py runserver
```

**Terminal 2 - Frontend:**
```
cd frontend
npm run dev
```

Open http://localhost:3000 in the browser to access the app.
