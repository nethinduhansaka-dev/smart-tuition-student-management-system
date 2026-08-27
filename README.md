# 🎓 Smart Tuition Student Management System (STSMS)

> **A centralized web-based Student Management System designed for private tuition institutes.**

---

## 📌 About the Project

The **Smart Tuition Student Management System (STSMS)** is a web-based software solution proposed to improve the administrative and academic management processes of private tuition institutes.

The system is being developed as part of the **EER4189 – Software Design in Group Project** at **The Open University of Sri Lanka**.

The proposed system is designed specifically for **Ziyora Institute, Akuressa, Matara**, which currently serves approximately **200 students and 15 teachers**.

STSMS aims to replace fragmented manual and paper-based processes with a centralized digital platform that allows authorized users to manage and access institutional information efficiently.

---

## 🏫 Background

Ziyora Institute currently depends on several manual processes, including:

* Paper-based student registration
* Physical attendance sheets
* Class cards
* Handwritten tuition payment records
* Manually maintained examination records
* Manual preparation of institutional reports

As the number of students and teachers increases, managing these records manually can become inefficient and difficult to maintain.

The proposed STSMS addresses these challenges by bringing important academic and administrative information into a centralized system.

The project proposal identifies problems such as repetitive data entry, difficulties in retrieving records, reporting errors, and risks associated with physical document storage.

---

# ❗ Problem Statement

The existing manual approach creates several operational challenges.

### 1. Fragmented Information

Student, attendance, payment, and examination information may be maintained in separate physical records.

### 2. Time-Consuming Record Management

Finding and updating historical information manually requires considerable time and effort.

### 3. Reporting Difficulties

Preparing attendance, financial, academic, and other institutional reports requires manual examination and calculation of records.

### 4. Data Accuracy Issues

Repeated manual data entry and calculations can increase the possibility of errors.

### 5. Data Security Risks

Physical documents may be lost, damaged, modified without authorization, or become difficult to maintain over time.

The central problem addressed by STSMS is the **inefficient and fragmented management of tuition institute information caused by dependence on manual record-keeping processes**.

---

# 💡 Proposed Solution

STSMS proposes a **centralized web-based platform** that brings major tuition institute operations into one system.

The proposed system will provide facilities for managing:

* Students
* Teachers
* Classes and courses
* Schedules
* Attendance
* Examinations
* Tuition payments
* Notifications
* Reports

The system will maintain centralized records so that information does not need to be repeatedly entered into separate records.

Authorized users will be provided with dashboards and relevant information according to their responsibilities.

---

# 👥 User Roles

The system is designed around three primary user roles.

## 👨‍💼 Administrator

The Administrator will be responsible for managing institutional information and administrative functions.

Main responsibilities include:

* Student management
* Teacher management
* Course and class management
* User account management
* Payment management
* Examination-related management
* Institutional reports
* System configuration

---

## 👨‍🏫 Teacher

Teachers will primarily handle academic functions related to the classes they teach.

Main functions include:

* Managing student attendance
* Recording examination marks
* Tracking student performance
* Accessing relevant class and student information

---

## 👨‍🎓 Student

Students will have access to their relevant personal and academic information.

Main functions include:

* Viewing personal information
* Viewing attendance records
* Viewing examination results
* Viewing payment history
* Viewing notifications and announcements

The proposed system uses **Role-Based Access Control (RBAC)** so that users can access only the functions and information appropriate to their roles.

---

# 🎯 Project Objectives

The main objective of STSMS is to develop a **simple, reliable, secure, and user-friendly web-based Student Management System** for tuition institute operations.

### Specific Objectives

1. Centralize student, teacher, class, and institutional information.
2. Digitize student registration and record management.
3. Provide an efficient mechanism for recording and monitoring attendance.
4. Support tuition fee and payment record management.
5. Support examination mark and student performance management.
6. Generate attendance, financial, academic, and institutional reports.
7. Provide dashboards for relevant administrative and academic information.
8. Implement Role-Based Access Control.
9. Reduce unnecessary paperwork and repeated data entry.
10. Provide students with appropriate access to their academic and payment-related information.

