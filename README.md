Employee Management System (EMS-HRMS)
A full-stack Employee Management System (EMS-HRMS) for managing
employees, attendance, leave, holidays, employee offboarding,
authentication, HR operations, and integrated Library / Book
Management.

Built with React.js, Vite, Spring Boot 2.7.18, Java 8, Spring
Security, JWT, Spring Data JPA, Hibernate, H2, REST APIs, Axios,
qrcode.react, and @zxing/browser, with MySQL profiles available for
environment-specific deployments.
📌 Project Overview
EMS-HRMS provides role-based access for:
- Admin
- HR
- Employee
Architecture
React.js Frontend
        ↓
      Axios
        ↓
Spring Boot REST APIs
        ↓
Spring Security / JWT
        ↓
Service Layer
        ↓
Repository Layer
        ↓
JPA / Hibernate
        ↓
H2 / MySQL
✨ Key Features
🔐 Authentication & Security
- Email/password authentication
- OTP-based login verification
- OTP expiry after 5 minutes
- Spring Security
- JWT-based stateless authentication
- BCrypt password hashing
- Role-based authorization
- Method-level authorization using @PreAuthorize
- Protected REST APIs
- CORS configuration
- Account activation/deactivation
- Forgot-password functionality
- Custom JWT authentication filter
- Custom user details service
👥 Employee Management
- Add employee
- View employees
- Update employee
- Delete employee
- Search employees
- Pagination
- Employee validation
- Department management
- Salary management
- Role-based employee operations
- Employee information management
📊 Dashboard
- Total employees
- Total departments
- New employees
- Upcoming holidays
- Department-wise employee distribution
- Recently added employees
🕒 Attendance Management
- Employee check-in
- Employee check-out
- Today's attendance
- Attendance history
- Attendance by date
- Attendance management
- Attendance calendar
- Working-hours calculation
- Attendance status
- Automated attendance processing
📱 QR Code Attendance
The application supports QR-based attendance.

Employee side
- Employee can display an attendance QR code.
- QR data identifies the employee and attendance action.
Admin/HR side
- Admin/HR can open the camera scanner.
- QR code can be scanned.
- The application processes the scan and records attendance.
Supported actions:
CHECK_IN
CHECK_OUT
🏖️ Leave Management
Employee
- Apply for leave
- View leave requests
- View leave status
- View leave history
- Track leave information
Admin/HR
- View leave requests
- Approve leave
- Reject leave
- Manage employee leave requests
Leave types include:
- Casual Leave
- Sick Leave
- Earned Leave
🎉 Holiday Management
- Add holiday
- View holidays
- Update holiday
- Delete holiday
- View upcoming holidays
- Display upcoming holidays on the dashboard
🚪 Employee Offboarding
- Search employees
- Start offboarding
- Manage offboarding information
- Complete offboarding
- Deactivate employee accounts
When an employee account is deactivated, the employee cannot log in.
📄 CSV Employee Upload
Admin functionality supports CSV-based employee processing:
- CSV upload
- File validation
- Employee data processing
- Database persistence
- File processing/status tracking
👤 Role-Based Access
  Role       Main Access
  ADMIN      Full employee, attendance, leave, holiday, offboarding and
                 Library management

  HR         Employee, attendance, leave, holiday, offboarding and Library
                 management

  EMPLOYEE   Employee self-service, attendance, leave and applicable
             holiday features
🧱 Technology Stack
Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Bootstrap / Custom CSS
- React Router
- Redux Toolkit
- Axios
- React Toastify
- Lucide React
- QR code components
Backend
- Java 8
- Spring Boot 2.7.18
- Spring MVC
- Spring Security
- JWT
- Spring Data JPA
- Hibernate
- REST APIs
- Maven
- Apache Tomcat
Database
- H2 --- current local/runtime database
- MySQL --- supported through environment-specific profiles
🔐 Spring Security & JWT
Authentication Flow
React Login
    ↓
Email + Password
    ↓
AuthenticationManager
    ↓
User Validation
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
Email + Role Extraction
    ↓
SecurityContextHolder
    ↓
Role-Based Authorization
    ↓
Protected API
Implemented Security Components
config/
├── SecurityConfig.java
├── CorsConfig.java
├── DataInitializer.java
└── PasswordMigration.java

security/
├── JwtUtil.java
├── JwtAuthenticationFilter.java
└── CustomUserDetailsService.java
JWT Configuration
- Signing Algorithm: HS256
- Token Expiration: 10 hours
- Subject: User email
- Claim: User role
- Header: Authorization: Bearer <JWT>
Password Security
Passwords are hashed using BCrypt.
Plain Password
      ↓
BCryptPasswordEncoder
      ↓
BCrypt Hash
      ↓
Database
🕒 Attendance Flow
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
   ↓
Attendance Status
Typical statuses:
- PRESENT
- ABSENT
🏖️ Leave Flow
Employee
   ↓
