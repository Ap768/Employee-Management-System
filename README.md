# Employee Management System

## Project Description

Employee Management System is a role-based web application developed using **React JS**, **Spring Boot**, and **H2 In-Memory Database**. The system provides secure OTP-based authentication for **Admin** and **HR** users. Admin users can manage employee records and upload CSV files, while HR users can view, search, and filter employee information.

---

## Technology Stack

### Frontend
- React JS
- Vite
- Bootstrap 5
- Axios

### Backend
- Java 8
- Spring Boot 2.7
- Spring Data JPA
- Maven

### Database
- H2 In-Memory Database

### Server
- Embedded Apache Tomcat

---

## Project Structure

```
Employee-Management-System
│
├── DOCS
│   ├── SRS
│   ├── Test Cases
│   ├── JUnit
│   └── Integration Test
│
├── EMS-BACKEND
│   ├── src
│   ├── pom.xml
│   └── application.properties
│
├── EMS-FRONTEND
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
```

---

## Features

- Secure Login
- OTP Verification
- Forgot Password
- Role-Based Authentication
- Admin & HR Dashboard
- Add Employee
- Update Employee
- Delete Employee
- Search Employee
- Department Filter
- Sort Employees
- CSV Upload
- Employee Pagination
- Refresh Employee List

---

## User Roles

### Admin

- Login
- OTP Verification
- Add Employee
- Update Employee
- Delete Employee
- Upload CSV
- Search Employee
- Department Filter
- View Dashboard

### HR

- Login
- OTP Verification
- View Employees
- Search Employee
- Department Filter
- View Dashboard

---

## REST APIs

### User APIs

```
POST /api/users/login
POST /api/users/verify-otp
POST /api/users/forgot-password
```

### Employee APIs

```
GET    /api/employees
GET    /api/employees/{id}
POST   /api/employees
PUT    /api/employees/{id}
DELETE /api/employees/{id}
POST   /api/employees/upload
```

---

## How to Run

### Backend

```bash
cd EMS-BACKEND
mvn clean install
mvn spring-boot:run
```

### Frontend

```bash
cd EMS-FRONTEND
npm install
npm run dev
```

---

## Default Login

### Admin

```
Email    : admin@gmail.com
Password : admin123
```

### HR

```
Email    : hr@gmail.com
Password : hr123
```

---

## Testing

- Validation Testing
- Unit Testing (JUnit)
- Integration Testing
- Manual Test Cases

---

## Author

**Amaan Patel**

Employee Management System using React JS, Spring Boot, and H2 Database.
