# MMMS Frontend

React UI for our CEIS400 project (Team 6). It's the maintenance management system for GB Manufacturing — employees check tools in and out, supervisors manage the roster and inventory.

Everything uses fake data in `src/mock/api.js` for now so we can demo without the Django API. Swap those calls out when the backend is ready.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

Build for production: `npm run build`

## Folder structure

```
mmms_frontend/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── styles.js
    ├── components/
    │   ├── Nav.jsx
    │   ├── Message.jsx
    │   └── Modal.jsx
    ├── context/
    │   └── AuthContext.jsx
    ├── mock/
    │   └── api.js
    └── pages/
        ├── Login.jsx
        ├── Dashboard.jsx
        ├── Checkout.jsx
        ├── Return.jsx
        └── Supervisor.jsx
```

## Test accounts

Password for everyone: `pass1234`

ID:       Name:             Role:
E001      Carlos Rivera     Employee
E002      Dana Park         Employee
E003      Mike Torres       Employee
S001      Janet Williams    Supervisor

Supervisors go to `/supervisor` after login. Employees go to `/dashboard`.

## Use cases (what we built)

Page          Use case

Login         UC-01 — employee login 
Dashboard     UC-04 — view your checked-out tools 
Check Out     UC-03 — check out equipment 
Return        UC-05 — return equipment 
Supervisor    UC-02 — add/remove employees 
Supervisor    UC-05 / UC-06 — add/remove equipment 

## Backend later

Replace imports from `src/mock/api.js` with real HTTP calls (axios or fetch). `AuthContext.jsx` handles login. That's the first place to wire up JWT or whatever the API returns. Delete the mock file once all pages hit the server.