Apply Leave
   ↓
Leave Request Created
   ↓
Admin / HR Reviews
   ↓
Approve / Reject
   ↓
Leave Status Updated
🏗️ Application Architecture
The backend follows a layered architecture:
Controller
    ↓
Service
    ↓
Repository
    ↓
JPA / Hibernate
    ↓
Database
The React frontend communicates with Spring Boot through REST APIs using
Axios.
📁 Project Structure
Backend
employee-management/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/cms/employeemanagement/
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       │   └── impl/
│   │   │       ├── repository/
│   │   │       ├── entity/
│   │   │       ├── dto/
│   │   │       ├── exception/
│   │   │       └── EmployeeManagementApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-h2.properties
│   │       ├── application-dev.properties
│   │       ├── application-uat.properties
│   │       ├── application-dr.properties
│   │       └── application-prod.properties
│   └── test/
├── pom.xml
└── README.md
Frontend
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── store/
│   │   ├── slices/
│   │   └── store.js
│   ├── hooks/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
├── vite.config.js
└── README.md
🔗 REST API Overview
Authentication
POST /api/users/login
POST /api/users/verify-otp
POST /api/users/forgot-password
Employee
GET    /api/employees
GET    /api/employees/{id}
POST   /api/employees
PUT    /api/employees/{id}
DELETE /api/employees/{id}
Attendance
POST /api/attendance/checkin/{email}
PUT  /api/attendance/checkout/{email}

GET  /api/attendance/today/{email}
GET  /api/attendance/history/{email}
GET  /api/attendance
GET  /api/attendance/date/{email}/{date}
GET  /api/attendance/management/{date}
Leave
POST /api/leaves
GET  /api/leaves
PUT  /api/leaves/{id}/approve
PUT  /api/leaves/{id}/reject
Holiday
GET    /api/holidays
GET    /api/holidays/upcoming
POST   /api/holidays
PUT    /api/holidays/{id}
DELETE /api/holidays/{id}
Additional endpoints may exist for specific frontend workflows and
modules.

⚙️ Local Setup
Prerequisites
Install:
- Java 8
- Maven
- Node.js
- npm
- Git
- VS Code, Eclipse, or IntelliJ IDEA
MySQL is required only when using a MySQL-based profile.
1. Clone the Repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd employee-management
2. Run the Backend
mvn clean install
Then:
mvn spring-boot:run
Backend:
http://localhost:9090
3. H2 Database
The current application uses H2 for local/runtime execution.

Example:
jdbc:h2:file:./data/emsdb
Default username:
sa
If the H2 profile is configured:
spring.profiles.active=h2
H2 Console
http://localhost:9090/h2-console
Use the JDBC URL configured by the active H2 profile.
4. Run the Frontend
cd frontend
npm install
npm run dev
Frontend:
http://localhost:5173
🔄 Frontend--Backend Communication
React Application
       ↓
     Axios
       ↓
http://localhost:9090/api
       ↓
Spring Boot REST API
       ↓
JPA / Hibernate
       ↓
H2 / MySQL
🔑 Development Login
If sample users are initialized in the local database:

  Role   Email              Password
  ADMIN      admin@gmail.com      admin123
  HR         hr@gmail.com         hr123
  EMPLOYEE   employee@gmail.com   employee123
These credentials are for local development/testing only. Change or
remove default credentials before production deployment.

🔐 OTP Login
Email + Password
       ↓
Validate User
       ↓
Generate OTP
       ↓
Save OTP
       ↓
OTP Verification
       ↓
JWT Generated
       ↓
Login Successful
OTP validity:
5 minutes
For local development, the generated OTP is available through the
configured development console flow.
🧪 Testing
The project supports:
Unit Testing
JUnit can be used for individual service and business-logic testing.
Integration Testing
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
API Testing
REST APIs can be tested using:
- Postman
- Browser
- Frontend application
Run tests:
mvn test
🛡️ Validation & Error Handling
Examples of implemented validation include:
- Required employee information
- Valid email
- Required department
- Positive salary
- Required leave information
- Valid leave dates
- Valid login credentials
- Valid OTP
- Active user account
Centralized exception handling covers cases such as:
- Invalid email
- Invalid password
- Invalid OTP
- Employee not found
- Leave not found
- Duplicate attendance action
- Account disabled
- Invalid request
- Validation errors
🌍 Spring Profiles
Supported profiles:
h2
dev
uat
dr
prod
Example:
spring.profiles.active=h2
Other environments:
spring.profiles.active=dev
spring.profiles.active=uat
spring.profiles.active=dr
spring.profiles.active=prod
📦 Build
mvn clean package
Generated backend artifacts:
target/
🚀 Deployment
The Spring Boot application can run using embedded Tomcat.

