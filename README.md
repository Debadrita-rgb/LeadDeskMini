# LeadDesk Mini

LeadDesk Mini is a full-stack Lead Management System that helps businesses collect, organize, and manage customer leads efficiently. It provides a user-friendly interface for submitting leads and an admin dashboard to monitor, search, and update lead statuses.

## Features

### Public

* Responsive landing page
* User authentication (Sign Up / Sign In)
* Lead submission form
* Client-side and server-side validation
* Duplicate email and mobile number validation

### User

* Create new leads
* View submitted leads
* Track lead information

### Admin

* Dashboard with analytics
* View all leads
* Search leads by name, email, or mobile number
* Update lead status (New, Contacted, Closed)
* View total users (excluding admin)
* Dashboard statistics for lead statuses

## Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Axios / Fetch API
* React Toastify

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt / bcryptjs

### Database

* MongoDB
* Mongoose

## Project Structure

```text
CRM_project/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation

### Clone the repository

```bash
git clone https://github.com/Debadrita-rgb/LeadDeskMini.git
```

### Navigate to the project

```bash
cd LeadDeskMini
```

### Install Frontend

```bash
cd frontend
npm install
```

### Install Backend

```bash
cd ../backend
npm install
```

## Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

## Run the Application

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run dev
```

## Live Demo

Frontend:
https://leaddeskmini-frontend.onrender.com

Backend:
](https://leaddeskmini-backend.onrender.com)

## Future Improvements

* Email notifications
* Export leads to Excel
* Dashboard charts
* Dark mode

## Author

**Debadrita Paul**

GitHub: https://github.com/Debadrita-rgb
