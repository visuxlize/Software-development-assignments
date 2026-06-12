# MMMS - Maintenance Management System

This is the CEIS400 Team 6 project for GB Manufacturing. Employees can log in
and check tools out and back in. Supervisors can manage the list of
employees and the list of tools.

The project has two parts:

- `frontend/` - the website (React)
- `backend/` - the server and database (Django)

Both parts need to be running at the same time for the app to work.

---

## 1. Install Python (needed for the backend)

Skip this step if `python3 --version` already prints a version number (3.10
or newer is fine).

**Mac**

1. Install [Homebrew](https://brew.sh) if you don't have it (one command from
   their website).
2. Run:
   ```bash
   brew install python
   ```

**Windows**

1. Go to [python.org/downloads](https://www.python.org/downloads/) and
   download the latest installer.
2. Run the installer. On the first screen, check the box that says
   **"Add Python to PATH"**, then click Install.

**Linux (Ubuntu/Debian)**

```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

`pip` comes installed with Python automatically on all three. If `pip`
still doesn't work after installing Python, try `pip3` or
`python3 -m pip` instead of `pip`.

---

## 2. Install Node.js (needed for the frontend)

Skip this step if `node --version` already prints a version number.

Go to [nodejs.org](https://nodejs.org) and download the LTS version for your
computer. Run the installer and click through with the defaults.

---

## 3. Set up the backend (Django)

Open a terminal in the `backend/` folder and run these one at a time:

```bash
python3 -m venv venv
```

This creates a private folder called `venv` that keeps this project's
Python packages separate from everything else on your computer. You only do
this once.

Now turn it on:

```bash
# Mac / Linux
source venv/bin/activate

# Windows
venv\Scripts\activate
```

You'll know it worked because your terminal prompt now starts with
`(venv)`. Every time you open a new terminal to work on this project, run
the activate command again first.

Now install the packages the backend needs:

```bash
pip install -r requirements.txt
```

Set up the database and add some test accounts and tools:

```bash
python manage.py migrate
python manage.py seed_demo
```

Start the backend:

```bash
python manage.py runserver
```

Leave this terminal open. The backend is now running at
`http://localhost:8000`.

---

## 4. Set up the frontend (React)

Open a **second** terminal in the `frontend/` folder and run:

```bash
npm install
npm run dev
```

Leave this terminal open too. Open your browser to
`http://localhost:3000`.

---

## 5. Log in and try it out

Password for every account is `pass1234`.

| Employee ID | Name  | Role       |
|-------------|-------|------------|
| E001        | Carlos | Employee  |
| E002        | Dana   | Employee  |
| E003        | Mike   | Employee  |
| S001        | Sam    | Supervisor |

- Log in as **E001** -> go to Dashboard -> Check Out a tool -> go to Return
  and return it.
- Log in as **S001** -> go to Supervisor -> add or remove employees and
  tools.

---

## How the backend works

The backend is a Django project with two apps: `equipment` and
`authentication`.

**authentication app**

- Stores employees as an `Employee` model with the fields `empID`,
  `firstName`, `lastName`, and `role` (either `employee` or `supervisor`).
- Each `Employee` is linked to a regular Django user account, which is what
  actually checks the password.
- `POST /api/auth/login/` takes an employee ID and password, checks them,
  and if they're correct sends back a login token (JWT) plus the
  employee's info. The frontend saves that token and sends it along with
  every request after that so the backend knows who's asking.
- `/api/supervisor/employees/` lets a supervisor see the list of employees
  and add new ones. `/api/supervisor/employees/<id>/` deletes one.

**equipment app**

- Stores each tool as an `Equipment` model with `equipID`, `equipName`,
  `equipDesc`, `quantTotal` (how many the shop owns), and `quantAvail` (how
  many are currently available to check out).
- `/api/equipment/` lists all tools, and lets a supervisor add or remove
  tools.
- `/api/equipment/checkout/` - an employee sends a tool's `equipID` and the
  backend lowers `quantAvail` by one and records that this employee has it.
- `/api/equipment/return/` - same thing in reverse, raises `quantAvail` back
  up and marks the record as returned.
- `/api/equipment/mine/` - returns the list of tools the logged-in employee
  currently has checked out. This is what the Dashboard and Return pages
  show.
- An `EquipmentCheckout` model is the record connecting one employee to one
  tool while it's checked out. It remembers when it was checked out and
  when (if ever) it was returned.

**Settings**

- `djangorestframework-simplejwt` handles the login tokens.
- `django-cors-headers` lets the React app (running on a different port)
  talk to the Django app without the browser blocking it.

---

## Folder structure

```
CEIS400 - Maintenance System/
├── README.md
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── mmms/            <- Django settings and URLs
│   ├── authentication/  <- Employee model, login, supervisor endpoints
│   └── equipment/       <- Equipment model, checkout/return endpoints
└── frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── api/          <- talks to the backend
        ├── context/       <- keeps track of who's logged in
        ├── components/
        └── pages/         <- Login, Dashboard, Checkout, Return, Supervisor
```

---

## Still missing / not built yet

- A Materials page (the backend has no Material model yet)
- Supervisor approval workflow for checkouts
- Condition reporting when returning a tool
- A history/log of past checkouts and returns

These need new models and endpoints on the backend before the related
frontend pages can be added back in.
