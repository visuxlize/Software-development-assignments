# Week 7 - Testing and Final Submission

**Due:** June 20, 2026
**Phase:** Testing and Maintenance
**Submitted By:** Team 6

---

## Overview

Week 7 was the final testing week. The team executed all 12 test cases from Week 6 against the live system, documented results in an initial test report, corrected any defects found, and re-ran all tests to produce an updated report. The team charter and any outstanding project documents were also finalized this week.

---

## Deliverables

### 1. Initial Test Report
**File:** CEIS400_Team6_TestReport_Initial.docx

Results from the first round of testing before any defects were corrected. Each report includes the expected result (pre-filled from the test cases), actual result, pass or fail assessment, incident description for any failures, and severity and priority ratings.

Reports TR-01 through TR-12 correspond to test cases TC-01 through TC-12.

**Andres Marte results (TR-01, TR-02, TR-03, TR-09, TR-10, TR-11):**

TR-01 - Employee Login Valid: Pass. E001 redirected to dashboard, S001 redirected to supervisor dashboard. Correct names displayed for both.

TR-02 - Employee Login Invalid: Pass. System blocked all three invalid scenarios including wrong ID, wrong password, and SQL injection attempt. Error message appeared each time.

TR-03 - Role-Based Access: Pass. Supervisor options visible only for S001. E001 redirected away from /supervisor on manual navigation attempt.

TR-09 - Checkout Available: Pass. T001 checked out successfully, status updated, transaction recorded with timestamp, tool removed from available grid.

TR-10 - Checkout Out of Stock: Pass. System blocked checkout for unavailable item, error message shown, no transaction created.

TR-11 - Equipment Return: Pass. T001 returned successfully, status set back to available, transaction updated with return time and condition good.

---

### 2. Updated Test Report
**File:** CEIS400_Team6_TestReport_Updated.docx

Results from the second round of testing after defect corrections. All 12 tests re-run to confirm fixes did not break other functionality.

---

### 3. Team Charter
**File:** CEIS400_Team6_TeamCharter.docx

Eight-section document covering team members and roles, project goal, communication expectations, work distribution process, meeting and deadline expectations, conflict resolution, quality standards, and signature lines for all five members.

---

### 4. Updated Project Documents

All core project documents reviewed for accuracy against the final built system. No major changes required as the system was built to match the SRS requirements throughout the project.

---

## Final Project Summary

The MMMS was completed as a full-stack web application covering all functional requirements from the SRS. The system successfully:

- Authenticates employees by ID and password with role-based access control
- Allows equipment checkout and return with transaction logging
- Provides a supervisor dashboard with overdue alerts and request approval
- Enables dual-warehouse materials search with transfer and order requests
- Runs independently as a React frontend while Django backend is being connected

**What was built:**
- 6 React pages covering all employee and supervisor functions
- 14 Django REST API endpoints
- 5 Django models with a fully seeded SQLite database
- JWT authentication with role-based access control
- In-memory mock API for frontend testing without the backend

**What remains for future development:**
- Full React to Django API connection replacing mock data
- Offline sync module for FR-8 (service worker queue and replay)
- PostgreSQL migration for production deployment