---

# ⚙️ Main System Functions

The proposed STSMS will focus on the following functional areas:

| Module                       | Description                                        |
| ---------------------------- | -------------------------------------------------- |
| 👨‍🎓 Student Management     | Manage student registration and student records    |
| 👨‍🏫 Teacher Management     | Manage teacher information and related records     |
| 🏫 Class & Course Management | Manage classes, courses and related information    |
| 📅 Attendance Management     | Record and monitor student attendance              |
| 💰 Payment Management        | Manage tuition fee and payment records             |
| 📝 Examination Management    | Manage examination marks and student performance   |
| 📊 Reporting                 | Generate useful institutional and academic reports |
| 🔔 Notifications             | Provide relevant announcements and notifications   |
| 🔐 Authentication & RBAC     | Control access according to user roles             |
| 📈 Dashboards                | Present relevant summarized information            |

---

# 🏗️ Proposed System Architecture

The proposed system follows a centralized web application architecture.

```text
                         USERS
                           │
          ┌────────────────┼────────────────┐
          │                │                │
     Administrator      Teacher          Student
          │                │                │
          └────────────────┼────────────────┘
                           │
                           ▼
                ┌────────────────────┐
                │   React.js         │
                │   Frontend         │
                │   Tailwind CSS     │
                └─────────┬──────────┘
                          │
                       REST API
                          │
                          ▼
                ┌────────────────────┐
                │ Node.js            │
                │ Express.js         │
                │ Backend            │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │     MongoDB        │
                │     Database       │
                └────────────────────┘
```

This architecture represents the proposed technology approach described in the project proposal.

---

# 🛠️ Technology Stack

## Frontend

* **React.js**
* **Tailwind CSS**
* JavaScript

React.js will be used to develop the user interfaces for Administrators, Teachers, and Students, while Tailwind CSS will support responsive and consistent interface design.

## Backend

* **Node.js**
* **Express.js**
* REST APIs

The backend will handle authentication, authorization, student records, attendance, payments, examinations, reports, and database communication.

## Database

* **MongoDB**

MongoDB will store information related to users, students, teachers, classes, attendance, payments, and examinations.

## UI/UX Design

* **Figma**

Figma will be used for wireframes, interface designs, and prototypes.

## Development & Collaboration

* **Visual Studio Code**
* **Git**
* **GitHub**
* **Postman**

These tools will support development, version control, collaboration, API development, and testing.

---

# 🔐 Security & Access Control

Security is an important part of the proposed system.

STSMS will implement **Role-Based Access Control (RBAC)** to ensure that users can access only the functions and information appropriate to their responsibilities.

The three main roles are:

```text
Administrator
     │
     ├── Institutional Management
     │
     └── Reports & Configuration


Teacher
     │
     ├── Attendance
     ├── Examination Marks
     └── Academic Information


Student
     │
     ├── Personal Information
     ├── Attendance
     ├── Results
     └── Payment Information
```

---

# 📊 Expected Benefits

The proposed system is expected to provide several benefits to the tuition institute.

### Centralized Information

Important institutional information can be maintained in one centralized system.

### Improved Efficiency

Digital processes can reduce repetitive manual work and paperwork.

### Better Data Accessibility

Authorized users can access relevant information more efficiently.

### Improved Record Consistency

Centralized records can reduce repeated data entry and fragmented information.

### Improved Reporting

The system can provide summarized information and reports to authorized users.

### Controlled Access

Role-Based Access Control can restrict access to appropriate functionality.

The overall aim is to improve **data accessibility, operational efficiency, record consistency, reporting, and controlled access to information**.

---

# 🔎 Existing Systems & Project Gap

Existing platforms such as:

* Google Classroom
* Moodle
* OULMS

provide various educational and learning-management capabilities.

However, the project proposal identifies a specific gap in integrating the operational requirements of a private tuition institute into a single platform.

STSMS therefore focuses on integrating:

