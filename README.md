# Employee Management System (EMS)

A full-stack **Employee Management System (EMS)** developed using **React.js, Spring Boot, Spring Data JPA, Hibernate, and H2/MySQL**.

The application provides a centralized platform for managing employees, attendance, leaves, holidays, employee offboarding, authentication, and HR-related operations.

---

## 📌 Project Overview

The Employee Management System is designed to simplify and digitize employee and HR management activities within an organization.

The system provides different levels of access for:

- **Admin**
- **HR**
- **Employee**

The application follows a layered full-stack architecture:

```text
React Frontend
      ↓
REST API
      ↓
Spring Boot Backend
      ↓
Spring Data JPA / Hibernate
      ↓
H2 Database

Features
🔐 Authentication & OTP
Login using email and password
OTP-based authentication
OTP verification
OTP expiry after 5 minutes
Role-based access control
Account activation/deactivation
Forgot password functionality
Protected application routes
CORS configuration
Console-based OTP for local development/testing
Login Flow
Enter Email + Password
        ↓
Validate User
        ↓
Generate OTP
        ↓
Save OTP
        ↓
Display OTP in Console
        ↓
Enter OTP
        ↓
Verify OTP
        ↓
Login Successful
👥 Employee Management

The Employee Management module allows authorized users to manage employee information.

Features
Add employee
View employees
Update employee
Delete employee
Search employees
Pagination
Employee validation
Department management
Salary management
Employee information management
Role-based employee operations
Employee Information

The system maintains employee information such as:

Employee ID
Employee Name
Email
Department
Salary
Other employee-related information
📊 Dashboard

The EMS dashboard provides an overview of the organization.

Dashboard Statistics

The dashboard contains:

Total Employees
Total Departments
New Employees
Upcoming Holidays
Dashboard Sections
Departments

Displays the departments available in the organization along with employee distribution.

Example:

IT                  35 Employees
Engineering         25 Employees
Finance             18 Employees
HR                  12 Employees
Sales               10 Employees
Upcoming Holidays

Displays upcoming company holidays.

Information includes:

Holiday Name
Date
Day
Recent Employees

Displays recently added employees.

🕒 Attendance Management

The Attendance Management module allows employees and authorized users to manage attendance.

Features
Employee check-in
Employee check-out
Today's attendance
Attendance history
Attendance by date
Attendance management
Attendance calendar
Working hours calculation
Attendance status
Attendance Flow
Employee
   ↓
Check In
   ↓
Attendance Created
   ↓
Employee Works
   ↓
Check Out
   ↓
Working Hours Calculated
Attendance Status

Examples:

PRESENT
ABSENT
🏖️ Leave Management

The Leave Management module allows employees to apply for leave and authorized users to manage leave requests.

Employee Features
Apply for leave
View leave requests
View leave status
View leave history
Track leave information
HR/Admin Features
View leave requests
Approve leave
Reject leave
Manage employee leave requests
Leave Types

Examples:

Casual Leave
Sick Leave
Earned Leave
🎉 Holiday Management

The Holiday Management module allows authorized users to manage organization holidays.

Features
Add holiday
View holidays
Update holiday
Delete holiday
View upcoming holidays
Display upcoming holidays on dashboard
🚪 Employee Offboarding

The Employee Offboarding module manages employees who are leaving the organization.

Features
Search employees
Start offboarding
Manage offboarding information
Complete offboarding
Deactivate employee accounts

When an employee account is disabled, the employee cannot log in to the system.

👨‍💼 Role-Based Access Control

The application supports three primary roles:

ROLE_ADMIN
ROLE_HR
ROLE_EMPLOYEE
👑 ADMIN

Admin has the highest level of access.

Admin can:

Add employees
Edit employees
Delete employees
View employees
Manage leaves
Approve leaves
Reject leaves
Manage attendance
Manage holidays
Manage offboarding
Access dashboard
Manage users
Access administrative features
👨‍💼 HR

HR users have access to HR-related operations.

HR can:

Add employees
Edit employees
View employees
Manage leave requests
Approve leaves
Reject leaves
Manage attendance
Manage holidays
Manage offboarding
View dashboard
👤 EMPLOYEE

Employees have access to employee-specific functionality.

Employees can:

View dashboard
View employee information
Check in
Check out
View attendance
View attendance history
Apply for leave
View leave history
View holidays
🧱 Technology Stack
Frontend
React.js
Vite
JavaScript
HTML5
CSS3
Bootstrap / Custom CSS
React Router
Redux Toolkit
Axios
Backend
Java 8
Spring Boot 2.7.18
Spring MVC
Spring Data JPA
Hibernate
REST APIs
Maven
Apache Tomcat
Database

The application supports:

H2 Database
MySQL Database
H2

H2 is used for local development and testing.

Example database URL:

jdbc:h2:file:./data/emsdb
MySQL

MySQL can be used for development, UAT, DR, and production environments.

🏗️ Application Architecture

The application follows a layered architecture.

                    React Frontend
                          |
                          |
                        Axios
                          |
                          ↓
                Spring Boot REST API
                          |
                          ↓
                     Controller
                          |
                          ↓
                       Service
                          |
                          ↓
                     Repository
                          |
                          ↓
                   Hibernate / JPA
                          |
                          ↓
                    H2 / MySQL
📁 Project Structure
Backend
employee-management/
│
├── src/
│   │
│   ├── main/
│   │   │
│   │   ├── java/
│   │   │   │
│   │   │   └── com/cms/employeemanagement/
│   │   │       │
│   │   │       ├── controller/
│   │   │       │
│   │   │       ├── service/
│   │   │       │   └── impl/
│   │   │       │
│   │   │       ├── repository/
│   │   │       │
│   │   │       ├── entity/
│   │   │       │
│   │   │       ├── dto/
│   │   │       │
│   │   │       ├── exception/
│   │   │       │
│   │   │       └── EmployeeManagementApplication.java
│   │   │
│   │   └── resources/
│   │       │
│   │       ├── application.properties
│   │       ├── application-h2.properties
│   │       ├── application-dev.properties
│   │       ├── application-uat.properties
│   │       ├── application-dr.properties
│   │       └── application-prod.properties
│   │
│   └── test/
│
├── pom.xml
└── README.md
Frontend
frontend/
│
├── src/
│   │
│   ├── components/
│   │
│   ├── pages/
│   │
│   ├── services/
│   │
│   ├── store/
│   │   ├── slices/
│   │   └── store.js
│   │
│   ├── hooks/
│   │
│   ├── assets/
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── package.json
├── vite.config.js
└── README.md
🔗 API Endpoints
Authentication
POST /api/users/login
POST /api/users/verify-otp
POST /api/users/forgot-password
Employee APIs
GET    /api/employees
GET    /api/employees/{id}
POST   /api/employees
PUT    /api/employees/{id}
DELETE /api/employees/{id}
Attendance APIs
POST /api/attendance/checkin/{email}


PUT /api/attendance/checkout/{email}


GET /api/attendance/today/{email}


GET /api/attendance/history/{email}


GET /api/attendance


GET /api/attendance/date/{email}/{date}


GET /api/attendance/management/{date}
Leave APIs
POST /api/leaves


GET /api/leaves


PUT /api/leaves/{id}/approve


PUT /api/leaves/{id}/reject

Leave endpoints may vary depending on the final implementation.

Holiday APIs
GET    /api/holidays


GET    /api/holidays/upcoming


POST   /api/holidays


PUT    /api/holidays/{id}


DELETE /api/holidays/{id}
⚙️ Backend Setup
Prerequisites

Install the following software:

Java 8
Maven
Node.js
npm
MySQL (if using MySQL)
Git
IDE such as VS Code, Eclipse, or IntelliJ IDEA
Step 1 — Clone the Repository
git clone <YOUR_GITHUB_REPOSITORY_URL>

Navigate to the project:

cd employee-management
Step 2 — Build the Backend

Run:

mvn clean install
Step 3 — Start Spring Boot

Run:

mvn spring-boot:run

The backend will start on:

http://localhost:9090
🗄️ H2 Database Configuration

For local development/testing, use the H2 profile.

In:

application.properties

set:

spring.profiles.active=h2

The H2 database is:

jdbc:h2:file:./data/emsdb

Username:

sa

Password:



🖥️ H2 Console

The H2 console is available at:

http://localhost:9090/h2-console

Use the following JDBC URL:

jdbc:h2:file:./data/emsdb

Username:

sa
Frontend Setup

Open a new terminal.

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Start the frontend:

npm run dev

The React application will normally be available at:

http://localhost:5173
🔄 Frontend and Backend Communication

The React frontend communicates with Spring Boot through REST APIs.

React Application
       |
       | Axios
       ↓
http://localhost:9090/api
       |
       ↓
Spring Boot REST API
       |
       ↓
JPA / Hibernate
       |
       ↓
Database
🔑 Default Development Users

The following sample users can be used for local testing if they are present in the database.

Admin
Email:
admin@gmail.com


Password:
admin123


Role:
ROLE_ADMIN
HR
Email:
hr@gmail.com


Password:
hr123


Role:
ROLE_HR
Employee
Email:
employee@gmail.com


Password:
employee123


Role:
ROLE_EMPLOYEE

These credentials are intended only for local development/testing. They should be changed before production deployment.

🔐 OTP Authentication

The application uses OTP verification after successful email/password validation.

Process
User enters email/password
             ↓
        Validate User
             ↓
        Generate OTP
             ↓
       Save OTP in DB
             ↓
     OTP displayed in console
             ↓
       User enters OTP
             ↓
        Verify OTP
             ↓
       Login successful

OTP validity:

5 minutes

For local development, the generated OTP is displayed in the Spring Boot console.

Example:

==================================================
LOGIN OTP FOR admin@gmail.com : 583421
OTP VALID FOR : 5 MINUTES
==================================================
🧪 Testing

The project supports different types of testing.

Unit Testing

JUnit tests can be used to test individual service and business logic components.

Integration Testing

Integration tests can be used to verify communication between:

Controller
    ↓
Service
    ↓
Repository
    ↓
Database
API Testing

REST APIs can be tested using tools such as:

Postman
Browser
Frontend application
Run Tests
mvn test
🛡️ Validation

The application performs validation for employee and request data.

Examples include:

Required employee name
Valid email
Required department
Positive salary
Required leave information
Valid leave dates
Valid login credentials
Valid OTP
Active user account
⚠️ Error Handling

The backend provides centralized exception handling.

Examples of possible errors:

Invalid Email
Invalid Password
Invalid OTP
Employee Not Found
Leave Not Found
Employee Already Checked In
Employee Already Checked Out
Account Disabled
Invalid Request
Validation Error
🌍 Spring Profiles

The application supports multiple environments.

h2
dev
uat
dr
prod

Example:

spring.profiles.active=h2

Development:

spring.profiles.active=dev

UAT:

spring.profiles.active=uat

DR:

spring.profiles.active=dr

Production:

spring.profiles.active=prod
📦 Build the Application

To create the backend build:

mvn clean package

The generated files will be available inside:

target/
🚀 Deployment

The application can be deployed using Spring Boot's embedded Tomcat.

The backend runs on:

Port: 9090

The frontend development server runs on:

Port: 5173

For production deployment, configure the appropriate Spring profile and database credentials.

📱 Responsive Design

The React application is designed to support:

Desktop
Laptop
Tablet
Mobile

The application uses responsive layouts for:

Dashboard
Employee Management
Leave Management
Attendance
Holiday Management
Offboarding
Other application pages
📊 Dashboard Overview

The EMS dashboard provides an HR-focused overview.

Dashboard Cards
Total Employees
Total Departments
New Employees
Upcoming Holidays
Dashboard Sections
Departments
Upcoming Holidays
Recent Employees

The dashboard does not use separate statistic cards for:

Pending Leaves
Approved Leaves
Rejected Leaves
Present Today
Absent Today
Attendance Rate
On Leave Today

Attendance and leave management remain available through their respective application modules.

👥 Department Management

Departments are displayed based on employee data.

Example:

IT
Engineering
HR
Finance
Sales

The dashboard can display the number of employees in each department.

Example:

IT              35 Employees
Engineering     25 Employees
Finance         18 Employees
HR              12 Employees
Sales           10 Employees
🎉 Upcoming Holidays

The dashboard displays upcoming holidays.

Example:

Independence Day
15 Aug 2026 · Saturday


Ganesh Chaturthi
27 Aug 2026 · Thursday


Gandhi Jayanti
02 Oct 2026 · Friday

Users can navigate to the complete Holiday Management page to view all holidays.

🧑‍💼 Recent Employees

The dashboard can display recently added employees.

Example:

Employee       Email                 Department


Amaan Patel    amaan@gmail.com       IT
Rahul Sharma   rahul@gmail.com       HR

Users can navigate to the Employee Management page to view complete employee information.

## 🔐 Spring Security & JWT Authentication

The Employee Management System uses **Spring Security** to secure backend APIs with authentication and role-based authorization.

### Authentication Flow

```text
React Login
    ↓
