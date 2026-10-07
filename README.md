# Student Management System

A web-based Student Management System designed to help administrators manage student records in a simple, organized, and efficient way.

## 🎯 Purpose

The purpose of this project is to provide a centralized platform for managing student information.

The system allows administrators to:

* Add student records
* View student records
* Update student information
* Delete student records
* Search student records
* Sort student records
* Validate student information

## ✨ Features

* 📊 Dashboard with student statistics
* ➕ Add new students
* 👀 View student records
* ✏️ Edit student details
* 🗑️ Delete student records
* 🔍 Search students by name, email, or course
* ↕️ Sort students by ID, name, course, or academic year
* ✅ Frontend and backend form validation
* 📧 Unique email validation
* 🗄️ MySQL database
* 🔗 REST API
* 🏗️ Layered backend architecture
* 📱 Responsive user interface

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* REST API

### Database

* MySQL

### Other Technologies

* MySQL2
* CORS
* dotenv
* Nodemon

## 📁 Project Structure

```text
student-management-system
│
├── backend
│   │
│   ├── controllers
│   │   └── studentController.js
│   │
│   ├── routes
│   │   └── studentRoutes.js
│   │
│   ├── db.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend
│   │
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
└── README.md
```

## 🔄 CRUD Operations

The system provides complete CRUD functionality.

### Create

Administrators can add new student records by entering:

* Name
* Email
* Phone number
* Course
* Academic year

### Read

All student records stored in the database can be viewed through the Students section.

### Update

Existing student information can be edited whenever required.

### Delete

Student records can be removed from the system.

## 🔍 Search and Sorting

The system provides advanced record management features.

### Search

Students can be searched using:

* Name
* Email
* Course

### Sorting

Student records can be sorted by:

* Student ID
* Name
* Course
* Academic Year

## ✅ Validation

The application performs validation before storing student information.

Examples include:

* Required fields cannot be empty.
* Name must contain at least 3 characters.
* Email must follow a valid format.
* Phone number must contain exactly 10 digits.
* Duplicate email addresses are prevented.

## 🗄️ Database

The project uses MySQL as the relational database.

### Students Table

| Column     | Description          |
| ---------- | -------------------- |
| id         | Unique student ID    |
| name       | Student name         |
| email      | Student email        |
| phone      | Student phone number |
| course     | Student course       |
| year       | Academic year        |
| created_at | Record creation date |

The `id` column is the primary key and the email field is unique.

## 🏗️ Architecture

The backend follows a layered architecture:

```text
Frontend
   ↓
REST API
   ↓
Routes
   ↓
Controllers
   ↓
MySQL Database
```

### Routes

The routes handle incoming API requests.

### Controllers

The controllers contain the application logic for:

* Fetching students
* Adding students
* Updating students
* Deleting students

### Database Layer

The database connection is handled using MySQL2.

## 🔐 Security

The project follows basic secure development practices:

* Database credentials are stored in a `.env` file.
* `.env` is excluded from Git using `.gitignore`.
* SQL queries use parameterized values.
* Duplicate email records are prevented.

## 🚀 How to Run the Project

### 1. Install Requirements

Install:

* Node.js
* MySQL

### 2