```text
Student Management
        +
Class & Course Management
        +
Attendance
        +
Tuition Payments
        +
Examinations
        +
Teacher Management
        +
Institutional Reporting
```

The project's justification is based on aligning these capabilities with the operational requirements of the identified tuition institute rather than claiming that such functions do not exist in other systems.

---

# 🚀 Future Enhancements

The current project may provide a foundation for future improvements.

Possible future enhancements include:

### 🤖 AI-Based Student Performance Insights

AI-based analysis could be used to identify attendance and examination trends and help teachers identify students who may need additional support.

### 📱 Mobile Support

A future version could provide dedicated mobile support.

### 🔔 Automated Notifications

Future versions could introduce automated notifications for relevant academic and administrative events.

## These are considered **future enhancements rather than core requirements of the current system**.

# 👨‍💻 Development Approach

The project follows an iterative development approach.

The planned project activities include:

```text
Problem Identification
        ↓
Feasibility Analysis
        ↓
Requirements Engineering
        ↓
Preliminary SRS
        ↓
System Design
        ↓
Development
        ↓
Integration
        ↓
Testing
        ↓
Deployment
        ↓
Documentation
        ↓
Presentation
```

The project proposal identifies a **28-week schedule** covering these major phases.

---

# 🌿 GitHub Repository

This repository will be used to maintain the source code, project documentation, diagrams, testing materials, and other development artifacts throughout the project.

The team will use **Git and GitHub** for version control and collaboration.

### Branch Structure

```text
main
│
└── develop
    │
    ├── feature/student-management
    ├── feature/teacher-class-management
    ├── feature/attendance-examination
    └── feature/payment-reports
```

All four team members will participate in both **Frontend and Backend development**.

---

# 👥 Group Members

### Group 11

| No. | Name                 | Student Number |
| --: | -------------------- | -------------- |
|  01 | F.M.F Ziyadha        | s23010646      |
|  02 | V.P.N Hansaka        | s23010421      |
|  03 | K.H.G. Hettiarachchi | s24016464      |
|  04 | P.N Yashoda          | s24016870      |

### Supervisor

**W.K Sachin Gimhan**

The above group information is taken from the project proposal.

---

# 🎓 Academic Information

**Degree Programme:** Bachelor of Software Engineering (Honours)

**Module:** EER4189 – Software Design in Group

**Institution:** The Open University of Sri Lanka

**Group:** 11

**Project:** Smart Tuition Student Management System (STSMS)

---

# 🤖 Generative AI Usage

The project team may use Generative AI tools such as **ChatGPT** and **GitHub Copilot** as supporting tools during development.

Possible uses include:

* Understanding technical concepts
* Reviewing requirements
* Development suggestions
* Preparing draft test cases
* Documentation support
* Code assistance

All AI-generated outputs will be **reviewed, tested, and validated by the project team**.

AI tools will support the development process but will not replace the team's engineering decisions or evidence.

---

# 📌 Project Status

**Current Status:** 🚧 In Development / Project Setup

This repository is being prepared for the development of the Smart Tuition Student Management System.

The source code and implementation will be added progressively as development proceeds.

---

# 📄 Project Proposal

The project proposal provides additional information about the background, problem statement, objectives, proposed solution, technology plan, timeline, and conclusion of the project.

---

# 📜 Conclusion

The **Smart Tuition Student Management System (STSMS)** is proposed as a centralized digital solution for improving the management of tuition institute operations.

By bringing student management, attendance, payments, examinations, teacher management, reporting, notifications, and controlled access into a single platform, the project aims to provide a more efficient and structured alternative to fragmented manual record-keeping.

The project will be developed using a MERN-based technology approach consisting of **React.js, Node.js, Express.js, and MongoDB**, supported by tools such as Figma, Git, GitHub, Visual Studio Code, and Postman.

---

<p align="center">

**Smart Tuition Student Management System (STSMS)**

**EER4189 – Software Design in Group Project**

**Group 11 – The Open University of Sri Lanka**

</p>
