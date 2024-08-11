Employee Management and Time Tracking System
Overview

The Employee Management and Time Tracking System is a comprehensive web application designed to streamline workforce management. It allows organizations to effectively manage employee information, track working hours, and maintain detailed logs of time and attendance. The system provides different access levels based on user roles, ensuring that sensitive operations like employee management and data access are restricted to authorized personnel.
Features
User Management

    User Authentication: Secure login and registration system.
    Role-Based Access Control: Differentiate between regular employees and administrators, granting specific privileges based on roles.
    Admin Dashboard: Manage all employees, edit their information, or remove them from the system.

Time Tracking

    Clock In/Clock Out: Employees can record their working hours with a simple clock in and clock out feature.
    Manual Time Adjustments: Administrators can manually adjust clock-in/out times for employees if necessary.
    History Tracking: View detailed logs of clock-in/out activities and other historical data.

Employee Information Management

    Employee Directory: Administrators can view a list of all employees with detailed information such as name, address, email, phone number, and roles.
    Edit Employee Details: Modify employee information including personal details and roles.
    Delete Employees: Remove employees from the system when they leave the organization.

Admin-Specific Features

    Protected Routes: Ensure that only users with admin privileges can access sensitive areas of the application.
    Confirmation Dialogs: Safeguard against accidental deletions or modifications with confirmation prompts.

Installation

To set up and run the project locally, follow these steps:

    Clone the Repository:

    bash

git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system

Install Dependencies:
Install the necessary packages using npm:

bash

npm install

Environment Variables:
Set up your environment variables in a .env file. Required variables might include API URLs, database connection strings, etc.

Start the Development Server:

bash

npm start

The app will be available at http://localhost:3000.

User Management Routes

    POST /register: Registers a new user.
        Calls the register method in userController.

    POST /login: Logs in an existing user.
        Calls the login method in userController.

    POST /logout: Logs out the current user.
        Calls the logout method in userController.

    PUT /update/
    : Updates user details.
        Protected route, meaning the user must be authenticated.
        Calls the updateUser method in userController.

    GET /user/
    : Retrieves a user's details by ID.
        Protected route.
        Calls the getUser method in userController.

    GET /role: Retrieves the role information of the logged-in user.
        Protected route.
        Calls the getRole method in userController.

    GET /all-users: Retrieves a list of all users.
        Protected route, typically for admin use.
        Calls the getAllUsers method in userController.

    DELETE /delete/
    : Deletes a user by ID.
        Protected route, typically for admin use.
        Calls the deleteUser method in userController.

Time Tracking (Clock) Routes

    POST /clockin: Records a clock-in event for the logged-in user.
        Protected route.
        Calls the clockIn method in clockController.

    POST /clockout: Records a clock-out event for the logged-in user.
        Protected route.
        Calls the clockOut method in clockController.

    POST /manual-clock: Manually adds or adjusts a clock entry.
        Protected route, likely for admin use to correct time logs.
        Calls the clockManually method in clockController.

    GET /history: Retrieves the clock history for the logged-in user.
        Protected route.
        Calls the getClockHistory method in clockController.

    GET /entry-user/
    /hours-user/
    : Retrieves specific clock entry details for a user.
        Protected route.
        Calls the getClockEntry method in clockController.

Protect Middleware

    protect: This middleware is applied to routes to ensure that only authenticated users can access them. It checks if a user is logged in before allowing access to the specified route.

Project Flow

    Authentication: Users register and log in to the system. After logging in, their session is maintained, allowing them to access protected routes.
    User Management: Admins can manage users, view their details, update their profiles, and delete accounts.