Email + Password
    ↓
AuthenticationManager
    ↓
CustomUserDetailsService
    ↓
UserRepository
    ↓
BCrypt Password Verification
    ↓
OTP Verification
    ↓
JWT Generation
    ↓
React receives JWT
    ↓
Authorization: Bearer <JWT>
    ↓
JwtAuthenticationFilter
    ↓
JWT Validation
    ↓
Email + Role extracted
    ↓
SecurityContextHolder
    ↓
Role-Based Authorization
    ↓
Protected API
```

### Implemented Security Features

- Spring Security configuration using `SecurityFilterChain`
- JWT-based stateless authentication
- BCrypt password hashing
- OTP-based login verification
- Custom `JwtAuthenticationFilter`
- Custom `JwtUtil` for JWT generation, parsing, validation, and claim extraction
- `CustomUserDetailsService` for loading users from the database
- `AuthenticationManager` for credential authentication
- `SecurityContextHolder` for storing authenticated user information for the current request
- Role-based authorization using `hasRole()` and `hasAnyRole()`
- Method-level authorization using `@PreAuthorize`
- CORS configuration for React frontend communication
- Stateless session management using `SessionCreationPolicy.STATELESS`

### JWT Configuration

JWTs are generated using the following configuration:

- **Signing Algorithm:** HS256
- **Token Expiration:** 10 hours
- **Subject:** User email
- **Custom Claim:** User role
- **Authorization Header:** `Authorization: Bearer <JWT>`

### Roles and Authorization

The application uses three roles:

```text
ROLE_ADMIN
ROLE_HR
ROLE_EMPLOYEE
```

| Role | Access |
|------|--------|
| ADMIN | Full management access, employee deletion, CSV upload, leave and HR management |
| HR | Employee, leave, attendance, holiday and offboarding management |
| EMPLOYEE | Employee self-service features such as attendance, leave and holiday viewing |

### Security Classes

```text
config/
├── SecurityConfig.java
├── CorsConfig.java
├── DataInitializer.java
└── PasswordMigration.java

security/
├── JwtUtil.java
├── JwtAuthenticationFilter.java
└── CustomUserDetailsService.java
```

### Password Security

Passwords are not stored as plain text. Spring Security's `BCryptPasswordEncoder` is used for password hashing.

```text
Plain Password
      ↓
BCryptPasswordEncoder
      ↓
BCrypt Hash
      ↓
Database
```

### JWT Request Security

For protected APIs, the frontend sends the JWT using the HTTP Authorization header:

```http
Authorization: Bearer <JWT>
```

`JwtAuthenticationFilter` reads the header, extracts the token, validates it using `JwtUtil`, extracts the user's email and role, creates the Spring Security authentication object, and stores it in the `SecurityContextHolder`.

Spring Security then applies the configured authorization rules before allowing access to protected endpoints.