Default backend port:
9090
Frontend development port:
5173
For production deployment:
1. Select the appropriate Spring profile.
2. Configure production database credentials.
3. Configure frontend API URLs.
4. Secure application secrets and JWT configuration.
5. Build the backend.
6. Build and deploy the React frontend.
📱 Responsive UI
The React application supports:
- Desktop
- Laptop
- Tablet
- Mobile
Responsive layouts are provided across major modules such as:
- Dashboard
- Employee Management
- Attendance
- Leave Management
- Holiday Management
- Offboarding
📊 Application Modules
EMS-HRMS
│
├── Authentication & Security
├── Dashboard
├── Employee Management
├── Attendance Management
│   └── QR Attendance
├── Leave Management
├── Holiday Management
├── Employee Offboarding
├── CSV Employee Upload
└── Role-Based Access Control
📚 Library / Book Management
The current EMS-HRMS project includes an integrated Library Management
module for book registration, QR-based identification, scanning,
issue/return processing, and transaction history.
Library Features
- Book registration
- Unique book barcode assignment
- Book status management
- Book QR code generation
- QR/Barcode scanning through the device camera
- Employee QR identification for borrower identification
- Book identification through QR/barcode
- Book issue
- Book return
- Transaction history
- Employee-specific transaction history
- Book availability tracking
Book Registration
Admin/HR can register:
- Book Title
- Author
- ISBN
- Category
- Unique Barcode
- Book Status
The Book ID is generated by the database.

Supported book statuses:
AVAILABLE
ISSUED
Example unique barcode:
BOOK-10001
Book QR Generation
Book QR codes are generated in React using:
- qrcode.react
- QRCodeCanvas
The QR value is the book's unique barcode.
Book Barcode
     ↓
BOOK-10001
     ↓
QRCodeCanvas
     ↓
Book QR Code
The QR is generated from the book barcode on the frontend. A separate QR
value is not stored as a separate field in the Book entity.

The generated QR can be printed and pasted on the corresponding physical
book. In future use, the physical book can be scanned through the
application to identify the book and perform Library operations.
QR / Barcode Scanner
Scanning is implemented using:
- @zxing/browser
- BrowserMultiFormatReader
Scanner flow:
Open Scanner
     ↓
Camera Permission
     ↓
Scan QR / Barcode
     ↓
Read Scanned Value
     ↓
Call Backend API
     ↓
Identify Employee / Book
     ↓
Perform Library Operation
The scanner controls are stopped after a successful scan and during
component cleanup.
Book Issue Flow
Scan Employee QR
       ↓
Identify Employee
       ↓
Scan Book QR / Barcode
       ↓
Identify Book
       ↓
Check AVAILABLE Status
       ↓
Create Transaction
       ↓
Book Status = ISSUED
API:
POST /api/book-transactions/issue
Parameters:
employeeId
barcode
Book Return Flow
Scan Book QR / Barcode
       ↓
Identify Book
       ↓
Check ISSUED Status
       ↓
Find Active Transaction
       ↓
Record Return Date
       ↓
Transaction = RETURNED
       ↓
Book Status = AVAILABLE
API:
POST /api/book-transactions/return
Parameter:
barcode
Library Transaction
Each transaction maintains:
- Transaction ID
- Book
- Employee
- Issue Date
- Return Date
- Transaction Status
Transaction statuses:
ISSUED
RETURNED
Library APIs
POST   /api/books
GET    /api/books
GET    /api/books/{id}
GET    /api/books/barcode/{barcode}
PUT    /api/books/{id}
DELETE /api/books/{id}

POST   /api/book-transactions/issue
POST   /api/book-transactions/return
GET    /api/book-transactions
GET    /api/book-transactions/employee/{employeeId}
Library Technology
  Component               Technology
  Frontend                React.js + Vite
  QR Generation           qrcode.react
  QR Component            QRCodeCanvas
  QR / Barcode Scanning   @zxing/browser
  Scanner                 BrowserMultiFormatReader
  Backend                 Spring Boot 2.7.18
  Language                Java 8
  API                     REST APIs
  API Client              Axios
  ORM                     Spring Data JPA / Hibernate
  Database                H2
  Book Status             AVAILABLE, ISSUED
  Transaction Status      ISSUED, RETURNED
🔮 Future Enhancements
Potential future improvements:
- Email/SMS OTP delivery
- Advanced audit logging
- Production-grade secret management
- Expanded automated test coverage
- CI/CD pipeline
- Advanced HR analytics
- Notification system
- Cloud deployment
- Production monitoring and observability
👨‍💻 Author
Amaan Patel

Full-stack developer / intern project --- Employee Management System
(EMS-HRMS).
📌 Project Status
Actively developed full-stack application.

Current functionality includes authentication, role-based access,
employee management, attendance, QR attendance, leave management,
holiday management, employee offboarding, dashboard functionality, CSV
employee processing, and the integrated Library Management module with
book QR generation, QR/barcode scanning, book issue/return, and
transaction history.
